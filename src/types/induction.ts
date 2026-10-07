export interface ApprenticeProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  fichaNumber: string;
  programName: string;
  trainingCenter: string;
  regional: string;
  modality: 'Presencial' | 'Virtual' | 'A Distancia';
  inductionCompletedDate?: string;
}

export type ModuleId = 
  | 'tablero'
  | 'identidad'
  | 'pedagogico'
  | 'reglamento'
  | 'bienestar'
  | 'ecosistema'
  | 'glosario'
  | 'evaluacion'
  | 'certificado';

export interface ApprenticeQuizAnswer {
  questionId: number;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  sectionId?: string;
  sectionName?: string;
  timeSpentSeconds?: number;
  errorExplanation?: string;
}

export interface GamificationStats {
  points: number;
  timeSpentSeconds: number;
  timeSpentFormatted: string;
  correctCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  maxStreak: number;
  speedBonusesEarned: number;
  badges: string[];
}

export interface ApprenticeSheetRecord {
  id?: string;
  certificateCode: string;
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  fichaNumber: string;
  programName: string;
  trainingCenter: string;
  regional: string;
  modality: string;
  quizScore: string;
  scoreNumber?: number;
  totalQuestions?: number;
  timeSpentSeconds?: number;
  timeSpentFormatted?: string;
  gamifiedPoints?: number;
  streakMax?: number;
  badgesEarned?: string[];
  status: string;
  answers?: ApprenticeQuizAnswer[];
  recordedBy?: string;
  syncedToSheets?: boolean;
}

export interface ModuleInfo {
  id: ModuleId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  durationMinutes: number;
  iconName: string;
}

export interface RegulationCase {
  id: string;
  title: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  normativeArticle: string;
  reflection: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sectionId?: string;
  sectionName?: string;
  remedialFeedback?: string;
  articleRef?: string;
}

export interface GlossaryTerm {
  term: string;
  category: 'Institucional' | 'Académico' | 'Tecnológico' | 'Administrativo';
  definition: string;
  example: string;
}
