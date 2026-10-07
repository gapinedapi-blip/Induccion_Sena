import { ApprenticeSheetRecord, ApprenticeQuizAnswer } from '../types/induction';
import { QUIZ_QUESTIONS } from '../data/senaData';
import { ALL_REGLAMENTO_QUESTIONS } from '../data/reglamentoQuizData';

const SUBMISSIONS_STORAGE_KEY = 'sena_apprentice_submissions_v1';

// Sample initial data representing Colombian apprentices who completed induction
const INITIAL_SAMPLE_SUBMISSIONS: ApprenticeSheetRecord[] = [
  {
    id: 'sub-001',
    certificateCode: 'SENA-IND-2026-4482',
    timestamp: '06/10/2026, 09:14:22',
    fullName: 'Valentina Restrepo Castro',
    documentType: 'CC',
    documentNumber: '1020492811',
    fichaNumber: '2981440',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    trainingCenter: 'Centro de Servicios y Gestión Empresarial',
    regional: 'Antioquia',
    modality: 'Virtual',
    quizScore: '25/25',
    scoreNumber: 25,
    totalQuestions: 25,
    gamifiedPoints: 3450,
    timeSpentSeconds: 195,
    timeSpentFormatted: '03:15',
    streakMax: 25,
    badgesEarned: ['Maestro del Acuerdo 009', 'Rayo de Precisión', 'Racha Impecable'],
    status: 'APROBADO',
    recordedBy: 'Sistema Inducción Zajuna',
    syncedToSheets: true,
    answers: ALL_REGLAMENTO_QUESTIONS.map((q) => ({
      questionId: q.id,
      questionText: q.question,
      selectedOption: q.options[q.correctIndex],
      correctOption: q.options[q.correctIndex],
      isCorrect: true,
      sectionId: q.sectionId,
      sectionName: q.sectionName,
    })),
  },
  {
    id: 'sub-002',
    certificateCode: 'SENA-IND-2026-7731',
    timestamp: '06/10/2026, 11:32:05',
    fullName: 'Carlos Eduardo Mendoza Silva',
    documentType: 'CC',
    documentNumber: '1075283910',
    fichaNumber: '2981440',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    trainingCenter: 'Centro de Servicios y Gestión Empresarial',
    regional: 'Antioquia',
    modality: 'Virtual',
    quizScore: '23/25',
    scoreNumber: 23,
    totalQuestions: 25,
    gamifiedPoints: 3020,
    timeSpentSeconds: 240,
    timeSpentFormatted: '04:00',
    streakMax: 14,
    badgesEarned: ['Maestro del Acuerdo 009', 'Especialista en Deberes'],
    status: 'APROBADO',
    recordedBy: 'Sistema Inducción Zajuna',
    syncedToSheets: true,
    answers: ALL_REGLAMENTO_QUESTIONS.map((q, idx) => ({
      questionId: q.id,
      questionText: q.question,
      selectedOption: (idx === 2 || idx === 17) ? q.options[(q.correctIndex + 1) % 4] : q.options[q.correctIndex],
      correctOption: q.options[q.correctIndex],
      isCorrect: !(idx === 2 || idx === 17),
      sectionId: q.sectionId,
      sectionName: q.sectionName,
    })),
  },
  {
    id: 'sub-003',
    certificateCode: 'SENA-IND-2026-9214',
    timestamp: '07/10/2026, 08:20:11',
    fullName: 'Laura Daniela Gómez Morales',
    documentType: 'TI',
    documentNumber: '1098472911',
    fichaNumber: '2981440',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    trainingCenter: 'Centro de Gestión de Mercados',
    regional: 'Distrito Capital',
    modality: 'Presencial',
    quizScore: '22/25',
    scoreNumber: 22,
    totalQuestions: 25,
    gamifiedPoints: 2780,
    timeSpentSeconds: 275,
    timeSpentFormatted: '04:35',
    streakMax: 11,
    badgesEarned: ['Defensor de Derechos'],
    status: 'APROBADO',
    recordedBy: 'Sistema Inducción Zajuna',
    syncedToSheets: false,
    answers: ALL_REGLAMENTO_QUESTIONS.map((q, idx) => ({
      questionId: q.id,
      questionText: q.question,
      selectedOption: (idx === 1 || idx === 6 || idx === 20) ? q.options[(q.correctIndex + 1) % 4] : q.options[q.correctIndex],
      correctOption: q.options[q.correctIndex],
      isCorrect: !(idx === 1 || idx === 6 || idx === 20),
      sectionId: q.sectionId,
      sectionName: q.sectionName,
    })),
  },
  {
    id: 'sub-004',
    certificateCode: 'SENA-IND-2026-3850',
    timestamp: '07/10/2026, 10:45:19',
    fullName: 'Jhoan Sebastián Pérez Díaz',
    documentType: 'CC',
    documentNumber: '1102938472',
    fichaNumber: '2981440',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    trainingCenter: 'Centro Industrial y de Aviación',
    regional: 'Atlántico',
    modality: 'Virtual',
    quizScore: '16/25',
    scoreNumber: 16,
    totalQuestions: 25,
    gamifiedPoints: 1840,
    timeSpentSeconds: 340,
    timeSpentFormatted: '05:40',
    streakMax: 6,
    badgesEarned: [],
    status: 'EN PROCESO (PLAN DE MEJORAMIENTO)',
    recordedBy: 'Sistema Inducción Zajuna',
    syncedToSheets: false,
    answers: ALL_REGLAMENTO_QUESTIONS.map((q, idx) => ({
      questionId: q.id,
      questionText: q.question,
      selectedOption: [2, 3, 5, 8, 12, 14, 19, 23, 24].includes(idx) ? q.options[(q.correctIndex + 1) % 4] : q.options[q.correctIndex],
      correctOption: q.options[q.correctIndex],
      isCorrect: ![2, 3, 5, 8, 12, 14, 19, 23, 24].includes(idx),
      sectionId: q.sectionId,
      sectionName: q.sectionName,
    })),
  },
  {
    id: 'sub-005',
    certificateCode: 'SENA-IND-2026-1192',
    timestamp: '07/10/2026, 12:15:30',
    fullName: 'Mariana Sofia Torres Rojas',
    documentType: 'CC',
    documentNumber: '1014892019',
    fichaNumber: '2981440',
    programName: 'Tecnólogo en Gestión Empresarial',
    trainingCenter: 'Centro de Servicios Financieros',
    regional: 'Distrito Capital',
    modality: 'Presencial',
    quizScore: '24/25',
    scoreNumber: 24,
    totalQuestions: 25,
    gamifiedPoints: 3290,
    timeSpentSeconds: 210,
    timeSpentFormatted: '03:30',
    streakMax: 19,
    badgesEarned: ['Maestro del Acuerdo 009', 'Rayo de Precisión'],
    status: 'APROBADO',
    recordedBy: 'Sistema Inducción Zajuna',
    syncedToSheets: false,
    answers: ALL_REGLAMENTO_QUESTIONS.map((q, idx) => ({
      questionId: q.id,
      questionText: q.question,
      selectedOption: idx === 15 ? q.options[(q.correctIndex + 1) % 4] : q.options[q.correctIndex],
      correctOption: q.options[q.correctIndex],
      isCorrect: idx !== 15,
      sectionId: q.sectionId,
      sectionName: q.sectionName,
    })),
  },
];

