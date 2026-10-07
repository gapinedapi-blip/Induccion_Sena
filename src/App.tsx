/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useInductionState } from './hooks/useInductionState';
import { ModuleId } from './types/induction';
import { SENA_MODULES } from './data/senaData';
import { Header } from './components/Header';
import { ApprenticeModal } from './components/ApprenticeModal';
import { ModuleIdentidad } from './components/modules/ModuleIdentidad';
import { ModulePedagogico } from './components/modules/ModulePedagogico';
import { ModuleReglamento } from './components/modules/ModuleReglamento';
import { ModuleBienestar } from './components/modules/ModuleBienestar';
import { ModuleEcosistema } from './components/modules/ModuleEcosistema';
import { ModuleGlosario } from './components/modules/ModuleGlosario';
import { ModuleQuiz } from './components/modules/ModuleQuiz';
import { ModuleCertificado } from './components/modules/ModuleCertificado';
import { AdminPortalModal } from './components/admin/AdminPortalModal';
import { DriveConfirmationModal } from './components/DriveConfirmationModal';
import { SenaWelcomeHub } from './components/SenaWelcomeHub';
import { GlossaryFloatingModal } from './components/GlossaryFloatingModal';
import { CheckCircle2, Award, ChevronRight, BookOpen, LayoutDashboard, Lock, ShieldCheck, Compass } from 'lucide-react';
import { useGoogleWorkspace } from './hooks/useGoogleWorkspace';

