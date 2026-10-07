import React, { useState } from 'react';
import { REGULATION_CASES, REGLAMENTO_ACUERDO_009_2024 } from '../../data/senaData';
import {
  Scale,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookCheck,
  HelpCircle,
  FileText,
  ExternalLink,
  Layers,
  Award,
  BookOpen,
  Calendar,
  ShieldCheck,
  Gavel,
  ChevronRight,
  Info
} from 'lucide-react';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNext: () => void;
  solvedCases: string[];
  onSolveCase: (caseId: string) => void;
}

export function ModuleReglamento({
  onComplete,
  isCompleted,
  onNext,
  solvedCases,
  onSolveCase,
}: Props) {
  const [activeTab, setActiveTab] = useState<'capitulos' | 'articulos_iniciales' | 'simulador'>('capitulos');
  const [selectedCapituloIndex, setSelectedCapituloIndex] = useState<number>(0);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentCase = REGULATION_CASES[selectedCaseIndex];
  const selectedOption = currentCase.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    const opt = currentCase.options.find((o) => o.id === optId);
    if (opt && opt.isCorrect) {
      onSolveCase(currentCase.id);
    }
  };

  const handleNextCase = () => {
    setSelectedOptionId(null);
    if (selectedCaseIndex + 1 < REGULATION_CASES.length) {
      setSelectedCaseIndex(selectedCaseIndex + 1);
    } else {
      setSelectedCaseIndex(0);
    }
  };

  const currentCap = REGLAMENTO_ACUERDO_009_2024.capitulos[selectedCapituloIndex];

  return (
    <div className="space-y-8">
      {/* Module Title Header with Official Acuerdo 009 de 2024 Metadata */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-1.5">
          <span className="text-emerald-700 dark:text-emerald-400">Módulo 03</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="text-emerald-700 dark:text-emerald-400">Reglamento del Aprendiz</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono-data font-bold border border-emerald-200 dark:border-emerald-800">
            {REGLAMENTO_ACUERDO_009_2024.documento.numero_acuerdo}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-normal normal-case">
            ({REGLAMENTO_ACUERDO_009_2024.documento.fecha})
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
          Nuevo Reglamento del Aprendiz SENA
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
          {REGLAMENTO_ACUERDO_009_2024.documento.objeto}. Publicado en el Diario Oficial {REGLAMENTO_ACUERDO_009_2024.documento.diario_oficial}, este nuevo marco normativo actualiza y armoniza las políticas institucionales tras 12 años de vigencia del reglamento previo.
        </p>

        {/* Source link badge */}
        <div className="mt-3 flex items-center gap-2">
          <a
            href={REGLAMENTO_ACUERDO_009_2024.documento.fuente_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
          >
            <span>Consultar compilación oficial en el Normograma SENA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-slate-400">·</span>
          <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
            Deroga expresamente los Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024
          </span>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('capitulos')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'capitulos'
              ? 'bg-[#00a8e8] text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Estructura por Capítulos (I al V)</span>
        </button>

        <button
          onClick={() => setActiveTab('articulos_iniciales')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'articulos_iniciales'
              ? 'bg-[#f59e0b] text-slate-950 shadow-xs font-bold'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Adopción, Ámbito & Considerandos</span>
        </button>

        <button
          onClick={() => setActiveTab('simulador')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'simulador'
              ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Simulador de Casos Reales ({solvedCases.length}/{REGULATION_CASES.length} resueltos)</span>
        </button>
      </div>

      {/* TAB 1: CAPÍTULOS DEL ACUERDO 009 DE 2024 */}
      {activeTab === 'capitulos' && (
        <section className="space-y-6">
          {/* Chapter navigation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {REGLAMENTO_ACUERDO_009_2024.capitulos.map((cap, idx) => {
              const isSelected = selectedCapituloIndex === idx;
              return (
                <button
                  key={cap.capitulo}
                  onClick={() => setSelectedCapituloIndex(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1a2138] border-[#00a8e8] text-white ring-2 ring-[#00a8e8]/30 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className={`text-[10px] font-mono-data font-bold block mb-1 ${isSelected ? 'text-[#00a8e8]' : 'text-slate-500 dark:text-slate-400'}`}>
                    {cap.capitulo}
                  </span>
                  <span className="text-xs font-bold leading-snug line-clamp-2">
                    {cap.nombre}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Chapter Showcase Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            {/* Colored top strip matching bento design */}
            <div className="bg-[#00a8e8] text-white px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono-data font-bold text-xs bg-white/20 px-2 py-0.5 rounded">
                  {currentCap.capitulo}
                </span>
                <h2 className="text-sm sm:text-base font-bold tracking-tight">
                  {currentCap.nombre}
                </h2>
              </div>
              <span className="text-xs opacity-90 hidden sm:inline">Acuerdo 009 de 2024</span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Summary */}
              <div className="p-4 rounded-lg bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-200 text-xs sm:text-sm leading-relaxed">
                <strong className="block font-bold text-sky-900 dark:text-sky-100 mb-1">
                  Propósito y Alcance del Capítulo:
                </strong>
                {currentCap.resumen}
              </div>

              {/* Articles breakdown */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#00a8e8]" />
                  <span>Articulado Oficial Correspondiente</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentCap.articulos.map((art, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 text-xs text-slate-800 dark:text-slate-200 font-medium flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{art}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Educational Context for each chapter */}
              {selectedCapituloIndex === 0 && (
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Conceptos Clave del Capítulo I:
                  </span>
                  <p>
                    Reconoce al <strong>Aprendiz SENA</strong> como el protagonista de su desarrollo integral. Se define el centro de convivencia como el espacio armónico donde convergen el respeto, la inclusión, la diversidad y la participación formativa democrática.
                  </p>
                </div>
              )}

              {selectedCapituloIndex === 1 && (
                <div className="p-4 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                    Derechos y Reconocimientos Formativos (Capítulo II):
                  </span>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Recibir inducción completa y acompañamiento pedagógico en ambientes adecuados.</li>
                    <li>Acceder a los programas y apoyos de Bienestar al Aprendiz.</li>
                    <li>Ser escuchado en descargos garantizando el debido proceso.</li>
                    <li>Elegir y ser elegido como vocero de ficha o representante general del Centro.</li>
                    <li>Recibir reconocimientos e incentivos por excelencia académica, deportiva o comunitaria.</li>
                  </ul>
                </div>
              )}

              {selectedCapituloIndex === 2 && (
                <div className="p-4 rounded-lg bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block">
                    Deberes y Prohibiciones Expresas (Capítulo III):
                  </span>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Portar permanentemente el carné institucional en lugar visible durante toda la permanencia.</li>
                    <li>Cumplir estrictamente con los protocolos de Seguridad y Salud en el Trabajo (SST) y el uso de EPP.</li>
                    <li>Respetar los derechos de autor (cero plagio o suplantación en evidencias).</li>
                    <li>Prohibición estricta de ingresar armas, sustancias psicoactivas o comercializar bienes no autorizados.</li>
                  </ul>
                </div>
              )}

              {selectedCapituloIndex === 3 && (
                <div className="p-4 rounded-lg bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <span className="font-bold text-teal-900 dark:text-teal-300 block">
                    Ingreso, Trámites y Novedades Académicas (Capítulo IV - Arts. 10 al 38):
                  </span>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Justificación de Inasistencias:</strong> Plazo perentorio de 3 días hábiles siguientes al hecho con soporte médico oficial o de fuerza mayor.</li>
                    <li><strong>Novedades de Formación:</strong> Traslado de centro o jornada, aplazamiento formal de matrícula, reingreso y retiro voluntario.</li>
                    <li><strong>Causales de Deserción:</strong> Inasistencia consecutiva injustificada durante 3 días o incumplimiento reiterado de evidencias.</li>
                  </ul>
                </div>
              )}

              {selectedCapituloIndex === 4 && (
                <div className="p-4 rounded-lg bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <span className="font-bold text-rose-900 dark:text-rose-300 block">
                    Régimen de Faltas y Debido Proceso (Capítulo V - Arts. 39 al 53):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-900">
                      <span className="font-bold block text-rose-700 dark:text-rose-300">Faltas Leves</span>
                      <p className="text-[11px] mt-0.5 text-slate-600 dark:text-slate-400">Incumplimientos subsanables que se atienden con llamado verbal o plan pedagógico.</p>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-900">
                      <span className="font-bold block text-rose-700 dark:text-rose-300">Faltas Graves</span>
                      <p className="text-[11px] mt-0.5 text-slate-600 dark:text-slate-400">Conductas que afectan el proceso formativo o la integridad comunitaria (llamado escrito).</p>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-900">
                      <span className="font-bold block text-rose-700 dark:text-rose-300">Faltas Gravísimas</span>
                      <p className="text-[11px] mt-0.5 text-slate-600 dark:text-slate-400">Violaciones directas a la ley, plagio severo, violencia o fraude (cancelación de matrícula).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: ARTÍCULOS INICIALES Y CONSIDERANDOS */}
      {activeTab === 'articulos_iniciales' && (
        <section className="space-y-6">
          {/* 4 Initial Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(REGLAMENTO_ACUERDO_009_2024.articulos_iniciales).map(([key, art]) => (
              <div
                key={key}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono-data font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 uppercase block w-fit mb-2">
                    {key.replace('_', ' ')}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1.5">
                    {art.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {art.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Considerandos Constitucionales y Legales */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Gavel className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Considerandos Constitucionales y Motivación del Acuerdo 009 de 2024
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fundamento legal y necesidad de armonización tras 12 años del reglamento anterior
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {REGLAMENTO_ACUERDO_009_2024.considerandos.map((cons, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono-data font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {cIdx + 1}
                  </span>
                  <p className="leading-relaxed">{cons}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: SIMULADOR DE CASOS REALES (ACUERDO 009 DE 2024) */}
      {activeTab === 'simulador' && (
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-data font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Caso {selectedCaseIndex + 1} de {REGULATION_CASES.length}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{currentCase.title}</h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                Fundamentado en el {REGLAMENTO_ACUERDO_009_2024.documento.numero_acuerdo}
              </span>
            </div>

            {/* Case switcher tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {REGULATION_CASES.map((c, idx) => {
                const isSolved = solvedCases.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseIndex(idx);
                      setSelectedOptionId(null);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono-data font-medium rounded transition-colors cursor-pointer ${
                      selectedCaseIndex === idx
                        ? 'bg-slate-900 dark:bg-[#00a8e8] text-white'
                        : isSolved
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Caso {idx + 1} {isSolved ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context box */}
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Situación del Contexto Formativo
            </span>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {currentCase.context}
            </p>
          </div>

          {/* Question & Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span>{currentCase.question}</span>
            </h3>

            <div className="space-y-2">
              {currentCase.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800';
                if (isSelected) {
                  optClass = option.isCorrect
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500'
                    : 'border-red-400 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-200 ring-1 ring-red-400';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all cursor-pointer ${optClass}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-mono-data font-semibold opacity-70">
                        {option.id.toUpperCase()}:
                      </span>
                      <span className="leading-relaxed">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Normative Foundation Box */}
          {selectedOption && (
            <div
              className={`p-4 rounded-lg border text-xs leading-relaxed animate-in fade-in duration-200 ${
                selectedOption.isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {selectedOption.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>¡Decisión Correcta según el Acuerdo 009 de 2024!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span>Procedimiento Incorrecto</span>
                  </>
                )}
              </div>
              <p>{selectedOption.feedback}</p>

              <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 space-y-1">
                <p>
                  <strong>Fundamento Normativo:</strong> {currentCase.normativeArticle}
                </p>
                <p>
                  <strong>Reflexión Formativa:</strong> {currentCase.reflection}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNextCase}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-[#00a8e8] dark:hover:bg-sky-500 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Siguiente Caso
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 text-white rounded-xl gap-4">
        <div>
          <h3 className="text-base font-bold">¡Has analizado el Acuerdo 009 de 2024!</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Casos resueltos: {solvedCases.length} de {REGULATION_CASES.length}. Pasa ahora a Bienestar al Aprendiz.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onComplete}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              isCompleted
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Siguiente: Bienestar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
