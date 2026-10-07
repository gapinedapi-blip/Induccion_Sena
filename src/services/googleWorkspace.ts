import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ApprenticeSheetRecord } from '../types/induction';

// Initialize Firebase App & Auth
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Provider with required Google Drive and Sheets scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');
// Prompt user to select account when needed
provider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to indicate if we are in the middle of a sign-in flow
let isSigningIn = false;
// Cache the access token strictly in memory - NEVER in localStorage or sessionStorage
let cachedAccessToken: string | null = null;
let cachedCurrentUser: User | null = null;

export const SPREADSHEET_TITLE = 'Registro de Aprendices - Inducción SENA';
export const SHEET_TAB_NAME = 'Aprendices';

export interface SpreadsheetInfo {
  id: string;
  name: string;
  webViewLink: string;
}

/**
 * Initialize auth state listener. Call this on app load.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    cachedCurrentUser = user;
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token not cached yet (e.g. after fresh reload before user clicked sign-in)
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Trigger Google sign in popup with requested scopes
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }

    cachedAccessToken = credential.accessToken;
    cachedCurrentUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Get cached in-memory access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Get currently authenticated user
 */
export const getCurrentUser = (): User | null => {
  return cachedCurrentUser || auth.currentUser;
};

/**
 * Sign out and clear in-memory credentials
 */
export const googleLogout = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
  cachedCurrentUser = null;
};

/**
 * Find existing spreadsheet in user's Drive or create a new one with header row
 */
export const getOrCreateSpreadsheet = async (
  token: string
): Promise<SpreadsheetInfo> => {
  // 1. Search in Drive
  const query = encodeURIComponent(
    `name='${SPREADSHEET_TITLE}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`
  );
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!searchRes.ok) {
    const errData = await searchRes.json().catch(() => ({}));
    throw new Error(
      errData.error?.message || `Error al buscar en Google Drive (${searchRes.status})`
    );
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    const file = searchData.files[0];
    return {
      id: file.id,
      name: file.name,
      webViewLink:
        file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
    };
  }

  // 2. If not found, create new spreadsheet via Google Sheets API
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const headers = [
    'Código Constancia',
    'Fecha y Hora',
    'Nombre del Aprendiz',
    'Tipo Documento',
    'Número Documento',
    'Número de Ficha',
    'Programa de Formación',
    'Centro de Formación',
    'Regional',
    'Modalidad',
    'Puntaje Evaluación',
    'Estado',
    'Registrado Por',
    'Puntos Gamificados',
    'Tiempo Empleado',
    'Racha Máxima',
  ];

  const createBody = {
    properties: {
      title: SPREADSHEET_TITLE,
    },
    sheets: [
      {
        properties: {
          title: SHEET_TAB_NAME,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: headers.map((h) => ({
                  userEnteredValue: { stringValue: h },
                  userEnteredFormat: {
                    backgroundColor: { red: 0.02, green: 0.59, blue: 0.38 }, // SENA green
                    textFormat: {
                      bold: true,
                      foregroundColor: { red: 1, green: 1, blue: 1 },
                    },
                  },
                })),
              },
            ],
          },
        ],
      },
    ],
  };

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createBody),
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(
      errData.error?.message ||
        `Error al crear la hoja de cálculo en Google Sheets (${createRes.status})`
    );
  }

  const createdData = await createRes.json();
  return {
    id: createdData.spreadsheetId,
    name: SPREADSHEET_TITLE,
    webViewLink:
      createdData.spreadsheetUrl ||
      `https://docs.google.com/spreadsheets/d/${createdData.spreadsheetId}/edit`,
  };
};

/**
 * Fetch all registered apprentices from the Google Sheet
 */
