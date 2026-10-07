import { useState, useEffect } from 'react';
import { ApprenticeProfile, ModuleId, ApprenticeQuizAnswer, ApprenticeSheetRecord } from '../types/induction';
import { saveSubmission } from '../services/submissionsStore';

const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'María Camila Restrepo Gómez',
  documentType: 'CC',
  documentNumber: '1025893412',
  fichaNumber: '2904812',
  programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  trainingCenter: 'Centro de Servicios y Gestión Empresarial',
  regional: 'Regional Antioquia',
  modality: 'Presencial',
  inductionCompletedDate: new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
};

const STORAGE_KEY = 'sena_induction_state_v1';

export function useInductionState() {
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [activeModule, setActiveModule] = useState<ModuleId>('tablero');

  const [completedModules, setCompletedModules] = useState<ModuleId[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_completed_modules`);
      return saved ? JSON.parse(saved) : ['identidad'];
    } catch {
      return ['identidad'];
    }
  });

  const [solvedCases, setSolvedCases] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_solved_cases`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizScore, setQuizScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quiz_score`);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quiz_completed`);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [certificateCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cert_code`);
      if (saved) return saved;
      const gen = 'SENA-IND-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-2026';
      localStorage.setItem(`${STORAGE_KEY}_cert_code`, gen);
      return gen;
    } catch {
      return 'SENA-IND-7A89B2-2026';
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_dark_mode`);
      if (saved !== null) return saved === 'true';
      return false;
    } catch {
      return false;
    }
  });

  const [blueEffectActive, setBlueEffectActive] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(`${STORAGE_KEY}_dark_mode`, String(isDarkMode));
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setBlueEffectActive(true);
    setIsDarkMode((prev) => !prev);
    setTimeout(() => {
      setBlueEffectActive(false);
    }, 1200);
  };

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_completed_modules`, JSON.stringify(completedModules));
    } catch {
      // ignore
    }
  }, [completedModules]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_solved_cases`, JSON.stringify(solvedCases));
    } catch {
      // ignore
    }
  }, [solvedCases]);

  const markModuleCompleted = (id: ModuleId) => {
    if (!completedModules.includes(id)) {
      setCompletedModules((prev) => [...prev, id]);
    }
  };

  const markCaseSolved = (caseId: string) => {
    if (!solvedCases.includes(caseId)) {
      setSolvedCases((prev) => [...prev, caseId]);
    }
  };

  const recordQuizResult = (
    score: number,
    answersDetail?: ApprenticeQuizAnswer[],
    gamifiedMeta?: {
      totalQuestions?: number;
      timeSpentSeconds?: number;
      timeSpentFormatted?: string;
      gamifiedPoints?: number;
      streakMax?: number;
      badgesEarned?: string[];
      customProfile?: ApprenticeProfile;
    }
  ) => {
    setQuizScore(score);
    setIsQuizCompleted(true);
    markModuleCompleted('evaluacion');

    const effectiveProfile = gamifiedMeta?.customProfile || profile;
    if (gamifiedMeta?.customProfile) {
      setProfile(gamifiedMeta.customProfile);
    }

    const totalQuestions = gamifiedMeta?.totalQuestions || 25;
    const isPassing = (score / totalQuestions) >= 0.7;

    try {
      localStorage.setItem(`${STORAGE_KEY}_quiz_score`, String(score));
      localStorage.setItem(`${STORAGE_KEY}_quiz_completed`, 'true');

      // Auto-save learner submission to submissions repository for the Instructor
      const submission: ApprenticeSheetRecord = {
        certificateCode,
        timestamp: new Date().toLocaleString('es-CO', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        fullName: effectiveProfile.fullName || 'Aprendiz en Inducción',
        documentType: effectiveProfile.documentType || 'CC',
        documentNumber: effectiveProfile.documentNumber || '00000000',
        fichaNumber: effectiveProfile.fichaNumber || '000000',
        programName: effectiveProfile.programName || 'Programa de Formación SENA',
        trainingCenter: effectiveProfile.trainingCenter || 'Centro de Formación',
        regional: effectiveProfile.regional || 'Regional SENA',
        modality: effectiveProfile.modality || 'Presencial',
        quizScore: `${score}/${totalQuestions}`,
        scoreNumber: score,
        totalQuestions,
        timeSpentSeconds: gamifiedMeta?.timeSpentSeconds || 0,
        timeSpentFormatted: gamifiedMeta?.timeSpentFormatted || '00:00',
        gamifiedPoints: gamifiedMeta?.gamifiedPoints || score * 100,
        streakMax: gamifiedMeta?.streakMax || 0,
        badgesEarned: gamifiedMeta?.badgesEarned || [],
        status: isPassing ? 'APROBADO' : 'EN PROCESO (PLAN DE MEJORAMIENTO)',
        answers: answersDetail,
        recordedBy: 'Sistema Inducción Zajuna',
        syncedToSheets: false,
      };
      saveSubmission(submission);
    } catch {
      // ignore
    }
  };

  const resetAllProgress = () => {
    setCompletedModules(['identidad']);
    setSolvedCases([]);
    setQuizScore(0);
    setIsQuizCompleted(false);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_completed_modules`);
      localStorage.removeItem(`${STORAGE_KEY}_solved_cases`);
      localStorage.removeItem(`${STORAGE_KEY}_quiz_score`);
      localStorage.removeItem(`${STORAGE_KEY}_quiz_completed`);
    } catch {
      // ignore
    }
  };

  return {
    profile,
    setProfile,
    activeModule,
    setActiveModule,
    completedModules,
    markModuleCompleted,
    solvedCases,
    markCaseSolved,
    quizScore,
    isQuizCompleted,
    recordQuizResult,
    certificateCode,
    resetAllProgress,
    isDarkMode,
    toggleDarkMode,
    blueEffectActive,
  };
}
