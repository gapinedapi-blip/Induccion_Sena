import React from 'react';
import { ApprenticeProfile, ModuleId } from '../types/induction';
import { SENA_MODULES } from '../data/senaData';
import {
  Award,
  BookOpen,
  Scale,
  HeartHandshake,
  Laptop,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  User,
  Sparkles,
  Trophy,
  FileCheck,
  Layers,
  GraduationCap,
  PlayCircle,
  HelpCircle,
} from 'lucide-react';

interface SenaWelcomeHubProps {
  profile: ApprenticeProfile;
  completedModules: ModuleId[];
  onSelectModule: (mod: ModuleId) => void;
  quizScore: number;
  certificateCode: string;
  onOpenProfile: () => void;
  onOpenGlossary: () => void;
}

export function SenaWelcomeHub({
  profile,
  completedModules,
  onSelectModule,
  quizScore,
  certificateCode,
  onOpenProfile,
  onOpenGlossary,
}: SenaWelcomeHubProps) {
  // 6 primary educational modules
  const learningModules = SENA_MODULES.filter((m) => m.id !== 'glosario');

  const completedCount = completedModules.filter((m) => m !== 'tablero' && m !== 'glosario').length;
  const totalCount = learningModules.length; // 7 (identidad, pedagogico, reglamento, bienestar, ecosistema, evaluacion, certificado)
  const percent = Math.min(100, Math.round((completedCount / totalCount) * 100));

  // Determine next pending module
  const nextPendingModule = learningModules.find((m) => !completedModules.includes(m.id)) || learningModules[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inducción Integral SENA · Régimen Acuerdo 009 de 2024</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Bienvenido(a), <span className="text-emerald-300">{profile.fullName || 'Aprendiz SENA'}</span>
            </h1>

            <p className="text-sm text-slate-200 leading-relaxed max-w-xl">
              Inicia tu proceso de apropiación institucional. Conoce tus derechos, deberes, bienestar y supera el desafío evaluativo gamificado para obtener tu acta y constancia oficial.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300 font-mono-data">
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                Ficha: <strong className="text-white">{profile.fichaNumber || '2825000'}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                Programa: <strong className="text-white truncate max-w-[200px] inline-block align-bottom">{profile.programName || 'Tecnólogo en ADSO'}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Modalidad: <strong className="text-white">{profile.modality}</strong>
              </span>
            </div>
          </div>

          {/* Quick Action CTA Card */}
          <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-xl border border-white/20 sm:min-w-[280px] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-200 mb-1.5 font-medium">
                <span>Tu Progreso General</span>
                <span className="font-mono-data font-bold text-emerald-300">{percent}%</span>
              </div>
              <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-300 flex items-center justify-between">
                <span>{completedCount} de {totalCount} fases listas</span>
                {quizScore > 0 && (
                  <span className="text-amber-300 font-semibold font-mono-data">
                    Evaluación: {quizScore}/25 pts
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onSelectModule(nextPendingModule.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Continuar: {nextPendingModule.shortTitle}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  className="flex-1 text-center py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] transition-colors cursor-pointer"
                >
                  Editar mis datos
                </button>
                <button
                  onClick={onOpenGlossary}
                  className="flex-1 text-center py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-emerald-300" />
                  <span>Ver Glosario</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Roadmap Steps */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Ruta de Aprendizaje y Evaluación</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sigue la secuencia pedagógica o ingresa al módulo que desees consultar
            </p>
          </div>
          <button
            onClick={() => onSelectModule('evaluacion')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>Ir directo a la Evaluación & Ranking</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {learningModules.map((mod, index) => {
            const isCompleted = completedModules.includes(mod.id);
            const isEvaluation = mod.id === 'evaluacion';
            const isCertificate = mod.id === 'certificado';

            return (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md ${
                  isEvaluation
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-[#211d17] dark:to-[#1a1c29] border-amber-300 dark:border-amber-700/50 hover:border-amber-500'
                    : isCertificate
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50/60 dark:from-[#11241f] dark:to-[#131b2e] border-emerald-300 dark:border-emerald-700/50 hover:border-emerald-500'
                    : isCompleted
                    ? 'bg-white dark:bg-[#141b2e] border-emerald-300/80 dark:border-emerald-800/60 hover:border-emerald-500'
                    : 'bg-white dark:bg-[#141b2e] border-slate-200 dark:border-[#222e4d] hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono-data font-bold text-slate-400 dark:text-slate-500">
                      Paso {mod.number}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completado
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono-data">
                        ~{mod.durationMinutes} min
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1.5 flex items-center justify-between">
                    <span>{mod.title}</span>
                    {isEvaluation && <Trophy className="w-4 h-4 text-amber-500 shrink-0 ml-1" />}
                    {isCertificate && <FileCheck className="w-4 h-4 text-emerald-500 shrink-0 ml-1" />}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-[#202c48] flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {isCompleted ? 'Repasar módulo' : 'Iniciar módulo'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