export const fetchApprenticeRecords = async (
  token: string,
  spreadsheetId: string
): Promise<ApprenticeSheetRecord[]> => {
  const range = encodeURIComponent(`${SHEET_TAB_NAME}!A2:M1000`);
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  let res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fallback to default tab if tab name is different
  if (!res.ok) {
    url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:M1000`;
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData.error?.message || `Error al leer registros (${res.status})`
    );
  }

  const data = await res.json();
  const rows = data.values || [];

  return rows.map((row: string[]) => ({
    certificateCode: row[0] || '',
    timestamp: row[1] || '',
    fullName: row[2] || '',
    documentType: row[3] || '',
    documentNumber: row[4] || '',
    fichaNumber: row[5] || '',
    programName: row[6] || '',
    trainingCenter: row[7] || '',
    regional: row[8] || '',
    modality: row[9] || '',
    quizScore: row[10] || '',
    status: row[11] || '',
    recordedBy: row[12] || '',
  }));
};

/**
 * Append apprentice record to Google Sheet
 */
export const appendApprenticeRecord = async (
  token: string,
  spreadsheetId: string,
  record: ApprenticeSheetRecord
): Promise<boolean> => {
  const range = encodeURIComponent(`${SHEET_TAB_NAME}!A:P`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const body = {
    range: `${SHEET_TAB_NAME}!A:P`,
    majorDimension: 'ROWS',
    values: [
      [
        record.certificateCode,
        record.timestamp,
        record.fullName,
        record.documentType,
        record.documentNumber,
        record.fichaNumber,
        record.programName,
        record.trainingCenter,
        record.regional,
        record.modality,
        record.quizScore,
        record.status,
        record.recordedBy || '',
        record.gamifiedPoints ? String(record.gamifiedPoints) : '0',
        record.timeSpentFormatted || '',
        record.streakMax ? String(record.streakMax) : '0',
      ],
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData.error?.message || `Error al agregar registro (${res.status})`
    );
  }

  return true;
};

/**
 * Append multiple apprentice records to Google Sheet in a single batch request
 */
export const appendMultipleApprenticeRecords = async (
  token: string,
  spreadsheetId: string,
  records: ApprenticeSheetRecord[]
): Promise<number> => {
  if (records.length === 0) return 0;

  const range = encodeURIComponent(`${SHEET_TAB_NAME}!A:P`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const values = records.map((record) => [
    record.certificateCode,
    record.timestamp,
    record.fullName,
    record.documentType,
    record.documentNumber,
    record.fichaNumber,
    record.programName,
    record.trainingCenter,
    record.regional,
    record.modality,
    record.quizScore,
    record.status,
    record.recordedBy || 'Instructor Administrador',
    record.gamifiedPoints ? String(record.gamifiedPoints) : '0',
    record.timeSpentFormatted || '',
    record.streakMax ? String(record.streakMax) : '0',
  ]);

  const body = {
    range: `${SHEET_TAB_NAME}!A:P`,
    majorDimension: 'ROWS',
    values,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData.error?.message || `Error al sincronizar registros por lote (${res.status})`
    );
  }

  return records.length;
};

/**
 * Add or update Plan de Trabajo tab in Google Sheet
 */
export const syncWorkPlanSheet = async (
  token: string,
  spreadsheetId: string,
  activities: {
    id: string;
    fase: string;
    tema: string;
    objetivo: string;
    actividad: string;
    responsable: string;
    plazoDias: number;
    evidencia: string;
  }[]
): Promise<boolean> => {
  const planTabName = 'Plan_de_Trabajo';
  
  // Try writing to Plan_de_Trabajo tab
  const range = encodeURIComponent(`${planTabName}!A1:H10`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`;

  const headerRow = [
    'ID Actividad',
    'Fase',
    'Tema / Eje Temático',
    'Objetivo Pedagógico',
    'Actividad Propuesta',
    'Responsable',
    'Plazo (Días)',
    'Evidencia Requerida',
  ];

  const dataRows = activities.map((a) => [
    a.id,
    a.fase,
    a.tema,
    a.objetivo,
    a.actividad,
    a.responsable,
    `${a.plazoDias} días hábiles`,
    a.evidencia,
  ]);

  const body = {
    range: `${planTabName}!A1:H10`,
    majorDimension: 'ROWS',
    values: [headerRow, ...dataRows],
  };

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // If tab doesn't exist, we can create the sheet tab via batchUpdate
      const addSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
      const addSheetBody = {
        requests: [
          {
            addSheet: {
              properties: {
                title: planTabName,
              },
            },
          },
        ],
      };

      const addRes = await fetch(addSheetUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addSheetBody),
      });

      if (addRes.ok) {
        // Retry writing
        await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      }
    }
    return true;
  } catch (err) {
    console.warn('Could not write Plan_de_Trabajo tab:', err);
    return false;
  }
};
