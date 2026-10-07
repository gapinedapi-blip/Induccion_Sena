import React, { useState } from 'react';
import { SENA_IMAGES } from '../../assets/images';
import { BookOpen, Layers, CheckCircle2, ArrowRight, Briefcase, GraduationCap, Clock, Award } from 'lucide-react';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNext: () => void;
}

export function ModulePedagogico({ onComplete, isCompleted, onNext }: Props) {
  const [selectedAlternativa, setSelectedAlternativa] = useState<string>('contrato');
  const [activeFase, setActiveFase] = useState<number>(0);

  const fasesProyecto = [
    {
      nombre: 'Fase 1: Análisis',
      desc: 'Diagnóstico de necesidades productivas o comunitarias, recolección de requisitos e identificación del problema a resolver con el proyecto.',
      entregables: 'Árbol de problemas, matriz de requerimientos y estudio de factibilidad técnica.',
    },
    {
      nombre: 'Fase 2: Planeación',
      desc: 'Diseño de la solución técnica, cronograma de actividades, asignación de roles y selección de herramientas e insumos.',
      entregables: 'Diagramas arquitectónicos, presupuestos y plan de trabajo detallado.',
    },
    {
      nombre: 'Fase 3: Ejecución',
      desc: 'Construcción, desarrollo o manufactura de la solución mediante trabajo colaborativo en ambientes de aprendizaje y laboratorios.',
      entregables: 'Prototipos funcionales, código fuente, piezas manufacturadas o servicios testeados.',
    },
    {
      nombre: 'Fase 4: Evaluación',
      desc: 'Validación de los resultados frente a los objetivos iniciales, pruebas de calidad y sustentación ante instructores y evaluadores.',
      entregables: 'Informe final de resultados, plan de mejoras y sustentación pública.',
    },
  ];

  const alternativasProductivas = [
    {
      id: 'contrato',
      title: 'Contrato de Aprendizaje (Ley 789/2002)',
      tag: 'La más elegida',
      duracion: 'Hasta 6 meses (o según programa)',
      remuneracion: 'Apoyo del 75% al 100% SMMLV + Afiliación a EPS y ARL',
      requisitos: 'Estar al día académicamente, registrar la hoja de vida en el aplicativo Caprendizaje (SGVA), no haber tenido contrato de aprendizaje previo del mismo nivel.',
      ventaja: 'Inmersión directa en el sector empresarial con alta tasa de vinculación laboral definitiva al culminar.',
    },
    {
      id: 'vinculo',
      title: 'Vínculo Laboral o Contractual',
      tag: 'Si ya estás trabajando',
      duracion: 'Durante el periodo de la etapa productiva',
      remuneracion: 'Salario estipulado en tu contrato laboral formal',
      requisitos: 'Las funciones desempeñadas en tu empleo actual deben guardar estricta relación directa con el perfil y competencias de tu programa de formación.',
      ventaja: 'Continúas en tu puesto laboral mientras certificas tus horas de práctica profesional en el SENA.',
    },
    {
      id: 'proyecto',
      title: 'Proyecto Productivo (Emprendimiento)',
      tag: 'Para visionarios y emprendedores',
      duracion: 'Equivalente al periodo de práctica',
      remuneracion: 'Ingresos generados por tu propia unidad de negocio',
      requisitos: 'Formulación y puesta en marcha de un plan de negocio real con el acompañamiento de instructores de Fondo Emprender o Emprendimiento SENA.',
      ventaja: 'Te gradúas como dueño de tu propia empresa constituida y con posibilidad de capital semilla del Fondo Emprender.',
    },
    {
      id: 'pasantia',
      title: 'Pasantía Empresarial o Institucional',
      tag: 'Sector público o social',
      duracion: 'Periodo reglamentario de práctica',
      remuneracion: 'Concertada con la empresa o institución (puede o no tener auxilio)',
      requisitos: 'Convenio formal entre el SENA y la empresa u ONG solicitante. Debe contar con póliza de seguro estudiantil y ARL gestionada según normatividad.',
      ventaja: 'Excelente para proyectos de impacto social, ambiental o entidades gubernamentales.',
    },
    {
      id: 'monitoria',
      title: 'Monitoría en el SENA',
      tag: 'En tu Centro de Formación',
      duracion: 'Semestral / renovable',
      remuneracion: 'Apoyo económico de sostenimiento institucional',
      requisitos: 'Destacarse por excelencia académica, actitudinal y técnica en el Centro de Formación, postulándose a la convocatoria de monitorías.',
      ventaja: 'Acompañas a instructores en ambientes especializados, laboratorios y proyectos de investigación SENNOVA.',
    },
  ];

  const currentAlt = alternativasProductivas.find((a) => a.id === selectedAlternativa)!;

  return (
    <div className="space-y-12">
      {/* Module Title Header with Clean Unboxed Metadata */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
          <span>Módulo 02</span>
          <span aria-hidden="true">·</span>
          <span>Modelo Pedagógico</span>
          <span aria-hidden="true">·</span>
          <span>FPI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
          Formación Profesional Integral: Cómo Aprendes en el SENA
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          En el SENA no solo adquieres conocimientos técnicos teóricos: formamos personas éticas, autónomas y capaces de resolver problemas reales mediante el desarrollo armónico de competencias laborales.
        </p>
      </div>

      {/* Visual Showcase Card with Generated Workshop Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="lg:col-span-5 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 relative aspect-4/3">
          <img
            src={SENA_IMAGES.labWorkshop}
            alt="Aprendices en taller práctico de mecatrónica y software"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-4">
            <span className="text-xs text-white font-medium">Ambientes de Aprendizaje Dotados con Tecnología Real</span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
            <Layers className="w-4 h-4" />
            <span>Las Tres Dimensiones de la Competencia Laboral</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Formamos para la Vida y el Trabajo: Saber, Hacer y Ser
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Una persona competente en el SENA no es quien memoriza libros, sino quien articula estos tres pilares indisolubles:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase block mb-1">1. Saber</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Apropiación de conceptos, ciencias básicas, fundamentos tecnológicos y normatividad vigente.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block mb-1">2. Saber Hacer</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Destreza práctica, aplicación en talleres, laboratorios, desarrollo de evidencias y software.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase block mb-1">3. Saber Ser</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Ética, liderazgo, trabajo en equipo, asertividad y responsabilidad con el entorno ambiental.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formación por Proyectos: Fases Interactivas */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Estrategia Metodológica: Formación por Proyectos</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cada programa estructura su aprendizaje a través de un proyecto formativo real que avanza por 4 fases consecutivas
          </p>
        </div>

        {/* Phase selector tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {fasesProyecto.map((fase, idx) => (
            <button
              key={fase.nombre}
              onClick={() => setActiveFase(idx)}
              className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                activeFase === idx
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-xs font-mono-data opacity-90 block">0{idx + 1}</span>
              <span className="text-xs font-semibold block truncate mt-0.5">{fase.nombre}</span>
            </button>
          ))}
        </div>

        {/* Phase Content */}
        <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{fasesProyecto[activeFase].nombre}</h3>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold font-mono-data">
              Fase Activa {activeFase + 1} de 4
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            {fasesProyecto[activeFase].desc}
          </p>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-md border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-1">Entregables y Evidencias Típicas:</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono-data">
              {fasesProyecto[activeFase].entregables}
            </p>
          </div>
        </div>
      </section>

      {/* Las Dos Etapas de la Formación: Lectiva vs Productiva */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Etapa Lectiva</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Apropiación en ambientes de formación</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
              <span>Desarrollo de Guías de Aprendizaje estructuradas por el equipo de instructores.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
              <span>Carga de evidencias en la plataforma Zajuna (Conocimiento, Desempeño y Producto).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
              <span>Evaluación de Resultados de Aprendizaje (RAP): Juicio "A" (Aprobado) o "D" (Deficiente/No Aprobado).</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Etapa Productiva</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Aplicación en el sector productivo real</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
              <span>Complementa y consolida las competencias adquiridas en la etapa lectiva.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
              <span>Seguimiento periódico por un instructor asignado con visitas y bitácoras quincenales.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
              <span>Es requisito indispensable y no prorrogable para la graduación y certificación formal.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Simulador Interactivo de Alternativas de Etapa Productiva */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Simulador de Alternativas para tu Etapa Productiva
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explora las diferentes vías legales para realizar tu práctica y planifica con tiempo tu graduación
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {alternativasProductivas.map((alt) => (
            <button
              key={alt.id}
              onClick={() => setSelectedAlternativa(alt.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedAlternativa === alt.id
                  ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {alt.title.split(' ')[0]} {alt.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-2 mb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono-data">
                {currentAlt.tag}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{currentAlt.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{currentAlt.duracion}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Apoyo Económico y Prestaciones:</span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{currentAlt.remuneracion}</p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Requisitos Previos:</span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{currentAlt.requisitos}</p>
            </div>

            <div className="md:col-span-2 p-3.5 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-emerald-900 dark:text-emerald-300 block mb-1">Mayor Ventaja Estratégica:</span>
              <p className="leading-relaxed">{currentAlt.ventaja}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 text-white rounded-xl gap-4">
        <div>
          <h3 className="text-base font-bold">¡Has completado el Modelo Pedagógico y FPI!</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Ahora conocerás el Reglamento del Aprendiz y pondrás a prueba tus decisiones con casos reales.
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
            <span>Siguiente: Reglamento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
