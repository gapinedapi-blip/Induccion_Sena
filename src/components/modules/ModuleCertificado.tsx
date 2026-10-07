import React, { useState } from 'react';
import { ApprenticeProfile } from '../../types/induction';
import { SenaEscudo, SenaLogo } from '../SenaSymbols';
import { Printer, Edit3, CheckCircle2, ShieldCheck, QrCode, Share2, Award } from 'lucide-react';

interface Props {
  profile: ApprenticeProfile;
  certificateCode: string;
  quizScore: number;
  onOpenEditProfile: () => void;
}

export function ModuleCertificado({
  profile,
  certificateCode,
  quizScore,
  onOpenEditProfile,
}: Props) {
  const [hasSigned, setHasSigned] = useState(true);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyValidation = () => {
    const text = `Constancia Oficial de Inducción SENA\nAprendiz: ${profile.fullName}\nDocumento: ${profile.documentType} ${profile.documentNumber}\nFicha: ${profile.fichaNumber}\nPrograma: ${profile.programName}\nCódigo de Verificación: ${certificateCode}`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Module Title Header with Clean Unboxed Metadata */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 no-print">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
          <span>Módulo 08</span>
          <span aria-hidden="true">·</span>
          <span>Acreditación</span>
          <span aria-hidden="true">·</span>
          <span>Acta y Certificado Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
          Acta y Constancia de Inducción Institucional
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Este documento certifica tu culminación exitosa de la etapa de inducción en el SENA. Puedes verificar tus datos, registrar tu firma simbólica y exportar el acta para tu portafolio de evidencias.
        </p>

        {/* Action Utility Bar */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Descargar PDF</span>
          </button>

          <button
            onClick={onOpenEditProfile}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Editar Datos de mi Ficha</span>
          </button>

          <button
            onClick={handleCopyValidation}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>{copiedNotification ? '¡Copiado al Portapapeles!' : 'Copiar Registro de Validación'}</span>
          </button>
        </div>
      </div>

    {/* Official Certificate Paper Container */}
    <div className="print-page bg-white dark:bg-slate-900 p-6 sm:p-12 rounded-2xl border-2 border-emerald-800 dark:border-emerald-600 shadow-lg max-w-4xl mx-auto relative overflow-hidden transition-colors">
      {/* Subtle Watermark/Emblem in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.06] pointer-events-none">
        <SenaEscudo className="w-96 h-96" />
      </div>

      {/* Certificate Frame Inner Border */}
      <div className="border border-emerald-600/40 dark:border-emerald-500/40 p-6 sm:p-10 rounded-xl relative space-y-8">
        {/* Header Lockup */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-emerald-900/20 dark:border-emerald-500/30 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <SenaEscudo className="w-16 h-20 shrink-0" />
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-800 dark:text-emerald-400 block">
                República de Colombia
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                SERVICIO NACIONAL DE APRENDIZAJE - SENA
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Dirección de Formación Profesional · Sistema de Gestión de Calidad
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end">
            <SenaLogo className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-1" />
            <span className="text-[10px] font-mono-data text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Código Único de Registro:
            </span>
            <span className="text-xs font-mono-data font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
              {certificateCode}
            </span>
          </div>
        </div>

        {/* Certificate Main Body */}
        <div className="text-center space-y-4 max-w-2xl mx-auto py-2">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800 dark:text-emerald-400 block">
            Acta y Constancia Oficial de Inducción Institucional
          </span>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            El Centro de Formación hace constar que el (la) aprendiz:
          </p>

          <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white tracking-tight py-1 border-b border-slate-200 dark:border-slate-800">
            {profile.fullName || 'Aprendiz SENA'}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono-data text-slate-700 dark:text-slate-300">
            <span><strong>Doc:</strong> {profile.documentType} {profile.documentNumber}</span>
            <span aria-hidden="true">·</span>
            <span><strong>Ficha:</strong> {profile.fichaNumber}</span>
            <span aria-hidden="true">·</span>
            <span><strong>Modalidad:</strong> {profile.modality}</span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
            Ha culminado satisfactoriamente la ruta de <strong>Inducción Institucional</strong> para el programa:
          </p>

          <p className="text-base font-bold text-emerald-950 dark:text-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
            {profile.programName}
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            En el <strong>{profile.trainingCenter}</strong> · <strong>{profile.regional}</strong>
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-justify pt-3">
            Demostrando apropiación de la identidad institucional, los símbolos patrios del SENA, el modelo pedagógico de Formación Profesional Integral (FPI), el nuevo reglamento del aprendiz (Acuerdo 009 de 2024) y el ecosistema de servicios de bienestar y plataformas tecnológicas.
          </p>
        </div>

        {/* Signatures & Seal Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-emerald-900/20 dark:border-emerald-500/30 text-center items-end">
          {/* Signature 1: Instructor / Coordinator */}
          <div className="space-y-1">
            <div className="h-12 flex items-center justify-center">
              <span className="font-editorial text-sm italic text-slate-800 dark:text-slate-200">
                Equipo de Inducción SENA
              </span>
            </div>
            <div className="w-40 mx-auto border-t border-slate-400 dark:border-slate-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Coordinación Académica</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Centro de Formación</p>
          </div>

          {/* Official Validation Stamp */}
          <div className="flex flex-col items-center justify-center space-y-1 py-1">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-700 dark:border-emerald-400 flex flex-col items-center justify-center text-emerald-800 dark:text-emerald-300 p-1">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[8px] font-bold uppercase tracking-tighter">Aprobado</span>
              <span className="text-[7px] font-mono-data">{quizScore >= 11 ? `${quizScore}/25` : `${quizScore}/10`} Pts</span>
            </div>
            <span className="text-[10px] font-mono-data text-slate-500 dark:text-slate-400">
              Juicio: COMPETENTE (A)
            </span>
          </div>

          {/* Signature 2: The Apprentice */}
          <div className="space-y-1">
            <div className="h-12 flex items-center justify-center">
              {hasSigned ? (
                <span className="font-editorial text-sm italic text-emerald-800 dark:text-emerald-300 font-semibold">
                  {profile.fullName}
                </span>
              ) : (
                <button
                  onClick={() => setHasSigned(true)}
                  className="text-xs text-emerald-700 dark:text-emerald-400 underline font-medium cursor-pointer"
                >
                  Firmar digitalmente
                </button>
              )}
            </div>
            <div className="w-40 mx-auto border-t border-slate-400 dark:border-slate-600" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Firma del Aprendiz</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Compromiso Institucional</p>
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800 gap-2">
          <span>Fecha de emisión: {profile.inductionCompletedDate || 'Octubre de 2026'}</span>
          <span>Documento oficial para anexar al Portafolio del Aprendiz en Zajuna</span>
        </div>
      </div>
    </div>

    {/* Apprentice Institutional Confirmation Note */}
    <div className="no-print max-w-4xl mx-auto bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 flex items-center gap-4">
      <div className="p-2.5 bg-emerald-600 dark:bg-emerald-500 text-white rounded-xl shadow-xs shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Registro de Inducción Confirmado en el Sistema
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
          Tu constancia ha quedado registrada bajo el código oficial <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{certificateCode}</span>. Recuerda descargar o imprimir el documento para adjuntarlo a tu carpeta de evidencias en Zajuna.
        </p>
      </div>
    </div>
    </div>
  );
}