export default function App() {
  const {
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
    isDarkMode,
    toggleDarkMode,
    blueEffectActive,
  } = useInductionState();

  const {
    user: googleUser,
    token: googleToken,
    isLoadingAuth,
    spreadsheet,
    records: sheetRecords,
    isLoadingRecords,
    isSavingRecord,
    statusMessage,
    setStatusMessage,
    confirmModalData,
    login: handleGoogleLogin,
    logout: handleGoogleLogout,
    loadSpreadsheetAndRecords,
    requestRecordApprentice,
    cancelConfirmation,
    confirmAndAppendRecord,
    syncAllSubmissionsToDrive,
  } = useGoogleWorkspace();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  // Keyboard shortcut Ctrl+Shift+A or Alt+A to open Admin Portal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminPortalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentModuleIndex = SENA_MODULES.findIndex((m) => m.id === activeModule);
  const nextModule = SENA_MODULES[currentModuleIndex + 1];

  const handleNextModule = () => {
    if (nextModule) {
      setActiveModule(nextModule.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPercentage = Math.round(
    (completedModules.length / SENA_MODULES.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 relative">
      {/* Visual Efecto Blue Overlay Flash when mode changes */}
      {blueEffectActive && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.4),rgba(56,189,248,0.25),transparent_75%)] blue-mode-flash"
        />
      )}

      {/* 3-Zone Top Bar Contract */}
      <Header
        activeModule={activeModule}
        onSelectModule={(mod) => {
          setActiveModule(mod);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        apprenticeName={profile.fullName}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        blueEffectActive={blueEffectActive}
        isDriveConnected={Boolean(googleUser)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Progress & Module Navigation Ribbon */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 no-print transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Apprentice quick status */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold font-mono-data border border-emerald-200 dark:border-emerald-800">
              {profile.documentType}
            </div>
            <div className="text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block truncate max-w-[280px]">
                {profile.fullName || 'Aprendiz en Inducción'}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono-data">
                Ficha {profile.fichaNumber} · {profile.modality}
              </span>
            </div>
          </div>

          {/* Module Step Stepper */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Progreso Inducción:</span>
              <span className="text-xs font-bold font-mono-data text-emerald-700 dark:text-emerald-400">
                {completedModules.length} / {SENA_MODULES.length} ({progressPercentage}%)
              </span>
            </div>
            <div className="w-24 sm:w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Clean Linear Module Stepper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          <button
            onClick={() => {
              setActiveModule('tablero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeModule === 'tablero'
                ? 'bg-[#00a8e8] text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#1a2138] dark:text-slate-300 dark:hover:bg-[#283556]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Inicio & Ruta</span>
          </button>

          {SENA_MODULES.map((mod) => {
            const isActive = activeModule === mod.id;
            const isCompleted = completedModules.includes(mod.id);

            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModule(mod.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold dark:bg-[#00a8e8] dark:text-white dark:shadow-[0_0_12px_rgba(0,168,232,0.4)]'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/50 dark:border dark:border-emerald-800/40'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span className="font-mono-data text-[10px] opacity-80">{mod.number}</span>
                <span>{mod.shortTitle}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeModule === 'tablero' && (
          <SenaWelcomeHub
            profile={profile}
            completedModules={completedModules}
            onSelectModule={(mod) => {
              setActiveModule(mod);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            quizScore={quizScore}
            certificateCode={certificateCode}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        )}
        {activeModule === 'identidad' && (
          <ModuleIdentidad
            onComplete={() => markModuleCompleted('identidad')}
            isCompleted={completedModules.includes('identidad')}
            onNext={handleNextModule}
          />
        )}

        {activeModule === 'pedagogico' && (
          <ModulePedagogico
            onComplete={() => markModuleCompleted('pedagogico')}
            isCompleted={completedModules.includes('pedagogico')}
            onNext={handleNextModule}
          />
        )}

        {activeModule === 'reglamento' && (
          <ModuleReglamento
            onComplete={() => markModuleCompleted('reglamento')}
            isCompleted={completedModules.includes('reglamento')}
            onNext={handleNextModule}
            solvedCases={solvedCases}
            onSolveCase={markCaseSolved}
          />
        )}

        {activeModule === 'bienestar' && (
          <ModuleBienestar
            onComplete={() => markModuleCompleted('bienestar')}
            isCompleted={completedModules.includes('bienestar')}
            onNext={handleNextModule}
          />
        )}

        {activeModule === 'ecosistema' && (
          <ModuleEcosistema
            onComplete={() => markModuleCompleted('ecosistema')}
            isCompleted={completedModules.includes('ecosistema')}
            onNext={handleNextModule}
          />
        )}

        {activeModule === 'glosario' && (
          <ModuleGlosario
            onComplete={() => markModuleCompleted('glosario')}
            isCompleted={completedModules.includes('glosario')}
            onNext={handleNextModule}
          />
        )}

        {activeModule === 'evaluacion' && (
          <ModuleQuiz
            profile={profile}
            onUpdateProfile={(newProf) => setProfile(newProf)}
            onQuizComplete={(score, answersDetail, gamifiedMeta) =>
              recordQuizResult(score, answersDetail, gamifiedMeta)
            }
            savedScore={quizScore}
            isCompleted={isQuizCompleted}
            onGoToCertificate={() => {
              setActiveModule('certificado');
              markModuleCompleted('certificado');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeModule === 'certificado' && (
          <ModuleCertificado
            profile={profile}
            certificateCode={certificateCode}
            quizScore={quizScore}
            onOpenEditProfile={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-slate-900 text-slate-300 py-10 border-t border-slate-800 text-xs no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-2 space-y-2">
              <span className="font-bold text-white text-sm block">
                Servicio Nacional de Aprendizaje - SENA
              </span>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Entidad pública adscrita al Ministerio del Trabajo de Colombia. Formación profesional integral gratuita para el desarrollo social y técnico de los trabajadores.
              </p>
              <div className="text-slate-500 font-mono-data pt-1">
                Línea gratuita nacional: 01 8000 910 270 · Bogotá: (601) 343 0111
              </div>
            </div>

            <div>
              <span className="font-semibold text-white block mb-2">Canales Oficiales</span>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="https://www.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Portal Web Principal</a></li>
                <li><a href="https://zajuna.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Zajuna LMS</a></li>
                <li><a href="http://senasofiaplus.edu.co" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Sofia Plus</a></li>
                <li><a href="https://ape.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Agencia Pública de Empleo</a></li>
              </ul>
            </div>

            <div>
              <span className="font-semibold text-white block mb-2">Normativa & Bienestar</span>
              <ul className="space-y-1.5 text-slate-400">
                <li>Acuerdo 009 de 2024 (Reglamento del Aprendiz)</li>
                <li>Ley 789 de 2002 (Contrato de Aprendizaje)</li>
                <li>Plan Nacional de Bienestar</li>
                <li>Código de Integridad Institucional</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
            <span>© {new Date().getFullYear()} SENA · Todos los derechos reservados · República de Colombia</span>
            <div className="flex items-center gap-4">
              <span>Plataforma Interactiva de Inducción para Aprendices</span>
              <button
                onClick={() => setIsAdminPortalOpen(true)}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 cursor-pointer text-[11px]"
                title="Acceso seguro para el Instructor y Administración"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-medium text-slate-300 hover:text-emerald-400">Acceso Instructor / Admin</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Apprentice Details Edit Modal */}
      <ApprenticeModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={(updated) => setProfile(updated)}
      />

      {/* Mandatory User Confirmation Dialog for mutating Google Sheets in Drive */}
      <DriveConfirmationModal
        isOpen={confirmModalData.isOpen}
        record={confirmModalData.record}
        isLoading={isSavingRecord}
        onConfirm={confirmAndAppendRecord}
        onCancel={cancelConfirmation}
      />

      {/* Quick Search Institutional Glossary Modal */}
      <GlossaryFloatingModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Secure Administrator / Instructor Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        googleUser={googleUser}
        isLoadingAuth={isLoadingAuth}
        spreadsheet={spreadsheet}
        onGoogleLogin={handleGoogleLogin}
        onGoogleLogout={handleGoogleLogout}
        onSyncAllToDrive={syncAllSubmissionsToDrive}
        isSyncingToDrive={isSavingRecord}
      />
    </div>
  );
}
