import React from 'react';
import { ApprenticeSheetRecord } from '../types/induction';
import { ShieldCheck, FileSpreadsheet, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  record: ApprenticeSheetRecord | null;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DriveConfirmationModal({
  isOpen,
  record,
  isLoading,
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen || !record) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all duration-200 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-emerald-700 dark:bg-emerald-900/80 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-800/80 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 id="confirm-modal-title" className="text-base font-bold leading-tight">
                Confirmar Registro en Mi Drive
              </h2>
              <p className="text-xs text-emerald-200 mt-0.5">
                Hoja de cálculo: Registro de Aprendices - Inducción SENA
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-1 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
            aria-label="Cerrar modal de confirmación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-amber-900 dark:text-amber-300 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <p>
              Estás a punto de agregar un nuevo registro a tu hoja de cálculo en <strong>Google Drive (Mi Drive)</strong>. Por favor verifica que los datos sean correctos antes de confirmar.
            </p>
          </div>

          {/* Record Details Summary */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/60 space-y-2.5 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Aprendiz:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {record.fullName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">Documento:</span>
                <span className="font-mono-data font-semibold text-slate-800 dark:text-slate-200">
                  {record.documentType} {record.documentNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Ficha:</span>
                <span className="font-mono-data font-semibold text-slate-800 dark:text-slate-200">
                  {record.fichaNumber}
                </span>
              </div>
            </div>

            <div className="text-slate-600 dark:text-slate-300">
              <span className="text-slate-400 block text-[11px]">Programa:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                {record.programName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-slate-400 block text-[11px]">Regional / Centro:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 block truncate">
                  {record.regional}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Modalidad:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {record.modality}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 dark:text-slate-400">Puntaje Inducción:</span>
                <span className="font-mono-data font-bold text-emerald-700 dark:text-emerald-400">
                  {record.quizScore}
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  record.status === 'APROBADO'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}
              >
                {record.status}
              </span>
            </div>

            <div className="text-[10px] text-slate-400 font-mono-data pt-1">
              Código Verificación: {record.certificateCode}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Guardando en Google Drive...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar y Guardar en Drive</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
