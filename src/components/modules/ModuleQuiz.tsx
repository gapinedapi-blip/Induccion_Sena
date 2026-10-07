import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  REGLAMENTO_QUIZ_SECTIONS,
  ALL_REGLAMENTO_QUESTIONS,
  ReglamentoSectionConfig,
} from '../../data/reglamentoQuizData';
import {
  ApprenticeProfile,
  ApprenticeQuizAnswer,
  QuizQuestion,
} from '../../types/induction';
import {
  getGamifiedLeaderboard,
  LeaderboardEntry,
} from '../../services/submissionsStore';
import {
  playSuccessChime,
  playAlertTone,
  playFanfare,
} from '../../utils/soundEffects';
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Clock,
  Zap,
  Flame,
  Trophy,
  ShieldCheck,
  User,
  Edit2,
  Check,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Search,
  Medal,
  Timer,
  Play,
  Volume2,
  VolumeX,
  Filter,
} from 'lucide-react';

interface Props {
  profile: ApprenticeProfile;
  onUpdateProfile?: (profile: ApprenticeProfile) => void;
  onQuizComplete: (
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
  ) => void;
  savedScore: number;
  isCompleted: boolean;
  onGoToCertificate: () => void;
}

export function ModuleQuiz({
  profile,
  onUpdateProfile,
  onQuizComplete,
  savedScore,
  isCompleted,
  onGoToCertificate,
}: Props) {
  // Navigation tabs: 'evaluacion' | 'ranking' | 'datos'
  const [activeTab, setActiveTab] = useState<'evaluacion' | 'ranking' | 'datos'>('evaluacion');

  // Local apprentice profile state (allows direct modification in the quiz module)
  const [apprenticeData, setApprenticeData] = useState<ApprenticeProfile>({
    fullName: profile?.fullName || '',
    documentType: profile?.documentType || 'CC',
    documentNumber: profile?.documentNumber || '',
    fichaNumber: profile?.fichaNumber || '',
    programName: profile?.programName || '',
    trainingCenter: profile?.trainingCenter || '',
    regional: profile?.regional || '',
    modality: profile?.modality || 'Virtual',
  });
  const [isDataSavedNotification, setIsDataSavedNotification] = useState(false);

  // Quiz state
  const questionsList = ALL_REGLAMENTO_QUESTIONS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [answersDetailList, setAnswersDetailList] = useState<ApprenticeQuizAnswer[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(isCompleted);
  const [finalScore, setFinalScore] = useState<number>(savedScore || 0);

  // Gamification state
  const [gamifiedPoints, setGamifiedPoints] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [lastPointsGained, setLastPointsGained] = useState<{
    base: number;
    speedBonus: number;
    streakBonus: number;
    total: number;
  } | null>(null);

  // Timer state
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState<number>(0);
  const [questionElapsedSeconds, setQuestionElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Leaderboard state
  const [leaderboardFilter, setLeaderboardFilter] = useState('');
  const [onlyMyFicha, setOnlyMyFicha] = useState(false);

  // Sound toggle (persisted in localStorage)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('sena_quiz_sound') !== 'false';
  });

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('sena_quiz_sound', String(next));
      return next;
    });
  };

  // Keep apprenticeData in sync if prop changes and user hasn't edited
  useEffect(() => {
    if (profile && !apprenticeData.fullName) {
      setApprenticeData(profile);
    }
  }, [profile]);

  // Main chronometer interval (pauses when explanation is showing or quiz is not running)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !showExplanation && !quizFinished) {
      interval = setInterval(() => {
        setTotalElapsedSeconds((prev) => prev + 1);
        setQuestionElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, showExplanation, quizFinished]);

  // Start timer automatically when the evaluation tab is active and not finished
  useEffect(() => {
    if (activeTab === 'evaluacion' && !quizFinished) {
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
    }
  }, [activeTab, quizFinished]);

  // Formatting helpers
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ: QuizQuestion = questionsList[currentIndex] || questionsList[0];
  const userSelectedOption = selectedAnswers[currentQ.id];

  // Identify which section this question belongs to (1 to 5)
  const currentSectionIndex = Math.min(
    Math.floor(currentIndex / 5),
    REGLAMENTO_QUIZ_SECTIONS.length - 1
  );
  const currentSection = REGLAMENTO_QUIZ_SECTIONS[currentSectionIndex];
  const questionNumberInSection = (currentIndex % 5) + 1;

  // Handle saving apprentice data inside the evaluation module
  const handleSaveApprenticeData = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile(apprenticeData);
    }
    setIsDataSavedNotification(true);
    setTimeout(() => {
      setIsDataSavedNotification(false);
      setActiveTab('evaluacion');
    }, 1200);
  };

  // Option selection logic & gamification scoring
  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return; // Locked once answered

    const isCorrect = optionIndex === currentQ.correctIndex;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));

    // Calculate gamification points
    let base = 0;
    let speedBonus = 0;
    let streakBonus = 0;
    let newStreak = 0;
    let newMaxStreak = maxStreak;

    if (isCorrect) {
      base = 100;
      // Speed bonus based on question elapsed seconds
      if (questionElapsedSeconds <= 10) {
        speedBonus = 50;
      } else if (questionElapsedSeconds <= 20) {
        speedBonus = 25;
      } else if (questionElapsedSeconds <= 35) {
        speedBonus = 10;
      }

      // Streak multiplier bonus
      newStreak = currentStreak + 1;
      if (newStreak >= 5) {
        streakBonus = 75;
      } else if (newStreak >= 3) {
        streakBonus = 40;
      } else if (newStreak >= 2) {
        streakBonus = 20;
      }

      if (newStreak > newMaxStreak) {
        newMaxStreak = newStreak;
        setMaxStreak(newMaxStreak);
      }

      setCurrentStreak(newStreak);

      const totalEarned = base + speedBonus + streakBonus;
      setGamifiedPoints((prev) => prev + totalEarned);
      setLastPointsGained({ base, speedBonus, streakBonus, total: totalEarned });

      // Trigger sound feedback
      playSuccessChime(soundEnabled);

      // Trigger celebratory micro-confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    } else {
      // Incorrect answer: reset streak, zero points
      playAlertTone(soundEnabled);
      setCurrentStreak(0);
      setLastPointsGained(null);
    }

    // Save answer detail
    const newAnswer: ApprenticeQuizAnswer = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      selectedOption: currentQ.options[optionIndex],
      correctOption: currentQ.options[currentQ.correctIndex],
      isCorrect,
      sectionId: currentQ.sectionId,
      sectionName: currentQ.sectionName,
      timeSpentSeconds: questionElapsedSeconds,
      errorExplanation: !isCorrect ? currentQ.remedialFeedback : undefined,
    };

    setAnswersDetailList((prev) => {
      const filtered = prev.filter((a) => a.questionId !== currentQ.id);
      return [...filtered, newAnswer];
    });

    setShowExplanation(true);
  };

  // Move to next question or conclude test
  const handleNext = () => {
    setShowExplanation(false);
    setQuestionElapsedSeconds(0);

    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Conclude evaluation
      finishEvaluation();
    }
  };

  const finishEvaluation = () => {
    // Calculate final correct count
    let correctCount = 0;
    const finalDetails: ApprenticeQuizAnswer[] = questionsList.map((q) => {
      const selIdx = selectedAnswers[q.id];
      const isCorrect = selIdx === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        questionText: q.question,
        selectedOption: selIdx !== undefined ? q.options[selIdx] : 'Sin responder',
        correctOption: q.options[q.correctIndex],
        isCorrect,
        sectionId: q.sectionId,
        sectionName: q.sectionName,
        timeSpentSeconds: questionElapsedSeconds,
        errorExplanation: !isCorrect ? q.remedialFeedback : undefined,
      };
    });

    setFinalScore(correctCount);
    setQuizFinished(true);
    setIsTimerRunning(false);

    // Compute badges earned
    const badges: string[] = [];
    if (correctCount >= 20) badges.push('Maestro del Acuerdo 009');
    if (totalElapsedSeconds <= 300 && correctCount >= 18) badges.push('Rayo de Precisión');
    if (maxStreak >= 5) badges.push('Racha Imparable');
    if (correctCount === 25) badges.push('Puntaje Perfecto SENA');

    // Send complete record up to state and submissions store
    onQuizComplete(correctCount, finalDetails, {
      totalQuestions: 25,
      timeSpentSeconds: totalElapsedSeconds,
      timeSpentFormatted: formatTime(totalElapsedSeconds),
      gamifiedPoints: gamifiedPoints,
      streakMax: maxStreak,
      badgesEarned: badges,
      customProfile: apprenticeData,
    });

    // Big confetti and fanfare on passing
    if (correctCount >= 18) {
      playFanfare(soundEnabled);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setAnswersDetailList([]);
    setCurrentIndex(0);
    setShowExplanation(false);
    setQuizFinished(false);
    setGamifiedPoints(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setTotalElapsedSeconds(0);
    setQuestionElapsedSeconds(0);
    setIsTimerRunning(true);
  };

  const isPassing = finalScore >= 18; // 70% of 25 = 17.5 -> 18 questions
  const totalQuestions = questionsList.length;

  // Retrieve current gamified leaderboard
  const rawLeaderboard = getGamifiedLeaderboard(undefined, apprenticeData.documentNumber);
  const filteredLeaderboard = rawLeaderboard.filter((entry) => {
    const q = leaderboardFilter.toLowerCase();
    const matchesSearch =
      entry.fullName.toLowerCase().includes(q) ||
      entry.fichaNumber.includes(q) ||
      entry.regional.toLowerCase().includes(q);
    const matchesFicha = !onlyMyFicha || (apprenticeData.fichaNumber && entry.fichaNumber.trim() === apprenticeData.fichaNumber.trim());
    return matchesSearch && matchesFicha;
  });

  return (
    <div className="space-y-8">
      {/* Header and Mode Selector */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1">
            <span>Módulo 06</span>
            <span aria-hidden="true">·</span>
            <span>Evaluación Integral</span>
            <span aria-hidden="true">·</span>
            <span>Acuerdo 009 de 2024</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
            Desafío del Reglamento: Evaluación Gamificada
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Responde 5 preguntas por cada una de las 5 secciones del reglamento. Obtén puntos por velocidad, racha de aciertos y compite en el ranking de tu ficha.
          </p>
        </div>

        {/* Tab switch buttons + Sound Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title={soundEnabled ? 'Sonidos de acierto activados (clic para silenciar)' : 'Sonidos silenciados (clic para activar)'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
            <span className="hidden sm:inline text-[11px] font-semibold">
              {soundEnabled ? 'Sonido ON' : 'Silencio'}
            </span>
          </button>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl shrink-0 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('evaluacion')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'evaluacion'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Cuestionario (25)</span>
          </button>

          <button
            onClick={() => setActiveTab('ranking')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'ranking'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Ranking Gamificado</span>
          </button>

          <button
            onClick={() => setActiveTab('datos')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'datos'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5 text-blue-500" />
            <span>Mis Datos</span>
          </button>
        </div>
        </div>
      </div>

      {/* TAB 1: DATOS DEL APRENDIZ (Ingreso y actualización) */}
      {activeTab === 'datos' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-3xl mx-auto shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Datos del Aprendiz para Registro de Inducción
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Esta información se sincronizará automáticamente con la Hoja de Cálculo del Administrador y tu certificado.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveApprenticeData} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo del Aprendiz *
                </label>
                <input
                  type="text"
                  required
                  value={apprenticeData.fullName}
                  onChange={(e) =>
                    setApprenticeData({ ...apprenticeData, fullName: e.target.value })
                  }
                  placeholder="Ej. Valentina Restrepo Castro"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tipo de Documento
                </label>
                <select
                  value={apprenticeData.documentType}
                  onChange={(e) =>
                    setApprenticeData({
                      ...apprenticeData,
                      documentType: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="TI">Tarjeta de Identidad (TI)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                  <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Número de Documento *
                </label>
                <input
                  type="text"
                  required
                  value={apprenticeData.documentNumber}
                  onChange={(e) =>
                    setApprenticeData({ ...apprenticeData, documentNumber: e.target.value })
                  }
                  placeholder="Ej. 1020492811"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Número de Ficha de Caracterización *
                </label>
                <input
                  type="text"
                  required
                  value={apprenticeData.fichaNumber}
                  onChange={(e) =>
                    setApprenticeData({ ...apprenticeData, fichaNumber: e.target.value })
                  }
                  placeholder="Ej. 2981440"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Modalidad de Formación
                </label>
                <select
                  value={apprenticeData.modality}
                  onChange={(e) =>
                    setApprenticeData({
                      ...apprenticeData,
                      modality: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Virtual">Virtual</option>
                  <option value="Presencial">Presencial</option>
                  <option value="A Distancia">A Distancia</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Programa de Formación *
                </label>
                <input
                  type="text"
                  required
                  value={apprenticeData.programName}
                  onChange={(e) =>
                    setApprenticeData({ ...apprenticeData, programName: e.target.value })
                  }
                  placeholder="Ej. Tecnólogo en Análisis y Desarrollo de Software (ADSO)"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Centro de Formación
                </label>
                <input
                  type="text"
                  value={apprenticeData.trainingCenter}
                  onChange={(e) =>
                    setApprenticeData({ ...apprenticeData, trainingCenter: e.target.value })
                  }
                  placeholder="Ej. Centro de Servicios y Gestión Empresarial"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Regional SENA
                </label>
                <input
                  type="text"
                  value={apprenticeData.regional}
                  onChange={(e) =>
                    setApprenticeData({ ...apprenticeData, regional: e.target.value })
                  }
                  placeholder="Ej. Antioquia / Distrito Capital"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              {isDataSavedNotification && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>¡Datos guardados con éxito! Redirigiendo...</span>
                </div>
              )}
              {!isDataSavedNotification && <span />}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('evaluacion')}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Volver a la Prueba
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar y Aplicar a la Prueba</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: RANKING GAMIFICADO EN VIVO */}
      {activeTab === 'ranking' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Podium Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {/* 2nd Place */}
            {rawLeaderboard[1] && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center flex flex-col items-center justify-between order-2 sm:order-1 relative">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-lg mb-2 shadow-xs border-2 border-slate-300 dark:border-slate-600">
                  🥈 2°
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                    {rawLeaderboard[1].fullName}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono-data">
                    Ficha {rawLeaderboard[1].fichaNumber}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 w-full flex justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Puntos</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono-data">
                      {rawLeaderboard[1].gamifiedPoints.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Tiempo</span>
                    <strong className="font-mono-data text-slate-700 dark:text-slate-300">
                      {rawLeaderboard[1].timeSpentFormatted}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {/* 1st Place - Gold */}
            {rawLeaderboard[0] && (
              <div className="bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-900 border-2 border-amber-400/80 dark:border-amber-500/60 rounded-2xl p-6 text-center flex flex-col items-center justify-between order-1 sm:order-2 shadow-md relative scale-105">
                <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
                  Campeón de la Cohorte
                </div>
                <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold text-2xl mb-2 shadow-xs border-2 border-amber-400">
                  🥇 1°
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                    {rawLeaderboard[0].fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono-data">
                    Ficha {rawLeaderboard[0].fichaNumber} · {rawLeaderboard[0].regional}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-900/50 w-full flex justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Puntuación</span>
                    <strong className="text-amber-600 dark:text-amber-400 font-mono-data text-sm">
                      {rawLeaderboard[0].gamifiedPoints.toLocaleString()} pts
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Tiempo</span>
                    <strong className="font-mono-data text-slate-800 dark:text-slate-200 text-sm">
                      {rawLeaderboard[0].timeSpentFormatted}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {rawLeaderboard[2] && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center flex flex-col items-center justify-between order-3 relative">
                <div className="w-12 h-12 rounded-full bg-amber-900/20 text-amber-800 dark:text-amber-500 flex items-center justify-center font-bold text-lg mb-2 shadow-xs border-2 border-amber-700/40">
                  🥉 3°
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                    {rawLeaderboard[2].fullName}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono-data">
                    Ficha {rawLeaderboard[2].fichaNumber}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 w-full flex justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Puntos</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono-data">
                      {rawLeaderboard[2].gamifiedPoints.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Tiempo</span>
                    <strong className="font-mono-data text-slate-700 dark:text-slate-300">
                      {rawLeaderboard[2].timeSpentFormatted}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Table Leaderboard Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Tabla Oficial de Posiciones Gamificada
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono-data">
                  {filteredLeaderboard.length} de {rawLeaderboard.length} Aprendices
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setOnlyMyFicha(!onlyMyFicha)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                    onlyMyFicha
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                  title="Mostrar únicamente aprendices de mi misma ficha"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Mi Ficha ({apprenticeData.fichaNumber || 'Actual'})</span>
                </button>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={leaderboardFilter}
                    onChange={(e) => setLeaderboardFilter(e.target.value)}
                    placeholder="Filtrar aprendiz..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono-data uppercase text-[10px]">
                    <th className="py-2.5 px-4">Puesto</th>
                    <th className="py-2.5 px-4">Aprendiz</th>
                    <th className="py-2.5 px-4">Ficha</th>
                    <th className="py-2.5 px-4 text-center">Aciertos</th>
                    <th className="py-2.5 px-4 text-center">Racha Máx</th>
                    <th className="py-2.5 px-4 text-center">Tiempo</th>
                    <th className="py-2.5 px-4 text-right">Puntos Gamificados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                  {filteredLeaderboard.map((entry) => (
                    <tr
                      key={entry.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        entry.isCurrentApprentice
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 font-semibold border-l-4 border-l-emerald-600'
                          : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono-data">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                            entry.rank === 1
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                              : entry.rank === 2
                              ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                              : entry.rank === 3
                              ? 'bg-amber-900/20 text-amber-800 dark:text-amber-500'
                              : 'text-slate-500'
                          }`}
                        >
                          {entry.rank}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{entry.fullName}</span>
                          {entry.isCurrentApprentice && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-semibold">
                              Tú
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono-data block">
                          {entry.programName}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono-data text-slate-600 dark:text-slate-400">
                        {entry.fichaNumber}
                      </td>

                      <td className="py-3 px-4 text-center font-mono-data">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                          {entry.quizScore}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center font-mono-data">
                        <span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400">
                          <Flame className="w-3 h-3" />
                          <span>{entry.streakMax}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center font-mono-data text-slate-700 dark:text-slate-300">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{entry.timeSpentFormatted}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono-data">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                          {entry.gamifiedPoints.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1">pts</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EVALUACIÓN PRINCIPAL (CUESTIONARIO INTERACTIVO) */}
      {activeTab === 'evaluacion' && !quizFinished && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Top Live Status Bar: Reloj, Racha, Puntos Gamificados */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-wrap items-center justify-between gap-4">
            {/* Reloj de Tiempo Transcurrido */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-inner">
                <Timer className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono-data text-slate-400 tracking-wider block">
                  Cronómetro de Prueba
                </span>
                <span className="text-lg font-bold font-mono-data tracking-tight text-white">
                  {formatTime(totalElapsedSeconds)}
                </span>
                <span className="text-[10px] text-slate-400 ml-2 font-mono-data">
                  (Pregunta: {questionElapsedSeconds}s)
                </span>
              </div>
            </div>

            {/* Racha y Combo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Flame
                  className={`w-4 h-4 transition-transform ${
                    currentStreak > 0 ? 'text-amber-400 scale-125' : 'text-slate-500'
                  }`}
                />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Racha</span>
                  <span className="text-xs font-bold font-mono-data text-amber-300">
                    {currentStreak} {currentStreak >= 3 ? '🔥 Combo!' : 'aciertos'}
                  </span>
                </div>
              </div>

              {/* Puntuación Gamificada */}
              <div className="flex items-center gap-2 bg-emerald-950/80 px-3.5 py-1.5 rounded-xl border border-emerald-700/60">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-emerald-300 uppercase tracking-wider block">
                    Puntos
                  </span>
                  <span className="text-sm font-bold font-mono-data text-emerald-200">
                    {gamifiedPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Breadcrumb & Progress Stepper across all 5 Sections */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  {currentSection.chapterNumber}: {currentSection.shortTitle}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400">
                  Pregunta {questionNumberInSection} de 5
                </span>
              </div>
              <span className="font-mono-data text-slate-500 dark:text-slate-400 text-[11px]">
                Total: {currentIndex + 1} de {totalQuestions} ({Math.round(((currentIndex + 1) / totalQuestions) * 100)}%)
              </span>
            </div>

            {/* 5-section segmented progress bar */}
            <div className="grid grid-cols-5 gap-1.5">
              {REGLAMENTO_QUIZ_SECTIONS.map((sec, secIdx) => {
                const isSectionActive = secIdx === currentSectionIndex;
                const isSectionPassed = secIdx < currentSectionIndex;
                return (
                  <div key={sec.id} className="space-y-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isSectionPassed
                          ? 'bg-emerald-600 dark:bg-emerald-500'
                          : isSectionActive
                          ? 'bg-emerald-400 dark:bg-emerald-600 animate-pulse'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    />
                    <span
                      className={`text-[9px] block truncate font-medium text-center ${
                        isSectionActive
                          ? 'text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      Cap {secIdx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono-data uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {currentQ.sectionName}
                </span>
                <span className="text-[10px] font-mono-data uppercase text-slate-500 dark:text-slate-400">
                  {currentQ.category}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = userSelectedOption === optIdx;
                const isCorrectOption = optIdx === currentQ.correctIndex;

                let btnClass =
                  'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300';

                if (showExplanation) {
                  if (isCorrectOption) {
                    btnClass =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 font-medium ring-2 ring-emerald-500';
                  } else if (isSelected && !isCorrectOption) {
                    btnClass =
                      'border-red-400 bg-red-50 dark:bg-red-950/70 text-red-950 dark:text-red-100 ring-2 ring-red-400 animate-pulse';
                  } else {
                    btnClass =
                      'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 text-slate-400 dark:text-slate-600 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={showExplanation}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all flex items-start gap-3.5 cursor-pointer ${btnClass}`}
                  >
                    <span className="w-6 h-6 rounded-lg border border-current flex items-center justify-center shrink-0 text-xs font-mono-data font-bold mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 pt-0.5">{optionText}</span>
                    {showExplanation && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                    )}
                    {showExplanation && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* REFUERZO POSITIVO O REFUERZO REMEDIAL CON ANIMACIÓN */}
            {showExplanation && (
              <div className="space-y-4 pt-2">
                {userSelectedOption === currentQ.correctIndex ? (
                  /* REFUERZO POSITIVO */
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-700/60 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span>¡Respuesta Correcta! Refuerzo Positivo</span>
                      </div>
                      {lastPointsGained && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono-data text-xs font-bold shadow-xs">
                          +{lastPointsGained.total} Pts
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    {lastPointsGained && (
                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-mono-data text-emerald-700 dark:text-emerald-400 border-t border-emerald-200/60 dark:border-emerald-800/60">
                        <span>Base: +{lastPointsGained.base} pts</span>
                        {lastPointsGained.speedBonus > 0 && (
                          <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                            <Zap className="w-3 h-3" /> Rapidez ({questionElapsedSeconds}s): +
                            {lastPointsGained.speedBonus} pts
                          </span>
                        )}
                        {lastPointsGained.streakBonus > 0 && (
                          <span className="flex items-center gap-1 font-semibold text-orange-700 dark:text-orange-400">
                            <Flame className="w-3 h-3" /> Racha x{currentStreak}: +
                            {lastPointsGained.streakBonus} pts
                          </span>
                        )}
                      </div>
                    )}

                    <div className="text-[11px] font-mono-data text-slate-500 dark:text-slate-400">
                      <strong>Referencia Jurídica:</strong> {currentQ.articleRef}
                    </div>
                  </div>
                ) : (
                  /* REFUERZO CORRECTIVO / REMEDIAL (EN QUÉ FALLÓ EL APRENDIZ) */
                  <div className="p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/50 border-2 border-amber-300 dark:border-amber-700/80 space-y-3 animate-in shake duration-300">
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Refuerzo Pedagógico: Análisis del Error</span>
                    </div>

                    {/* Diagnostic: What was wrong */}
                    <div className="bg-white/90 dark:bg-slate-900/90 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1.5">
                      <span className="text-[11px] uppercase font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        ¿En qué falló tu respuesta?
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                        {currentQ.remedialFeedback}
                      </p>
                    </div>

                    {/* Correct explanation */}
                    <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed pt-1">
                      <strong>Fundamento Normativo: </strong>
                      {currentQ.explanation}
                    </div>

                    <div className="text-[11px] font-mono-data text-slate-600 dark:text-slate-400 pt-1">
                      <strong>Artículo del Acuerdo 009 de 2024:</strong> {currentQ.articleRef}
                    </div>
                  </div>
                )}

                {/* Next button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 < totalQuestions
                        ? 'Siguiente Pregunta'
                        : 'Finalizar Evaluación'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FINISHED RESULTS VIEW */}
      {activeTab === 'evaluacion' && quizFinished && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm max-w-2xl mx-auto text-center space-y-6">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-inner ${
              isPassing
                ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400'
                : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400'
            }`}
          >
            {isPassing ? <Trophy className="w-10 h-10" /> : <HelpCircle className="w-10 h-10" />}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white">
              {isPassing
                ? '¡Felicitaciones! Has Superado la Evaluación de Inducción'
                : 'Casi lo logras. ¡Realiza una nueva oportunidad!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
              {isPassing
                ? `Has demostrado un dominio ejemplar de las 5 secciones del Acuerdo 009 de 2024. Tus datos han sido guardados para el registro oficial de la Hoja de Cálculo del Administrador.`
                : `Se requiere un mínimo del 70% (18 aciertos de 25 preguntas). Revisa las retroalimentaciones del reglamento y vuelve a intentarlo.`}
            </p>
          </div>

          {/* Gamified Stat Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-mono-data block">Aciertos</span>
              <span className="text-xl font-bold font-mono-data text-slate-900 dark:text-white">
                {finalScore} <span className="text-xs text-slate-400 font-normal">/ {totalQuestions}</span>
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-mono-data block">Puntos Gamificados</span>
              <span className="text-xl font-bold font-mono-data text-emerald-600 dark:text-emerald-400">
                {gamifiedPoints.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-mono-data block">Tiempo Total</span>
              <span className="text-xl font-bold font-mono-data text-slate-900 dark:text-white">
                {formatTime(totalElapsedSeconds)}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-mono-data block">Racha Máxima</span>
              <span className="text-xl font-bold font-mono-data text-amber-500">
                {maxStreak} 🔥
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 dark:bg-slate-800">
            <span>Juicio Evaluativo:</span>
            <span
              className={
                isPassing
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-amber-700 dark:text-amber-400'
              }
            >
              {isPassing ? 'COMPETENTE (Aprobado)' : 'EN PROCESO (Plan de Mejoramiento)'}
            </span>
          </div>

          {/* Apprentice identity confirmation banner */}
          <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">
              Registro Asociado al Aprendiz:
            </span>
            <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-300">
              <span>{apprenticeData.fullName || 'Aprendiz Registrado'}</span>
              <span>·</span>
              <span>Doc: {apprenticeData.documentType} {apprenticeData.documentNumber}</span>
              <span>·</span>
              <span>Ficha: {apprenticeData.fichaNumber}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('ranking')}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Ver mi Puesto en el Ranking</span>
            </button>

            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Presentar Nuevamente</span>
            </button>

            {isPassing && (
              <button
                onClick={onGoToCertificate}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Generar mi Acta y Certificado</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