/**
 * Retrieve all submissions from local persistent storage
 */
export function getSubmissions(): ApprenticeSheetRecord[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_SUBMISSIONS));
      return INITIAL_SAMPLE_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_SUBMISSIONS;
  } catch (err) {
    console.error('Error loading submissions:', err);
    return INITIAL_SAMPLE_SUBMISSIONS;
  }
}

/**
 * Save or update an apprentice submission
 */
export function saveSubmission(record: ApprenticeSheetRecord): ApprenticeSheetRecord[] {
  try {
    const current = getSubmissions();
    const existingIndex = current.findIndex(
      (s) => s.documentNumber === record.documentNumber && s.fichaNumber === record.fichaNumber
    );

    let updated: ApprenticeSheetRecord[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        ...record,
        id: updated[existingIndex].id || `sub-${Date.now()}`,
      };
    } else {
      const newEntry: ApprenticeSheetRecord = {
        ...record,
        id: record.id || `sub-${Date.now()}`,
      };
      updated = [newEntry, ...current];
    }

    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving submission:', err);
    return getSubmissions();
  }
}

/**
 * Mark a single submission as synced to Google Sheets
 */
export function markSubmissionSynced(certificateCode: string): void {
  try {
    const current = getSubmissions();
    const updated = current.map((s) =>
      s.certificateCode === certificateCode ? { ...s, syncedToSheets: true } : s
    );
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error marking synced:', err);
  }
}

