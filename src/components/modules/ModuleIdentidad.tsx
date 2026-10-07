import React, { useState } from 'react';
import { SENA_IMAGES } from '../../assets/images';
import { SenaEscudo, SenaLogo, SenaBandera } from '../SenaSymbols';
import { HimnoPlayer } from '../HimnoPlayer';
import { History, Compass, ShieldCheck, Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNext: () => void;
}

export function ModuleIdentidad({ onComplete, isCompleted, onNext }: Props) {
  const [selectedSymbol, setSelectedSymbol] = useState<'escudo' | 'logo' | 'bandera'>('escudo');
  const [escudoQuadrant, setEscudoQuadrant] = useState<'secundario' | 'terciario' | 'primario'>('secundario');

  const historyMilestones = [
    {
      year: '1957',
      title: 'Nacimiento del SENA',
      desc: 'Creado mediante el Decreto Ley 118 del 21 de junio de 1957 por iniciativa del doctor Rodolfo Martínez Tono con el respaldo tripartito del Gobierno, trabajadores y empresarios (ANDI).',
    },
    {
      year: '1960-1970',
      title: 'Expansión a todo el territorio nacional',
      desc: 'Construcción de los primeros centros fijos y creación de las unidades móviles para llevar formación técnica a los municipios más apartados de la geografía colombiana.',
    },
    {
      year: '2002',
      title: 'Ley 789 y Contrato de Aprendizaje',
      desc: 'Se institucionaliza el Contrato de Aprendizaje formal con patrocinio empresarial obligatorio y nace el Fondo Emprender para apoyar unidades productivas creadas por aprendices.',
    },
    {
      year: 'Actualidad',
      title: 'Innovación, SENNOVA y Plataforma Zajuna',
      desc: 'Formación en habilidades digitales, inteligencia artificial, robótica, bioeconomía y el despliegue del moderno entorno virtual de aprendizaje Zajuna.',
    },
  ];

  const valores = [
    { name: 'Respeto', desc: 'Reconocer, valorar y tratar con dignidad a toda la comunidad educativa.' },
    { name: 'Honradez', desc: 'Actuar con coherencia ética, veracidad y transparencia en cada acción formativa.' },
    { name: 'Compromiso', desc: 'Cumplir a cabalidad los deberes con la patria, el centro formativo y el proyecto de vida propio.' },
    { name: 'Solidaridad', desc: 'Cooperar con generosidad con compañeros de equipo y comunidades vulnerables.' },
    { name: 'Diligencia', desc: 'Realizar las actividades asignadas con excelencia, puntualidad y esmero técnico.' },
    { name: 'Justicia', desc: 'Garantizar el trato equitativo e imparcial fundamentado en el debido proceso.' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner with Authentic Generated Image and Measured Contrast Scrim */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="h-72 sm:h-80 md:h-96 w-full relative">
          <img
            src={SENA_IMAGES.heroCampus}
            alt="Campus institucional del SENA en Colombia"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-widest mb-2">
            <span>Módulo 01</span>
            <span aria-hidden="true">·</span>
            <span>Identidad Institucional</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-bold text-white max-w-2xl leading-tight">
            El Orgullo de Ser Aprendiz SENA
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl font-normal leading-relaxed">
            El Servicio Nacional de Aprendizaje es el patrimonio más querido de los colombianos. Desde 1957, transformamos vidas a través de la formación profesional integral gratuita y con pertinencia.
          </p>
        </div>
      </div>

      {/* Misión y Visión Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Misión Institucional</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Decreto 118 de 1957 y Ley 119 de 1994</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            El SENA está encargado de cumplir la función del Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la <strong className="text-slate-900 dark:text-white">Formación Profesional Integral (FPI)</strong> para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Visión de Futuro</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Transformación y Pertinencia</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Consolidarse como una entidad de clase mundial en educación técnica y tecnológica, co-creación e innovación, reconocida por la efectividad de sus egresados, la pertinencia de sus programas curriculares y su liderazgo en el cierre de brechas de productividad y equidad en Colombia.
          </p>
        </div>
      </section>

      {/* Historia Interactiva */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Historia y Raíces de Nuestra Entidad</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Fundador: Dr. Rodolfo Martínez Tono (1927 - 2015) · Cartagena de Indias
            </p>
          </div>
          <History className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {historyMilestones.map((milestone) => (
            <div
              key={milestone.year}
              className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200"
            >
              <span className="inline-block text-xs font-mono-data font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {milestone.year}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-3 mb-1.5">
                {milestone.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {milestone.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Símbolos Institucionales SENA */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Símbolos Institucionales Oficiales</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Haz clic en cada símbolo para explorar su significado patrimonial y heráldico
          </p>
        </div>

        {/* Symbol Selector Buttons */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setSelectedSymbol('escudo')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedSymbol === 'escudo'
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            El Escudo Oficial
          </button>
          <button
            onClick={() => setSelectedSymbol('logo')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedSymbol === 'logo'
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            El Logotipo
          </button>
          <button
            onClick={() => setSelectedSymbol('bandera')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedSymbol === 'bandera'
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            La Bandera
          </button>
        </div>

        {/* Selected Symbol View */}
        {selectedSymbol === 'escudo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <SenaEscudo className="w-48 h-56 drop-shadow-md" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium text-center">
                Escudo institucional con los tres sectores de la economía
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Los Tres Sectores Económicos en el Escudo
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El escudo del SENA representa la articulación de las tres fuerzas que dinamizan la economía y el bienestar de Colombia:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setEscudoQuadrant('secundario')}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    escudoQuadrant === 'secundario'
                      ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 ring-1 ring-teal-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">1. Piñón Dentado (Sector Secundario)</span>
                    <span className="text-xs font-mono-data text-teal-700 dark:text-teal-400 font-semibold">Industria y Construcción</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Representa la fuerza motriz del trabajo manufacturero, la mecánica, la energía, la tecnología y la infraestructura que edifica la nación.
                  </p>
                </button>

                <button
                  onClick={() => setEscudoQuadrant('terciario')}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    escudoQuadrant === 'terciario'
                      ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 ring-1 ring-amber-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">2. Caduceo Alado (Sector Terciario)</span>
                    <span className="text-xs font-mono-data text-amber-700 dark:text-amber-400 font-semibold">Comercio y Servicios</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Símbolo universal del intercambio de bienes, las finanzas, el turismo, la logística, la salud y la economía del conocimiento y los servicios.
                  </p>
                </button>

                <button
                  onClick={() => setEscudoQuadrant('primario')}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    escudoQuadrant === 'primario'
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">3. Rama de Café (Sector Primario)</span>
                    <span className="text-xs font-mono-data text-emerald-700 dark:text-emerald-400 font-semibold">Agropecuario y Extractivo</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Rinde homenaje al campesinado colombiano, la seguridad alimentaria, la biodiversidad, la agroindustria y la riqueza de nuestros campos.
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedSymbol === 'logo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <SenaLogo className="w-36 h-36 text-emerald-600 dark:text-emerald-400 drop-shadow-sm" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium text-center">
                Símbolo de autonomía y proyección al futuro
              </p>
            </div>
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                La Silueta Humana y el Camino Abierto
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                El logotipo del SENA representa a un <strong className="text-slate-900 dark:text-white">aprendiz en constante avance</strong>, dando un paso decidido hacia adelante.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>El Aprendiz como protagonista:</strong> El ser humano está en el centro de toda la acción formativa del SENA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>El Sendero Circular:</strong> Simboliza la sociedad, el país y la comunidad solidaria que respaldan el crecimiento del trabajador.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Paso al futuro:</strong> Emblema de optimismo, innovación y compromiso permanente con la excelencia.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {selectedSymbol === 'bandera' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <SenaBandera className="w-64 h-40 shadow-sm" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium text-center">
                Bandera del SENA: fondo blanco y escudo central
              </p>
            </div>
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                La Bandera Institucional y su Significado
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                La bandera del SENA se caracteriza por un <strong className="text-slate-900 dark:text-white">fondo blanco inmaculado</strong> que porta en su centro el escudo de la institución.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El color blanco simboliza la <strong>paz, la tranquilidad, la transparencia, la armonía y la libertad</strong> con las que el SENA forma a sus aprendices para que sean agentes de reconciliación y desarrollo en cada rincón de Colombia.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Reproductor Interactivo del Himno */}
      <section>
        <HimnoPlayer />
      </section>

      {/* Principios y Valores Éticos */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Principios y Valores del Código de Integridad</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pilares de conducta que rigen a aprendices, instructores y funcionarios</p>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {valores.map((val) => (
            <div key={val.name} className="p-4 rounded-lg bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 inline-block" />
                {val.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 text-white rounded-xl gap-4">
        <div>
          <h3 className="text-base font-bold">¡Has explorado la Identidad Institucional!</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Marca este módulo como completado para registrar tu avance en la inducción.
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
            <span>Siguiente: Modelo FPI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
