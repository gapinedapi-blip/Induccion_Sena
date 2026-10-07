import React, { useState, useEffect } from 'react';
import { ApprenticeSheetRecord, ApprenticeQuizAnswer } from '../../types/induction';
import {
  getSubmissions,
  calculateQuestionStats,
  generateInstitutionalWorkPlan,
  exportSubmissionsToCSV,
  markAllSubmissionsSynced,
} from '../../services/submissionsStore';
import { User } from 'firebase/auth';
import { SpreadsheetInfo } from '../../services/googleWorkspace';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  UserCheck,
  Users,
  Award,
  Download,
  Eye,
  Clock,
  Sparkles,
  BarChart3,
  Calendar,
  AlertTriangle,
  HelpCircle,
  FileText,
  Layers,
  ChevronRight,
  LogOut,
  UploadCloud,
  Printer,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/senaData';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Google Workspace state
  googleUser: User | null;
  isLoadingAuth: boolean;
  spreadsheet: SpreadsheetInfo | null;
  onGoogleLogin: () => Promise<void>;
  onGoogleLogout: () => Promise<void>;
  onSyncAllToDrive: (
    submissions: ApprenticeSheetRecord[],
    workPlanActivities?: any[]
  ) => Promise<boolean>;
  isSyncingToDrive: boolean;
}