/**
 * Mark all submissions as synced to Google Sheets
 */
export function markAllSubmissionsSynced(): void {
  try {
    const current = getSubmissions();
    const updated = current.map((s) => ({ ...s, syncedToSheets: true }));
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error marking all synced:', err);
  }
}

/**
 * Leaderboard entry representing a ranked apprentice
 */
export interface LeaderboardEntry {
  rank: number;
  id: string;
  fullName: string;
  documentNumber: string;
  fichaNumber: string;
  regional: string;
  programName: string;
  quizScore: string;
  scoreNumber: number;
  totalQuestions: number;
  accuracyPercentage: number;
  gamifiedPoints: number;
  timeSpentSeconds: number;
  timeSpentFormatted: string;
  streakMax: number;
  badgesEarned: string[];
  status: string;
  isCurrentApprentice?: boolean;
}

/**
 * Calculate the gamified leaderboard sorted by Points (descending) and Time (ascending)
 */
export function getGamifiedLeaderboard(
  providedSubmissions?: ApprenticeSheetRecord[],
  currentDocumentNumber?: string
): LeaderboardEntry[] {
  const list = providedSubmissions || getSubmissions();

  const formatted: LeaderboardEntry[] = list.map((s, idx) => {
    const totalQ = s.totalQuestions || 25;
    const scoreNum = s.scoreNumber ?? parseInt(s.quizScore?.split('/')[0] || '20', 10);
    const accuracy = Math.round((scoreNum / totalQ) * 100);

    // If no points saved yet, calculate a realistic score based on accuracy and time
    const timeSec = s.timeSpentSeconds || 240 + (idx * 25);
    const calculatedPoints = s.gamifiedPoints || (scoreNum * 100 + (scoreNum >= 20 ? 500 : 200) + Math.max(0, 300 - Math.floor(timeSec / 2)));
    const minutes = Math.floor(timeSec / 60);
    const seconds = timeSec % 60;
    const formattedTime = s.timeSpentFormatted || `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return {
      rank: 0,
      id: s.id || `sub-${idx}`,
      fullName: s.fullName || 'Aprendiz SENA',
      documentNumber: s.documentNumber,
      fichaNumber: s.fichaNumber || '2981440',
      regional: s.regional || 'SENA',
      programName: s.programName || 'ADSO',
      quizScore: s.quizScore || `${scoreNum}/${totalQ}`,
      scoreNumber: scoreNum,
      totalQuestions: totalQ,
      accuracyPercentage: accuracy,
      gamifiedPoints: calculatedPoints,
      timeSpentSeconds: timeSec,
      timeSpentFormatted: formattedTime,
      streakMax: s.streakMax || Math.min(scoreNum, 8),
      badgesEarned: s.badgesEarned || (scoreNum >= 20 ? ['Maestro del Acuerdo 009'] : []),
      status: s.status || (scoreNum >= (totalQ * 0.7) ? 'APROBADO' : 'EN PROCESO'),
      isCurrentApprentice: Boolean(currentDocumentNumber && s.documentNumber === currentDocumentNumber),
    };
  });

  // Sort by points desc, then timeSpentSeconds asc
  formatted.sort((a, b) => {
    if (b.gamifiedPoints !== a.gamifiedPoints) {
      return b.gamifiedPoints - a.gamifiedPoints;
    }
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });

  return formatted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
}

/**
 * Compute Question-level statistics to diagnose learning gaps
 */
export interface QuestionStat {
  id: number;
  question: string;
  category: string;
  correctAnswersCount: number;
  totalSubmissions: number;
  accuracyRate: number; // 0 to 100
  needsReinforcement: boolean;
  recommendedAction: string;
}

export function calculateQuestionStats(submissions: ApprenticeSheetRecord[]): QuestionStat[] {
  // Use ALL_REGLAMENTO_QUESTIONS if any submission has answer with questionId >= 100, otherwise fallback
  const hasReglamentoAnswers = submissions.some((sub) =>
    sub.answers?.some((a) => a.questionId >= 100)
  );

  const baseQuestions = hasReglamentoAnswers ? ALL_REGLAMENTO_QUESTIONS : QUIZ_QUESTIONS;

  return baseQuestions.map((q) => {
    let correctCount = 0;
    let answeredCount = 0;

    submissions.forEach((sub) => {
      if (sub.answers) {
        const userAns = sub.answers.find((a) => a.questionId === q.id);
        if (userAns) {
          answeredCount++;
          if (userAns.isCorrect) correctCount++;
        }
      } else {
        // Fallback estimate based on score proportion
        const score = sub.scoreNumber ?? parseInt(sub.quizScore?.split('/')[0] || '7', 10);
        const total = sub.totalQuestions || 25;
        if (score / total >= 0.7) correctCount++;
        answeredCount++;
      }
    });

    const total = answeredCount || 1;
    const accuracy = Math.round((correctCount / total) * 100);
    const needsReinforcement = accuracy < 75;

    let action = 'Contenido asimilado satisfactoriamente por la cohorte.';
    if (accuracy < 60) {
      action = `Refuerzo Urgente: Taller sincrónico sobre ${q.category} y lectura guiada del Acuerdo 009 de 2024.`;
    } else if (accuracy < 75) {
      action = `Nivelación sugerida: Actividad complementaria en Zajuna LMS con casos prácticos.`;
    }

    return {
      id: q.id,
      question: q.question,
      category: q.category,
      correctAnswersCount: correctCount,
      totalSubmissions: answeredCount,
      accuracyRate: accuracy,
      needsReinforcement,
      recommendedAction: action,
    };
  });
}

/**
 * Generate Action Work Plan (Plan de Trabajo y Nivelación de Inducción)
 */
export interface WorkPlanActivity {
  id: string;
  fase: string;
  tema: string;
  objetivo: string;
  actividad: string;
  responsable: string;
  plazoDias: number;
  evidencia: string;
}

export function generateInstitutionalWorkPlan(submissions: ApprenticeSheetRecord[]): {
  approvedCount: number;
  pendingCount: number;
  averageScore: number;
  activities: WorkPlanActivity[];
} {
  const total = submissions.length || 1;
  const approved = submissions.filter((s) => {
    const sc = s.scoreNumber ?? parseInt(s.quizScore?.split('/')[0] || '7', 10);
    const tot = s.totalQuestions || (s.quizScore?.includes('/25') ? 25 : 10);
    return sc >= (tot * 0.7);
  }).length;
  const pending = total - approved;
  const totalScores = submissions.reduce(
    (acc, s) => acc + (s.scoreNumber ?? parseInt(s.quizScore?.split('/')[0] || '7', 10)),
    0
  );
  const avg = Math.round((totalScores / total) * 10) / 10;

  const activities: WorkPlanActivity[] = [
    {
      id: 'ACT-01',
      fase: 'Fase I: Diagnóstico',
      tema: 'Socialización del Reglamento del Aprendiz (Acuerdo 009 de 2024)',
      objetivo: 'Aclarar derechos, deberes y clasificación de faltas disciplinarias y académicas.',
      actividad: 'Sesión sincrónica en Microsoft Teams/Zajuna con análisis de casos y dilemas éticos.',
      responsable: 'Instructor Líder de Ficha y Vocero',
      plazoDias: 3,
      evidencia: 'Grabación de sesión y taller de 5 preguntas resuelto en Zajuna',
    },
    {
      id: 'ACT-02',
      fase: 'Fase II: Pedagogía FPI',
      tema: 'Estructura Curricular y Etapa Productiva',
      objetivo: 'Garantizar comprensión de las alternativas de etapa productiva (contrato de aprendizaje, vínculo laboral, proyecto productivo).',
      actividad: 'Socialización con la Coordinación Académica y la Agencia Pública de Empleo (APE).',
      responsable: 'Coordinador Académico / Enlace APE',
      plazoDias: 5,
      evidencia: 'Formato de compromiso de selección de modalidad productiva',
    },
    {
      id: 'ACT-03',
      fase: 'Fase III: Nivelación',
      tema: 'Plan de Mejoramiento Individual para Aprendices en Proceso',
      objetivo: 'Nivelar a los aprendices con puntaje menor al 70% en el desafío de inducción.',
      actividad: 'Entrega de portafolio de evidencias guiadas y segunda oportunidad de evaluación.',
      responsable: 'Equipo Ejecutor de Instructores',
      plazoDias: 7,
      evidencia: 'Acta de Plan de Mejoramiento según formato oficial SENA',
    },
    {
      id: 'ACT-04',
      fase: 'Fase IV: Cierre',
      tema: 'Consolidación de Actas y Constancias en Portafolio Digital',
      objetivo: 'Verificar que el 100% de la ficha tenga su acta oficial archivada en el LMS Zajuna.',
      actividad: 'Revisión y auditoría de portafolios de evidencias en la plataforma Zajuna.',
      responsable: 'Instructor de Seguimiento y Aprendiz',
      plazoDias: 10,
      evidencia: 'Listado oficial validado con firmas y hoja de cálculo sincronizada en Drive',
    },
  ];

  return {
    approvedCount: approved,
    pendingCount: pending,
    averageScore: avg,
    activities,
  };
}

/**
 * Generate CSV representation of submissions for instant download
 */
export function exportSubmissionsToCSV(submissions: ApprenticeSheetRecord[]): string {
  const headers = [
    'Codigo Constancia',
    'Fecha y Hora',
    'Nombre Completo',
    'Tipo Documento',
    'Numero Documento',
    'Ficha',
    'Programa de Formacion',
    'Centro de Formacion',
    'Regional',
    'Modalidad',
    'Puntaje',
    'Puntos Gamificados',
    'Tiempo Empleado',
    'Racha Maxima',
    'Estado',
    'Sincronizado Drive',
  ];

  const escapeCSV = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;

  const rows = submissions.map((s) => [
    escapeCSV(s.certificateCode),
    escapeCSV(s.timestamp),
    escapeCSV(s.fullName),
    escapeCSV(s.documentType),
    escapeCSV(s.documentNumber),
    escapeCSV(s.fichaNumber),
    escapeCSV(s.programName),
    escapeCSV(s.trainingCenter),
    escapeCSV(s.regional),
    escapeCSV(s.modality),
    escapeCSV(s.quizScore),
    escapeCSV(String(s.gamifiedPoints || 0)),
    escapeCSV(s.timeSpentFormatted || '00:00'),
    escapeCSV(String(s.streakMax || 0)),
    escapeCSV(s.status),
    escapeCSV(s.syncedToSheets ? 'SI' : 'PENDIENTE'),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
