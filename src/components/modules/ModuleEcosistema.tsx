import React, { useState } from 'react';
import { Laptop, Database, Globe, Lightbulb, ExternalLink, CheckCircle2, ArrowRight, BookOpen, Rocket } from 'lucide-react';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNext: () => void;
}

export function ModuleEcosistema({ onComplete, isCompleted, onNext }: Props) {
  const [selectedTool, setSelectedTool] = useState<string>('zajuna');

  const tools = [
    {
      id: 'zajuna',
      name: 'Zajuna (LMS)',
      category: 'Ambiente Virtual de Aprendizaje',
      desc: 'Es el campus virtual oficial del SENA. En él interactúas con instructores, descargas guías de aprendizaje, participas en foros calificados, presentas cuestionarios y cargas tus evidencias de producto.',
      queHacer: 'Revisa diariamente el cronograma de actividades, las carpetas de Fase del Proyecto y el centro de calificaciones.',
      enlace: 'zajuna.sena.edu.co',
      tipoAcceso: 'Mismo usuario y contraseña de Sofia Plus',
    },
    {
      id: 'sofiaplus',
      name: 'SENA Sofia Plus',
      category: 'Gestión Administrativa y Académica',
      desc: 'El Sistema Optimizado para la Formación Integral y el Aprendizaje Activo administra tu hoja de vida académica, inscripción a programas, consulta formal de juicios evaluativos (Aprobado/Deficiente) y certificados con validez legal.',
      queHacer: 'Descarga tu constancia de matrícula para trámites de EPS, subsidios o contrato de aprendizaje.',
      enlace: 'senasofiaplus.edu.co',
      tipoAcceso: 'Documento de identidad y clave personal',
    },
    {
      id: 'ape',
      name: 'Agencia Pública de Empleo (APE)',
      category: 'Intermediación Laboral y Prácticas',
      desc: 'El servicio público gratuito de empleo del SENA conecta a millones de aprendices y colombianos con miles de vacantes laborales formales en empresas nacionales e internacionales.',
      queHacer: 'Registra y actualiza tu currículum vitae al 100% para recibir ofertas acordes a tu perfil ocupacional.',
      enlace: 'ape.sena.edu.co',
      tipoAcceso: 'Registro único nacional gratuito',
    },
    {
      id: 'bibliotecas',
      name: 'Sistema de Bibliotecas SBS',
      category: 'Investigación y Consulta Científica',
      desc: 'Red nacional con acceso libre a bases de datos científicas de primer nivel mundial (Scopus, ScienceDirect, IEEE, eLibro), revistas indexadas, normas técnicas ICONTEC y repositorios de proyectos SENA.',
      queHacer: 'Consulta fuentes indexadas para citar con normas APA en tus proyectos formativos y evidencias técnicas.',
      enlace: 'biblioteca.sena.edu.co',
      tipoAcceso: 'Acceso institucional para aprendices matriculados',
    },
    {
      id: 'sennova',
      name: 'SENNOVA',
      category: 'Investigación y Desarrollo Tecnológico',
      desc: 'El ecosistema de ciencia, innovación y tecnología del SENA. Agrupa semilleros de investigación aplicada, TecnoParques y TecnoAcademias donde los aprendices prototipan patentes y soluciones avanzadas.',
      queHacer: 'Únete al semillero de investigación de tu Centro de Formación para fortalecer tu perfil profesional.',
      enlace: 'sennova.sena.edu.co',
      tipoAcceso: 'Postulación a semilleros en tu centro',
    },
    {
      id: 'fondoemprender',
      name: 'Fondo Emprender',
      category: 'Capital Semilla y Emprendimiento',
      desc: 'El fondo estatal administrado por el SENA que otorga recursos no reembolsables de capital semilla a iniciativas empresariales formuladas por aprendices y egresados.',
      queHacer: 'Si tienes una idea innovadora, asiste a las unidades de emprendimiento de tu Centro para estructurar tu plan de negocio.',
      enlace: 'fondoemprender.com',
      tipoAcceso: 'Convocatorias públicas anuales',
    },
  ];

  const currentTool = tools.find((t) => t.id === selectedTool)!;

  return (
    <div className="space-y-12">
      {/* Module Title Header with Clean Unboxed Metadata */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
          <span>Módulo 05</span>
          <span aria-hidden="true">·</span>
          <span>Ecosistema Digital</span>
          <span aria-hidden="true">·</span>
          <span>Plataformas Institucionales</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
          Ecosistema Digital y Servicios Tecnológicos
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Domina los canales informáticos oficiales del SENA. Desde Zajuna para tu día a día académico hasta la Agencia de Empleo y el Sistema de Bibliotecas para tu proyección profesional.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`p-3.5 text-left rounded-xl border transition-all text-xs cursor-pointer ${
              selectedTool === tool.id
                ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white border-slate-900 dark:border-blue-500 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="block font-bold truncate text-sm mb-0.5">{tool.name}</span>
            <span className="text-[11px] opacity-80 block truncate">{tool.category}</span>
          </button>
        ))}
      </div>

      {/* Detail Showcase Panel */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              {currentTool.category}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{currentTool.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-data text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700">
              {currentTool.enlace}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {currentTool.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <div className="p-4 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                ¿Qué debes hacer como aprendiz?
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentTool.queHacer}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                Mecanismo de Autenticación / Acceso
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentTool.tipoAcceso}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Good Digital Practices Box */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Laptop className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Decálogo de la Ciudadanía Digital en el SENA</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">1. Correo Institucional @sena.edu.co</span>
            <p>Es tu canal formal de comunicación con instructores y coordinación. Revísalo al menos una vez al día.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">2. Netiqueta y Respeto en Foros</span>
            <p>Dirígete con lenguaje cordial, profesional y constructivo a compañeros e instructores en los foros de Zajuna.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">3. Seguridad de Contraseñas</span>
            <p>Nunca compartas tus credenciales de Sofia Plus o Zajuna. Tu usuario es personal e intransferible.</p>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 text-white rounded-xl gap-4">
        <div>
          <h3 className="text-base font-bold">¡Has conocido el Ecosistema Digital!</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Explora el Glosario de términos clave o pasa directamente al Desafío de Inducción.
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
            <span>Siguiente: Glosario</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
