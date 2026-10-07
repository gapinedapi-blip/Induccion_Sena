import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  googleLogout,
  getAccessToken,
  getCurrentUser,
  getOrCreateSpreadsheet,
  fetchApprenticeRecords,
  appendApprenticeRecord,
  appendMultipleApprenticeRecords,
  syncWorkPlanSheet,
  SpreadsheetInfo,
} from '../services/googleWorkspace';
import { ApprenticeSheetRecord, ApprenticeProfile } from '../types/induction';

export function useGoogleWorkspace() {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetInfo | null>(null);
  const [records, setRecords] = useState<ApprenticeSheetRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(false);
  const [isSavingRecord, setIsSavingRecord] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Mandatory confirmation dialog state for mutating Google Sheets data
  const [confirmModalData, setConfirmModalData] = useState<{
    isOpen: boolean;
    record: ApprenticeSheetRecord | null;
  }>({
    isOpen: false,
    record: null,
  });

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (authUser, authToken) => {
        setUser(authUser);
        setToken(authToken);
        setIsLoadingAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsLoadingAuth(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch or create spreadsheet and load records
  const loadSpreadsheetAndRecords = useCallback(async (activeToken?: string) => {
    const currentToken = activeToken || token;
    if (!currentToken) return;

    setIsLoadingRecords(true);
    setStatusMessage(null);
    try {
      const sheetInfo = await getOrCreateSpreadsheet(currentToken);
      setSpreadsheet(sheetInfo);

      const items = await fetchApprenticeRecords(currentToken, sheetInfo.id);
      setRecords(items);
    } catch (err: any) {
      console.error('Error cargando hoja de cálculo:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al conectar con Google Sheets en tu Drive.',
      });
    } finally {
      setIsLoadingRecords(false);
    }
  }, [token]);

  // When token becomes available, auto-load spreadsheet
  useEffect(() => {
    if (token) {
      loadSpreadsheetAndRecords(token);
    } else {
      setSpreadsheet(null);
      setRecords([]);
    }
  }, [token, loadSpreadsheetAndRecords]);

  const handleLogin = async () => {
    setIsLoadingAuth(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadSpreadsheetAndRecords(result.accessToken);
        setStatusMessage({
          type: 'success',
          text: `Conectado exitosamente con ${result.user.displayName || result.user.email}`,
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'No se pudo iniciar sesión con Google.',
      });
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await googleLogout();
      setUser(null);
      setToken(null);
      setSpreadsheet(null);
      setRecords([]);
      setStatusMessage({
        type: 'info',
        text: 'Sesión de Google cerrada.',
      });
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  /**
   * Request recording an apprentice - opens confirmation modal (MANDATORY REQUIREMENT)
   */
  const requestRecordApprentice = (
    profile: ApprenticeProfile,
    quizScore: number,
    certificateCode: string
  ) => {
    const newRecord: ApprenticeSheetRecord = {
      certificateCode,
      timestamp: new Date().toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      fullName: profile.fullName || 'Aprendiz Sin Nombre',
      documentType: profile.documentType || 'CC',
      documentNumber: profile.documentNumber || '00000000',
      fichaNumber: profile.fichaNumber || '000000',
      programName: profile.programName || 'Programa de Formación',
      trainingCenter: profile.trainingCenter || 'Centro de Formación',
      regional: profile.regional || 'Regional SENA',
      modality: profile.modality || 'Presencial',
      quizScore: `${quizScore}/10`,
      status: quizScore >= 7 ? 'APROBADO' : 'EN PROCESO',
      recordedBy: user?.email || user?.displayName || 'Sistema',
    };

    setConfirmModalData({
      isOpen: true,
      record: newRecord,
    });
  };

  /**
   * Close confirmation dialog without mutating data
   */
  const cancelConfirmation = () => {
    setConfirmModalData({ isOpen: false, record: null });
  };

  /**
   * Confirms and executes appending the record to Google Sheets
   */
  const confirmAndAppendRecord = async (): Promise<boolean> => {
    if (!confirmModalData.record) return false;

    // Check if token exists
    let activeToken = token;
    if (!activeToken) {
      try {
        const loginRes = await googleSignIn();
        if (!loginRes) return false;
        setUser(loginRes.user);
        setToken(loginRes.accessToken);
        activeToken = loginRes.accessToken;
      } catch {
        return false;
      }
    }

    setIsSavingRecord(true);
    setStatusMessage(null);
    try {
      let sheetInfo = spreadsheet;
      if (!sheetInfo) {
        sheetInfo = await getOrCreateSpreadsheet(activeToken);
        setSpreadsheet(sheetInfo);
      }

      await appendApprenticeRecord(activeToken, sheetInfo.id, confirmModalData.record);
      
      // Update local state records list immediately
      setRecords((prev) => [confirmModalData.record!, ...prev]);

      setStatusMessage({
        type: 'success',
        text: `¡Aprendiz ${confirmModalData.record.fullName} guardado en la hoja de cálculo en Mi Drive exitosamente!`,
      });

      setConfirmModalData({ isOpen: false, record: null });
      return true;
    } catch (err: any) {
      console.error('Error al guardar registro en Google Sheet:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al guardar en la hoja de cálculo de Google Drive.',
      });
      return false;
    } finally {
      setIsSavingRecord(false);
    }
  };

  /**
   * Sync multiple submissions and optional work plan in batch to Google Sheets
   */
  const syncAllSubmissionsToDrive = async (
    submissionsList: ApprenticeSheetRecord[],
    workPlanActivities?: any[]
  ): Promise<boolean> => {
    let activeToken = token;
    if (!activeToken) {
      try {
        const loginRes = await googleSignIn();
        if (!loginRes) return false;
        setUser(loginRes.user);
        setToken(loginRes.accessToken);
        activeToken = loginRes.accessToken;
      } catch {
        return false;
      }
    }

    setIsSavingRecord(true);
    setStatusMessage(null);
    try {
      let sheetInfo = spreadsheet;
      if (!sheetInfo) {
        sheetInfo = await getOrCreateSpreadsheet(activeToken);
        setSpreadsheet(sheetInfo);
      }

      await appendMultipleApprenticeRecords(activeToken, sheetInfo.id, submissionsList);

      if (workPlanActivities && workPlanActivities.length > 0) {
        await syncWorkPlanSheet(activeToken, sheetInfo.id, workPlanActivities);
      }

      const updatedRecords = await fetchApprenticeRecords(activeToken, sheetInfo.id);
      setRecords(updatedRecords);

      setStatusMessage({
        type: 'success',
        text: `¡${submissionsList.length} aprendices sincronizados en Google Sheets en tu Drive!`,
      });
      return true;
    } catch (err: any) {
      console.error('Error sincronizando lote a Google Sheets:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al sincronizar con Google Sheets en tu Drive.',
      });
      return false;
    } finally {
      setIsSavingRecord(false);
    }
  };

  return {
    user,
    token,
    isLoadingAuth,
    spreadsheet,
    records,
    isLoadingRecords,
    isSavingRecord,
    statusMessage,
    setStatusMessage,
    confirmModalData,
    login: handleLogin,
    logout: handleLogout,
    loadSpreadsheetAndRecords,
    requestRecordApprentice,
    cancelConfirmation,
    confirmAndAppendRecord,
    syncAllSubmissionsToDrive,
  };
}
