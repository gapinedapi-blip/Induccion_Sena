import React, { useState } from 'react';
import { BIENESTAR_DIMENSIONES } from '../../data/senaData';
import { SENA_IMAGES } from '../../assets/images';
import { HeartHandshake, CheckCircle2, ArrowRight, Sparkles, HelpCircle, UserCheck } from 'lucide-react';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNext: () => void;
}

export function ModuleBienestar({ onComplete, isCompleted, onNext }: Props) {
  const [selectedDimension, setSelectedDimension] = useState<string>('sostenimiento');
  const [checkQuestions, setCheckQuestions] = useState<{
    sisbenAtoC: boolean;
    noIncome: boolean;
    goodGrades: boolean;
    constructionArea: boolean;
  }>({
    sisbenAtoC: true,
    noIncome: true,
    goodGrades: true,
    constructionArea: false,
  });

  return (
    <div className="space-y-12">
      {/* Module Title Header with Clean Unboxed Metadata */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
          <span>Módulo 04</span>
          <span aria-hidden="true">·</span>
          <span>Bienestar al Aprendiz</span>
          <span aria-hidden="true">·</span>
          <span>Permanencia y Calidad de Vida</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
          Bienestar al Aprendiz: Tu Red de Apoyo Integral
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          El SENA no solo se preocupa por tu formación técnica; te acompaña con programas de salud, deporte, cultura, liderazgo y auxilios socioeconómicos para garantizar que culmines con éxito tu proyecto formativo.
        </p>
      </div>

      {/* Visual Showcase Card with Generated Agro-Innovation Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="lg:col-span-5 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 relative aspect-4/3">
          <img
            src={SENA_IMAGES.agroCenter}
            alt="Aprendices en ambiente de formación y convivencia"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-4">
            <span className="text-xs text-white font-medium">Convivencia, Inclusión y Desarrollo Humano en Todo el País</span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
            <HeartHandshake className="w-4 h-4" />
            <span>Plan Nacional de Bienestar al Aprendiz</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Un Entorno Seguro, Saludable e Incluyente
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Bienestar al Aprendiz desarrolla acciones orientadas al fortalecimiento de habilidades socioemocionales, la promoción de la salud mental y física, y el acompañamiento para mitigar factores que puedan generar deserción.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Atención Gratuita</span>
              <p className="text-slate-600 dark:text-slate-400">Acceso sin costo a psicólogos, talleres y actividades de formación complementaria.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Inclusión y Diversidad</span>
              <p className="text-slate-600 dark:text-slate-400">Espacios con enfoque diferencial para comunidades indígenas, afro, víctimas y personas con discapacidad.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Las Dimensiones de Bienestar Interactivas */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dimensiones de Bienestar</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Selecciona una dimensión para conocer sus beneficios concretos</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {BIENESTAR_DIMENSIONES.map((dim) => (
            <button
              key={dim.id}
              onClick={() => setSelectedDimension(dim.id)}
              className={`p-3 text-center rounded-lg border transition-all text-xs font-semibold cursor-pointer ${
                selectedDimension === dim.id
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {dim.title}
            </button>
          ))}
        </div>

        {(() => {
          const dim = BIENESTAR_DIMENSIONES.find((d) => d.id === selectedDimension)!;
          return (
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{dim.title}</h3>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{dim.action}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{dim.description}</p>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-md border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">¿Cómo participo?</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Acércate a la oficina de Bienestar de tu Centro de Formación o consulta los correos y carteleras de avisos institucionales para las convocatorias de la vigencia.
                </p>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Explorador de Apoyos de Sostenimiento */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Verificador de Convocatorias y Apoyos Socioeconómicos
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Conoce los criterios orientadores para postularte a los auxilios del SENA
            </p>
          </div>
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block uppercase tracking-wider">
              Tu Perfil de Condiciones:
            </span>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 cursor-pointer">
              <input
                type="checkbox"
                checked={checkQuestions.sisbenAtoC}
                onChange={(e) => setCheckQuestions({ ...checkQuestions, sisbenAtoC: e.target.checked })}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">
                Perteneces a estratos 1 o 2 o estás clasificado en grupos A, B o C del SISBÉN IV.
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 cursor-pointer">
              <input
                type="checkbox"
                checked={checkQuestions.noIncome}
                onChange={(e) => setCheckQuestions({ ...checkQuestions, noIncome: e.target.checked })}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">
                No tienes contrato de aprendizaje firmado actualmente ni contrato laboral formal.
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 cursor-pointer">
              <input
                type="checkbox"
                checked={checkQuestions.goodGrades}
                onChange={(e) => setCheckQuestions({ ...checkQuestions, goodGrades: e.target.checked })}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">
                Mantienes buen rendimiento académico y no tienes sanciones disciplinarias.
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 cursor-pointer">
              <input
                type="checkbox"
                checked={checkQuestions.constructionArea}
                onChange={(e) => setCheckQuestions({ ...checkQuestions, constructionArea: e.target.checked })}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">
                Tu programa de formación pertenece a la industria de la construcción o infraestructura.
              </span>
            </label>
          </div>

          <div className="p-5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex flex-col justify-between">
            <div>
              <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm mb-2">
                Programas a los que puedes aplicar:
              </span>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                {checkQuestions.sisbenAtoC && checkQuestions.noIncome && checkQuestions.goodGrades && (
                  <li className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Apoyo Regular de Sostenimiento (Convocatoria semestral)</span>
                  </li>
                )}
                {checkQuestions.constructionArea && (
                  <li className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Apoyo de Sostenimiento FIC (Fondo de la Industria de la Construcción)</span>
                  </li>
                )}
                {checkQuestions.goodGrades && (
                  <li className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Convocatoria a Monitorías de Ambientes y Tecnologías</span>
                  </li>
                )}
                <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span>Apoyo de Alimentación y Transporte según disponibilidad de tu Centro</span>
                </li>
              </ul>
            </div>

            <p className="text-slate-500 dark:text-slate-400 mt-4 text-[11px] pt-2 border-t border-emerald-200 dark:border-emerald-800/60">
              *Las convocatorias se abren periódicamente por resolución oficial y son publicadas en cartelera y Sofia Plus.
            </p>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 text-white rounded-xl gap-4">
        <div>
          <h3 className="text-base font-bold">¡Has descubierto el Bienestar al Aprendiz!</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Continúa con el Ecosistema Digital y Herramientas Tecnológicas del SENA.
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
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
          >
            <span>Siguiente: Ecosistema Digital</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