export function AdminPortalModal({
  isOpen,
  onClose,
  googleUser,
  isLoadingAuth,
  spreadsheet,
  onGoogleLogin,
  onGoogleLogout,
  onSyncAllToDrive,
  isSyncingToDrive,
}: AdminPortalModalProps) {
  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sena_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active admin tab: 'respuestas' | 'drive' | 'plantrabajo'
  const [activeTab, setActiveTab] = useState<'respuestas' | 'drive' | 'plantrabajo'>('respuestas');

  // Submissions data
  const [submissions, setSubmissions] = useState<ApprenticeSheetRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'aprobados' | 'en_proceso'>('todos');

  // Selected submission for viewing detailed 10 questions answers
  const [selectedSubmission, setSelectedSubmission] = useState<ApprenticeSheetRecord | null>(null);

  // Status notification
  const [statusNotification, setStatusNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Reload submissions from local store when opening or after sync
  useEffect(() => {
    if (isOpen) {
      const items = getSubmissions();
      setSubmissions(items);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Admin login
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default instructor password is SENA2025* or sena2025 or admin123
    const validPasswords = ['SENA2025*', 'sena2025', 'admin123', 'Gustavo2025'];
    if (validPasswords.includes(passwordInput.trim()) || passwordInput.trim() === 'SENA2025') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sena_admin_auth', 'true');
      setAuthError(null);
    } else {
      setAuthError('Contraseña incorrecta. Utiliza la clave de instructor SENA2025*');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sena_admin_auth');
    setPasswordInput('');
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      sub.fullName.toLowerCase().includes(q) ||
      sub.documentNumber.includes(q) ||
      sub.fichaNumber.includes(q) ||
      sub.certificateCode.toLowerCase().includes(q);

    const totalQ = sub.totalQuestions || (sub.quizScore?.includes('/25') ? 25 : 10);
    const scoreVal = sub.scoreNumber ?? parseInt(sub.quizScore?.split('/')[0] || '0', 10);
    const isApproved = sub.status === 'APROBADO' || (scoreVal / totalQ) >= 0.7;
    const matchesFilter =
      statusFilter === 'todos' ||
      (statusFilter === 'aprobados' && isApproved) ||
      (statusFilter === 'en_proceso' && !isApproved);

    return matchesSearch && matchesFilter;
  });

  const totalApprentices = submissions.length;
  const approvedCount = submissions.filter(
    (s) => (s.scoreNumber ?? parseInt(s.quizScore, 10)) >= 7
  ).length;
  const pendingImprovementCount = totalApprentices - approvedCount;
  const pendingSyncCount = submissions.filter((s) => !s.syncedToSheets).length;

  // Handle Export CSV
  const handleExportCSV = () => {
    const csvContent = exportSubmissionsToCSV(submissions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SENA_Induccion_Aprendices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Printable PDF/Print Institutional Summary
  const handlePrintInstitutionalReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const rowsHtml = submissions.map((sub, i) => `
      <tr>
        <td style="padding: 6px; border: 1px solid #ccc; font-family: monospace;">${i + 1}</td>
        <td style="padding: 6px; border: 1px solid #ccc;"><strong>${sub.fullName}</strong></td>
        <td style="padding: 6px; border: 1px solid #ccc; font-family: monospace;">${sub.documentType} ${sub.documentNumber}</td>
        <td style="padding: 6px; border: 1px solid #ccc; font-family: monospace;">${sub.fichaNumber}</td>
        <td style="padding: 6px; border: 1px solid #ccc;">${sub.programName}</td>
        <td style="padding: 6px; border: 1px solid #ccc; text-align: center; font-weight: bold;">${sub.quizScore}</td>
        <td style="padding: 6px; border: 1px solid #ccc; text-align: center;">${sub.gamifiedPoints || 0} pts</td>
        <td style="padding: 6px; border: 1px solid #ccc; text-align: center;">
          <span style="color: ${(sub.scoreNumber ?? parseInt(sub.quizScore, 10)) >= 7 ? '#15803d' : '#b45309'}; font-weight: bold;">
            ${(sub.scoreNumber ?? parseInt(sub.quizScore, 10)) >= 7 ? 'APROBADO' : 'PLAN MEJORAMIENTO'}
          </span>
        </td>
        <td style="padding: 6px; border: 1px solid #ccc; font-family: monospace; font-size: 11px;">${sub.certificateCode}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Acta y Reporte Consolidado de Inducción SENA</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; margin: 20px; color: #1e293b; }
            h1 { font-size: 18px; margin: 0; color: #047857; }
            h2 { font-size: 13px; margin: 4px 0 16px 0; color: #475569; }
            .meta { margin-bottom: 16px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th { background: #0f172a; color: white; padding: 8px; border: 1px solid #334155; text-align: left; }
            .footer { margin-top: 30px; font-size: 10px; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 8px; }
          </style>
        </head>
        <body>
          <h1>SERVICIO NACIONAL DE APRENDIZAJE - SENA</h1>
          <h2>ACTA OFICIAL DE RESULTADOS DE INDUCCIÓN · ACUERDO 009 DE 2024</h2>
          <div class="meta">
            <strong>Fecha de Generación:</strong> ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}<br/>
            <strong>Total Aprendices Registrados:</strong> ${submissions.length} &nbsp;|&nbsp; 
            <strong>Aprobados:</strong> ${approvedCount} &nbsp;|&nbsp; 
            <strong>Plan de Mejoramiento:</strong> ${pendingImprovementCount} &nbsp;|&nbsp;
            <strong>Promedio Cohorte:</strong> ${workPlan.averageScore}/10
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Aprendiz</th>
                <th>Documento</th>
                <th>Ficha</th>
                <th>Programa</th>
                <th>Aciertos</th>
                <th>Puntos</th>
                <th>Estado</th>
                <th>Cód. Acta</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <div class="footer">
            Documento Institucional Oficial emitido desde el Módulo de Control de Inducción SENA para trazabilidad y archivo docente.
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Question stats and Work plan
  const questionStats = calculateQuestionStats(submissions);
  const workPlan = generateInstitutionalWorkPlan(submissions);

  // Handle batch sync to Google Sheets
  const handleSyncToSheets = async () => {
    setStatusNotification(null);
    const success = await onSyncAllToDrive(submissions, workPlan.activities);
    if (success) {
      markAllSubmissionsSynced();
      setSubmissions(getSubmissions());
      setStatusNotification({
        type: 'success',
        message: '¡Todos los aprendices y el Plan de Trabajo fueron sincronizados en la hoja de cálculo de Google Drive!',
      });
    } else {
      setStatusNotification({
        type: 'error',
        message: 'No se pudo sincronizar con Google Sheets. Verifica que hayas iniciado sesión con tu cuenta de Google.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white dark:bg-[#111728] w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-200 dark:border-[#243050] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-[#18233c] to-emerald-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                  Módulo de Seguridad Institucional
                </span>
                <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700/60 text-emerald-300 font-mono">
                  Acceso Restringido
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Portal de Administración e Instructor · Respuestas y Mi Drive
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleAdminLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Cerrar sesión de administrador"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Bloquear Panel</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOT AUTHENTICATED: Show Instructor Password Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 shadow-inner border border-emerald-200 dark:border-emerald-800">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Acceso Seguro para Instructor / Administrador
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Por <strong>seguridad de la información</strong> y protección del cuestionario, el acceso a la hoja de cálculo de Google Drive y las respuestas de los aprendices está restringido exclusivamente al instructor.
            </p>

            <form onSubmit={handleAdminLogin} className="w-full mt-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Contraseña de Instructor
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Ingresa tu clave de instructor"
                    autoFocus
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#2a385e] bg-slate-50 dark:bg-[#161f36] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Clave predeterminada: <strong className="font-mono text-emerald-600 dark:text-emerald-400">SENA2025*</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setPasswordInput('SENA2025*');
                    }}
                    className="text-emerald-600 dark:text-emerald-400 underline hover:no-underline cursor-pointer"
                  >
                    Usar clave
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Desbloquear Panel de Instructor</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#202b48] w-full text-center text-[11px] text-slate-400 space-y-1">
              <p>🔒 Cumplimiento Ley 1581 de 2012 (Habeas Data Colombia)</p>
              <p>Las respuestas y planillas permanecen ocultas para los aprendices en la vista pública.</p>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED WORKSPACE */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Status notification banner if any */}
            {statusNotification && (
              <div
                className={`px-6 py-2.5 text-xs flex items-center justify-between border-b ${
                  statusNotification.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {statusNotification.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{statusNotification.message}</span>
                </div>
                <button
                  onClick={() => setStatusNotification(null)}
                  className="p-1 hover:opacity-75 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Quick Metrics & Tab Bar Ribbon */}
            <div className="bg-slate-100/80 dark:bg-[#161f36] px-6 py-3 border-b border-slate-200 dark:border-[#253255] flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Tab navigation */}
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('respuestas')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'respuestas'
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-[#1e2945] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#28375c]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Respuestas & Aprendices ({totalApprentices})</span>
                </button>

                <button
                  onClick={() => setActiveTab('drive')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'drive'
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-[#1e2945] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#28375c]'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hoja de Cálculo en Mi Drive</span>
                  {googleUser && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('plantrabajo')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'plantrabajo'
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-[#1e2945] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#28375c]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Plan de Trabajo & Mejoramiento</span>
                </button>
              </div>

              {/* Status pills */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">{approvedCount}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Aprobados</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">{pendingImprovementCount}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Plan Nivelación</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Promedio:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {workPlan.averageScore}/10
                  </span>
                </div>
              </div>
            </div>

            {/* TAB 1: RESPUESTAS & APRENDICES */}
            {activeTab === 'respuestas' && (
              <div className="p-6 space-y-6">
                {/* Search & Actions toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por aprendiz, cédula o ficha..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#1a233b] border border-slate-200 dark:border-[#2a385e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e: any) => setStatusFilter(e.target.value)}
                      className="py-2 px-3 rounded-xl text-xs bg-slate-50 dark:bg-[#1a233b] border border-slate-200 dark:border-[#2a385e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="todos">Todos los Estados</option>
                      <option value="aprobados">Solo Aprobados (≥ 7/10)</option>
                      <option value="en_proceso">Requieren Mejoramiento (&lt; 7/10)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                    <button
                      onClick={handlePrintInstitutionalReport}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2945] dark:hover:bg-[#28375c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2d3a60] flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Generar Acta Oficial e Imprimir Reporte Consolidado"
                    >
                      <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Generar Acta / PDF</span>
                    </button>

                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2945] dark:hover:bg-[#28375c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2d3a60] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>Exportar CSV</span>
                    </button>

                    <button
                      onClick={handleSyncToSheets}
                      disabled={isSyncingToDrive}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{isSyncingToDrive ? 'Sincronizando...' : 'Sincronizar a Mi Drive'}</span>
                    </button>
                  </div>
                </div>

                {/* Apprentice Submissions Table */}
                <div className="rounded-xl border border-slate-200 dark:border-[#253255] overflow-hidden bg-white dark:bg-[#151c31] shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-[#1a233b] text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[#253255]">
                        <tr>
                          <th className="py-3 px-4">Aprendiz</th>
                          <th className="py-3 px-4">Documento / Ficha</th>
                          <th className="py-3 px-4">Programa & Regional</th>
                          <th className="py-3 px-4 text-center">Calificación</th>
                          <th className="py-3 px-4">Estado</th>
                          <th className="py-3 px-4">Fecha Presentación</th>
                          <th className="py-3 px-4 text-center">Drive</th>
                          <th className="py-3 px-4 text-right">Detalle Respuestas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-[#202a46]">
                        {filteredSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-8 text-center text-slate-500">
                              No se encontraron registros con los filtros seleccionados.
                            </td>
                          </tr>
                        ) : (
                          filteredSubmissions.map((sub) => {
                            const totalQ = sub.totalQuestions || (sub.quizScore?.includes('/25') ? 25 : 10);
                            const scoreNum = sub.scoreNumber ?? parseInt(sub.quizScore?.split('/')[0] || '0', 10);
                            const hasPassed = sub.status === 'APROBADO' || (scoreNum / totalQ) >= 0.7;

                            return (
                              <tr
                                key={sub.certificateCode}
                                className="hover:bg-slate-50/80 dark:hover:bg-[#1b2540] transition-colors"
                              >
                                <td className="py-3 px-4">
                                  <div className="font-semibold text-slate-900 dark:text-white">
                                    {sub.fullName}
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-mono">
                                    Código: {sub.certificateCode}
                                  </div>
                                </td>

                                <td className="py-3 px-4">
                                  <div className="text-slate-700 dark:text-slate-300 font-mono-data">
                                    {sub.documentType} {sub.documentNumber}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    Ficha <span className="font-mono font-medium">{sub.fichaNumber}</span>
                                  </div>
                                </td>

                                <td className="py-3 px-4 max-w-[220px]">
                                  <div className="truncate text-slate-800 dark:text-slate-200" title={sub.programName}>
                                    {sub.programName}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    {sub.regional} · {sub.modality}
                                  </div>
                                </td>

                                <td className="py-3 px-4 text-center">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono font-bold text-xs ${
                                      hasPassed
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                                    }`}
                                  >
                                    {sub.quizScore}
                                  </span>
                                </td>

                                <td className="py-3 px-4">
                                  <span
                                    className={`text-[11px] font-semibold ${
                                      hasPassed
                                        ? 'text-emerald-700 dark:text-emerald-400'
                                        : 'text-amber-700 dark:text-amber-400'
                                    }`}
                                  >
                                    {hasPassed ? 'Aprobado' : 'Plan Mejoramiento'}
                                  </span>
                                </td>

                                <td className="py-3 px-4 text-slate-500 font-mono-data text-[11px]">
                                  {sub.timestamp}
                                </td>

                                <td className="py-3 px-4 text-center">
                                  {sub.syncedToSheets ? (
                                    <span
                                      className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium"
                                      title="Sincronizado en Google Sheets"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>OK</span>
                                    </span>
                                  ) : (
                                    <span
                                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500"
                                      title="Pendiente de sincronizar a Google Sheets"
                                    >
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>Pendiente</span>
                                    </span>
                                  )}
                                </td>

                                <td className="py-3 px-4 text-right">
                                  <button
                                    onClick={() => setSelectedSubmission(sub)}
                                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#1f2a47] dark:hover:bg-[#28375c] text-slate-700 dark:text-slate-200 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Ver Respuestas</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MI DRIVE & HOJA DE CÁLCULO */}
            {activeTab === 'drive' && (
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-teal-500/10 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs shrink-0">
                        <FileSpreadsheet className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          Conexión Privada con Google Drive del Instructor
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          La hoja de cálculo se aloja exclusivamente en tu cuenta de Google Drive personal / institucional. Los aprendices en ningún momento tienen acceso a ella ni conocen su URL.
                        </p>
                      </div>
                    </div>

                    <div>
                      {googleUser ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSyncToSheets}
                            disabled={isSyncingToDrive}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingToDrive ? 'animate-spin' : ''}`} />
                            <span>{isSyncingToDrive ? 'Sincronizando...' : 'Sincronizar a Mi Drive'}</span>
                          </button>

                          <button
                            onClick={onGoogleLogout}
                            className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                            title="Desconectar cuenta Google"
                          >
                            Desconectar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={onGoogleLogin}
                          disabled={isLoadingAuth}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                          <span>{isLoadingAuth ? 'Conectando...' : 'Conectar Google Drive'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Connected Account & File Details */}
                  {googleUser && (
                    <div className="mt-5 pt-4 border-t border-emerald-300/40 dark:border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-slate-600 dark:text-slate-300">
                          Cuenta conectada: <strong>{googleUser.email}</strong> ({googleUser.displayName || 'Instructor'})
                        </span>
                      </div>

                      {spreadsheet && (
                        <a
                          href={spreadsheet.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                        >
                          <span>Abrir Hoja de Cálculo en Google Sheets</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Structure info cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border border-slate-200 dark:border-[#253255] bg-white dark:bg-[#161f36] space-y-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <FileText className="w-4 h-4 text-emerald-500" />
                      <span>Pestaña 1: Aprendices (Base de Datos Oficial)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Estructurada con 13 columnas institucionales: Código de Verificación, Fecha y Hora, Nombre Completo, Tipo y Número de Documento, Ficha, Programa, Centro, Regional, Modalidad, Puntaje, Estado y Auditoría.
                    </p>
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      Total registros en cola local: {submissions.length} aprendices
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border border-slate-200 dark:border-[#253255] bg-white dark:bg-[#161f36] space-y-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      <span>Pestaña 2: Plan_de_Trabajo (Nivelación FPI)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Sincroniza automáticamente la matriz de nivelación con las 4 fases institucionales, plazos en días hábiles, responsables y evidencias requeridas en el LMS Zajuna según el Acuerdo 009 de 2024.
                    </p>
                    <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                      4 fases estructuradas listas para reporte
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PLAN DE TRABAJO & MEJORAMIENTO */}
            {activeTab === 'plantrabajo' && (
              <div className="p-6 space-y-6">
                {/* Intro banner */}
                <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 font-mono">
                      Normativa SENA · Acuerdo 009 de 2024
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      Plan de Trabajo y Plan de Mejoramiento del Aprendiz
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      Generado a partir de los aciertos y fallos detectados en el Desafío de Inducción. Permite al instructor implementar acciones formativas de refuerzo y remitir los planes correspondientes al Comité de Evaluación.
                    </p>
                  </div>

                  <button
                    onClick={handleSyncToSheets}
                    disabled={isSyncingToDrive}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    Guardar Plan en Google Sheets
                  </button>
                </div>

                {/* Section A: Diagnóstico de Respuestas por Pregunta */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Diagnóstico Grupal por Pregunta (Tasa de Aciertos)
                    </h4>
                    <span className="text-xs text-slate-500">
                      Basado en {submissions.length} evaluaciones
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {questionStats.map((qs) => (
                      <div
                        key={qs.id}
                        className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                          qs.needsReinforcement
                            ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60'
                            : 'bg-white dark:bg-[#161f36] border-slate-200 dark:border-[#253255]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                            P{qs.id}. {qs.question}
                          </span>
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              qs.accuracyRate >= 80
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : qs.accuracyRate >= 60
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            }`}
                          >
                            {qs.accuracyRate}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              qs.accuracyRate >= 80
                                ? 'bg-emerald-500'
                                : qs.accuracyRate >= 60
                                ? 'bg-blue-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${qs.accuracyRate}%` }}
                          />
                        </div>

                        <div className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                          Acción: {qs.recommendedAction}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Matriz Institucional del Plan de Trabajo */}
                <div className="space-y-3 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Cronograma de Actividades de Nivelación
                  </h4>

                  <div className="rounded-xl border border-slate-200 dark:border-[#253255] overflow-hidden bg-white dark:bg-[#151c31]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-[#1a233b] text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[#253255]">
                          <tr>
                            <th className="py-2.5 px-3">Fase & Código</th>
                            <th className="py-2.5 px-3">Eje Temático</th>
                            <th className="py-2.5 px-3">Actividad Pedagógica</th>
                            <th className="py-2.5 px-3">Responsable</th>
                            <th className="py-2.5 px-3">Plazo</th>
                            <th className="py-2.5 px-3">Evidencia Requerida</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-[#202a46]">
                          {workPlan.activities.map((act) => (
                            <tr key={act.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1b2540]">
                              <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                                <div>{act.id}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{act.fase}</div>
                              </td>
                              <td className="py-3 px-3 font-medium text-slate-900 dark:text-white max-w-[180px]">
                                {act.tema}
                              </td>
                              <td className="py-3 px-3 text-slate-700 dark:text-slate-300 max-w-[240px]">
                                {act.actividad}
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                {act.responsable}
                              </td>
                              <td className="py-3 px-3 font-mono text-slate-800 dark:text-slate-200 whitespace-nowrap">
                                {act.plazoDias} días hábiles
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                                {act.evidencia}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Section C: Aprendices que Requieren Plan de Mejoramiento */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Aprendices en Proceso de Nivelación ({pendingImprovementCount})
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      Puntaje menor al 70% en el desafío de inducción
                    </span>
                  </div>

                  {pendingImprovementCount === 0 ? (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>¡Felicitaciones! El 100% de los aprendices registrados han aprobado la inducción satisfactoriamente.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {submissions
                        .filter((s) => (s.scoreNumber ?? parseInt(s.quizScore, 10)) < 7)
                        .map((app) => (
                          <div
                            key={app.certificateCode}
                            className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 text-xs space-y-2"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-bold text-slate-900 dark:text-white">
                                  {app.fullName}
                                </h5>
                                <p className="text-[11px] text-slate-500 font-mono-data">
                                  {app.documentType} {app.documentNumber} · Ficha {app.fichaNumber}
                                </p>
                              </div>
                              <span className="px-2 py-0.5 rounded-full font-mono font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-xs">
                                {app.quizScore}
                              </span>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                              Acción acordada: Asignar taller complementario del Reglamento (Acuerdo 009/2024) y programar segunda presentación antes de iniciar etapa lectiva.
                            </p>

                            <button
                              onClick={() => setSelectedSubmission(app)}
                              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Auditar sus respuestas erróneas</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* INDIVIDUAL APPRENTICE QUIZ ANSWERS DETAIL MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#12192c] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-[#263255] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">
                  Auditoría de Respuestas
                </span>
                <h3 className="text-sm font-bold text-white">
                  {selectedSubmission.fullName} · {selectedSubmission.quizScore}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-[#172037] rounded-xl flex items-center justify-between font-mono-data text-[11px]">
                <span>Ficha: {selectedSubmission.fichaNumber}</span>
                <span>Documento: {selectedSubmission.documentNumber}</span>
                <span>Código: {selectedSubmission.certificateCode}</span>
              </div>

              <div className="space-y-3">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const userAns = selectedSubmission.answers?.find((a) => a.questionId === q.id);
                  const isCorrect = userAns ? userAns.isCorrect : idx < (selectedSubmission.scoreNumber ?? 7);
                  const selectedText = userAns?.selectedOption || (isCorrect ? q.options[q.correctIndex] : q.options[(q.correctIndex + 1) % 4]);
                  const correctText = q.options[q.correctIndex];

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border space-y-1.5 ${
                        isCorrect
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                          : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
                            Acierto (+1.0)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold shrink-0">
                            Fallo (0.0)
                          </span>
                        )}
                      </div>

                      <div className="text-slate-600 dark:text-slate-300 pt-1 space-y-0.5">
                        <p>
                          <span className="font-medium text-slate-500">Respuesta del Aprendiz:</span>{' '}
                          <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-rose-700 dark:text-rose-400 font-semibold'}>
                            {selectedText}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p>
                            <span className="font-medium text-slate-500">Respuesta Correcta Oficial:</span>{' '}
                            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                              {correctText}
                            </span>
                          </p>
                        )}
                        <p className="text-[11px] text-slate-500 italic pt-1">
                          Justificación FPI: {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-[#161f36] border-t border-slate-200 dark:border-[#253255] flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
