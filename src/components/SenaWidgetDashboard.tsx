import React, { useState } from 'react';
import { ApprenticeProfile, ModuleId } from '../types/induction';
import { SENA_MODULES } from '../data/senaData';
import { SENA_IMAGES } from '../assets/images';
import {
  Calendar as CalendarIcon,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  TrendingUp,
  Award,
  BookOpen,
  Scale,
  HeartHandshake,
  Laptop,
  CheckCircle2,
  ArrowRight,
  User,
  ShieldCheck,
  Download,
  Upload,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
} from 'lucide-react';

interface DashboardProps {
  profile: ApprenticeProfile;
  completedModules: ModuleId[];
  onSelectModule: (mod: ModuleId) => void;
  quizScore: number;
  certificateCode: string;
  onOpenProfile: () => void;
  driveRecordsCount?: number;
  isDriveConnected?: boolean;
}

export function SenaWidgetDashboard({
  profile,
  completedModules,
  onSelectModule,
  quizScore,
  certificateCode,
  onOpenProfile,
  driveRecordsCount,
  isDriveConnected,
}: DashboardProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeChartPeriod, setActiveChartPeriod] = useState<'semana' | 'modulo'>('modulo');
  const [selectedDay, setSelectedDay] = useState<number>(7);
  const [audioProgress, setAudioProgress] = useState<number>(45);

  const progressPercentage = Math.round(
    (completedModules.filter((m) => m !== 'tablero').length / 8) * 100
  );

  const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const calendarDays = [
    { num: 27, current: false },
    { num: 28, current: false },
    { num: 29, current: false },
    { num: 30, current: false },
    { num: 1, current: true },
    { num: 2, current: true },
    { num: 3, current: true },
    { num: 4, current: true },
    { num: 5, current: true },
    { num: 6, current: true },
    { num: 7, current: true, isKey: true },
    { num: 8, current: true },
    { num: 9, current: true },
    { num: 10, current: true },
    { num: 11, current: true },
    { num: 12, current: true },
    { num: 13, current: true },
    { num: 14, current: true },
    { num: 15, current: true },
    { num: 16, current: true },
    { num: 17, current: true },
  ];

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="space-y-6">
      {/* Inspired Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Tablero Integral de Inducción · Diseño Modular Bento</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
            Panel de Control del Aprendiz SENA
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-data px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-semibold">
            Ficha {profile.fichaNumber}
          </span>
          <button
            onClick={onOpenProfile}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Bento Grid Matrix (Directly inspired by the widget kit visual layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* WIDGET 1: Mini Calendario (Cyan Header) */}
        <div className="rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#00a8e8] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Cronograma Inducción</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="font-semibold">Octubre</span>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between text-white">
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-sky-300/80 mb-2 font-mono-data font-semibold">
              {daysOfWeek.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono-data">
              {calendarDays.map((d, idx) => {
                const isSelected = d.num === selectedDay && d.current;
                return (
                  <button
                    key={idx}
                    onClick={() => d.current && setSelectedDay(d.num)}
                    className={`py-1 rounded text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#e11d48] text-white font-bold shadow-xs'
                        : d.isKey
                        ? 'bg-[#00a8e8]/30 text-sky-300 font-bold border border-sky-400/40'
                        : d.current
                        ? 'text-slate-200 hover:bg-[#283556]'
                        : 'text-slate-600 opacity-40'
                    }`}
                  >
                    {d.num}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#283556] flex items-center justify-between text-[11px] text-sky-300">
              <span>Hito activo: Fase Inducción</span>
              <span className="font-bold text-[#e11d48]">Día {selectedDay}</span>
            </div>
          </div>
        </div>

        {/* WIDGET 2: Daily Focus / Ficha Card (Mustard Yellow Header) */}
        <div className="rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#f59e0b] text-slate-950 px-4 py-2.5 flex items-center justify-between font-bold">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-slate-900" />
              <span>Día de Formación</span>
            </div>
            <span className="text-xs font-mono-data font-bold">SENA 2026</span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between items-center text-center text-white">
            <span className="text-xs text-amber-300 font-medium">Jornada de Inducción</span>
            <div className="my-1">
              <span className="text-5xl font-extrabold text-white font-mono-data tracking-tight">
                {selectedDay < 10 ? `0${selectedDay}` : selectedDay}
              </span>
              <span className="block text-xs font-semibold text-slate-300 mt-1">
                Octubre · Miércoles
              </span>
            </div>
            <div className="w-full pt-3 border-t border-[#283556] flex items-center justify-between text-[11px] text-amber-200/90">
              <button
                onClick={() => onSelectModule('identidad')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>+ Ver Módulo</span>
              </button>
              <button
                onClick={() => onSelectModule('evaluacion')}
                className="hover:text-white transition-colors cursor-pointer font-bold"
              >
                Desafío (Quiz)
              </button>
            </div>
          </div>
        </div>

        {/* WIDGET 3: Estado de Convivencia y Ambiente (Teal / Mint Header) */}
        <div className="rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#0d9488] text-white px-4 py-2.5 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Ambiente & Convivencia</span>
            </div>
            <span className="text-[11px] font-mono-data">100% OK</span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-extrabold text-white font-mono-data">98%</span>
                <span className="block text-xs text-teal-300 font-medium">Asistencia Registrada</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Modalidad:</span>
                <span className="font-semibold text-white">{profile.modality}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Debido Proceso:</span>
                <span className="font-semibold text-emerald-400">Sin Novedades</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#283556] flex items-center justify-between text-[11px] text-teal-300">
              <span>Acuerdo 009 de 2024</span>
              <button
                onClick={() => onSelectModule('reglamento')}
                className="underline hover:text-white cursor-pointer font-semibold"
              >
                Explorar
              </button>
            </div>
          </div>
        </div>

        {/* WIDGET 4: Sede Campus Showcase (Cyan Header with Landscape Visual) */}
        <div className="rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#00a8e8] text-white px-4 py-2.5 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
              <MapPin className="w-4 h-4" />
              <span>Sede Institucional</span>
            </div>
            <span className="text-[10px] font-mono-data bg-white/20 px-1.5 py-0.5 rounded">SENA</span>
          </div>
          <div className="relative h-28 overflow-hidden">
            <img
              src={SENA_IMAGES.heroCampus}
              alt="Campus SENA"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2138] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 text-white">
              <span className="text-xs font-bold block truncate">{profile.trainingCenter}</span>
              <span className="text-[10px] text-sky-200 block truncate">{profile.regional}</span>
            </div>
          </div>
          <div className="p-3 pt-1 text-[11px] text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">Centro de Formación</span>
            <button
              onClick={() => onSelectModule('identidad')}
              className="text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
            >
              Conocer Historia →
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Media Player + Statistics Graph + Access Portal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* WIDGET 5: Video / Multimedia Player (Himno SENA - Direct image inspiration) */}
        <div className="lg:col-span-4 rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#00a8e8] text-white px-4 py-2.5 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
              <Play className="w-4 h-4 fill-white" />
              <span>Reproductor Himno SENA</span>
            </div>
            <span className="text-xs font-mono-data">Audio Oficial</span>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between items-center text-center text-white space-y-4">
            {/* Center Circular Play Button */}
            <div className="relative my-2">
              <div className="w-20 h-20 rounded-full border-4 border-sky-400/40 flex items-center justify-center bg-[#13192b] shadow-inner group cursor-pointer hover:border-sky-400 transition-all"
                onClick={toggleAudio}
              >
                {isPlayingAudio ? (
                  <Pause className="w-8 h-8 text-sky-400 fill-sky-400" />
                ) : (
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                )}
              </div>
            </div>

            <div className="w-full text-center">
              <span className="text-sm font-bold text-white block">Himno de la Esperanza y el Trabajo</span>
              <span className="text-xs text-sky-300 block">Coro Institucional de la Juventud</span>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="w-full space-y-1.5">
              <div className="w-full h-1.5 bg-[#283556] rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                  setAudioProgress(pos);
                }}
              >
                <div
                  className="h-full bg-[#e11d48] rounded-full transition-all duration-200"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                <span>01:15</span>
                <span>03:10</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-center gap-6 pt-1 text-slate-300">
              <button
                onClick={() => setAudioProgress(Math.max(0, audioProgress - 15))}
                className="hover:text-white transition-colors cursor-pointer"
                title="Retroceder"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleAudio}
                className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>
              <button
                onClick={() => onSelectModule('identidad')}
                className="hover:text-white text-xs underline cursor-pointer text-sky-400"
              >
                Letra Completa
              </button>
            </div>
          </div>
        </div>

        {/* WIDGET 6: Statistics Graph (Line Graph directly inspired by the image) */}
        <div className="lg:col-span-5 rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#00a8e8] text-white px-4 py-2.5 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Estadísticas de Formación</span>
            </div>
            <div className="flex items-center gap-1 bg-[#13192b]/40 rounded p-0.5 text-xs font-mono-data">
              <button
                onClick={() => setActiveChartPeriod('modulo')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeChartPeriod === 'modulo' ? 'bg-[#00a8e8] text-white font-bold' : 'text-sky-200 hover:text-white'
                }`}
              >
                Módulos
              </button>
              <button
                onClick={() => setActiveChartPeriod('semana')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeChartPeriod === 'semana' ? 'bg-[#00a8e8] text-white font-bold' : 'text-sky-200 hover:text-white'
                }`}
              >
                Semana
              </button>
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between text-xs mb-2">
              <div>
                <span className="text-[11px] text-slate-400 block">Puntaje Global</span>
                <span className="text-xl font-bold font-mono-data text-white">
                  {quizScore ? `${quizScore * 10} Pts` : '100 Pts'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Efectividad</span>
                <span className="text-xs font-mono-data font-bold text-emerald-400">
                  {progressPercentage}% Apropiado
                </span>
              </div>
            </div>

            {/* SVG Line Chart (matching the white chart curve with callout pin in the image) */}
            <div className="relative h-36 w-full my-2">
              <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="#283556" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#283556" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="#283556" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="300" y2="110" stroke="#283556" strokeDasharray="3 3" />

                {/* Shaded Area under curve */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00a8e8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 95 L 50 80 L 100 88 L 150 45 L 200 60 L 250 20 L 290 35 L 290 115 L 10 115 Z"
                  fill="url(#chartGradient)"
                />

                {/* White Trend Line */}
                <path
                  d="M 10 95 L 50 80 L 100 88 L 150 45 L 200 60 L 250 20 L 290 35"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                <circle cx="50" cy="80" r="3.5" fill="#00a8e8" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="100" cy="88" r="3.5" fill="#00a8e8" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="150" cy="45" r="3.5" fill="#00a8e8" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="200" cy="60" r="3.5" fill="#00a8e8" stroke="#ffffff" strokeWidth="1.5" />
                
                {/* Active Highlight Pin point (like the '149' badge in user's image) */}
                <circle cx="250" cy="20" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
                <g transform="translate(225, -2)">
                  <rect width="50" height="18" rx="4" fill="#00a8e8" stroke="#ffffff" strokeWidth="1" />
                  <text x="25" y="13" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    100%
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom X-Axis labels */}
            <div className="flex items-center justify-between text-[10px] font-mono-data text-slate-400 pt-1 border-t border-[#283556]">
              <span>M01 Id</span>
              <span>M02 FPI</span>
              <span>M03 Reg</span>
              <span>M04 Bien</span>
              <span>M05 Eco</span>
              <span>M07 Quiz</span>
            </div>
          </div>
        </div>

        {/* WIDGET 7: Acceso Sofia Plus / Zajuna (Styled after Login/Register Widget from image) */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#00a8e8] text-white px-4 py-2.5 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
              <Laptop className="w-4 h-4" />
              <span>Plataformas SENA</span>
            </div>
            <span className="text-xs font-mono-data">LMS Zajuna</span>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between text-white space-y-3">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-sky-200 block">Documento del Aprendiz</label>
              <div className="bg-[#13192b] border border-[#283556] rounded-md px-3 py-1.5 text-xs font-mono-data text-slate-200 flex items-center justify-between">
                <span>{profile.documentType} {profile.documentNumber}</span>
                <User className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-sky-200 block">Ficha de Caracterización</label>
              <div className="bg-[#13192b] border border-[#283556] rounded-md px-3 py-1.5 text-xs font-mono-data text-slate-200 flex items-center justify-between">
                <span>{profile.fichaNumber}</span>
                <span className="text-[10px] text-emerald-400 font-bold">MATRICULADO</span>
              </div>
            </div>

            {/* Red / Coral Action Button (exact style from image) */}
            <a
              href="https://zajuna.sena.edu.co"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-lg bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold text-center transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ingresar a Zajuna LMS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="pt-1 text-center">
              <button
                onClick={() => onSelectModule('ecosistema')}
                className="text-[11px] text-sky-300 hover:text-white underline cursor-pointer"
              >
                Ver Sofia Plus, APE y Bibliotecas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Circular Gauges (77%, 152, 132) + Menu Items List + Status Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        
        {/* WIDGET 8: Donut Circular Gauges (Direct visual representation from image) */}
        <div className="lg:col-span-5 rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#00a8e8] text-white px-4 py-2.5 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
              <Award className="w-4 h-4" />
              <span>Indicadores de Desempeño</span>
            </div>
            <span className="text-xs font-mono-data">3 Indicadores</span>
          </div>

          <div className="p-6 flex-1 flex items-center justify-around gap-4 text-center">
            {/* Donut Gauge 1: Progress */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#283556"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00a8e8"
                    strokeWidth="3.5"
                    strokeDasharray={`${progressPercentage}, 100`}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-sm font-extrabold font-mono-data text-white">{progressPercentage}%</span>
                </div>
              </div>
              <span className="text-xs text-sky-200 mt-2 font-medium">Avance Total</span>
            </div>

            {/* Donut Gauge 2: Points (Red & Cyan dial from image) */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="3.5"
                    strokeDasharray="40, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00a8e8"
                    strokeWidth="3.5"
                    strokeDasharray="50, 100"
                    strokeDashoffset="-40"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-sm font-extrabold font-mono-data text-white">
                    {quizScore ? `${quizScore}/10` : '10/10'}
                  </span>
                </div>
              </div>
              <span className="text-xs text-rose-300 mt-2 font-medium">Desafío SENA</span>
            </div>

            {/* Donut Gauge 3: Módulos */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#283556"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeDasharray={`${Math.round((completedModules.filter(m => m !== 'tablero').length / 8) * 100)}, 100`}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-sm font-extrabold font-mono-data text-white">
                    {completedModules.filter(m => m !== 'tablero').length}/8
                  </span>
                </div>
              </div>
              <span className="text-xs text-emerald-300 mt-2 font-medium">Módulos OK</span>
            </div>
          </div>
        </div>

        {/* WIDGET 9: Menu Items List (Mustard Yellow Header from image) */}
        <div className="lg:col-span-4 rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md flex flex-col">
          <div className="bg-[#f59e0b] text-slate-950 px-4 py-2.5 flex items-center justify-between font-bold">
            <span className="text-xs uppercase tracking-wider">Menú Rápido de Módulos</span>
            <span className="text-xs font-mono-data">8 Rutas</span>
          </div>

          <div className="divide-y divide-[#283556] text-xs text-white">
            <button
              onClick={() => onSelectModule('identidad')}
              className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#283556] transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>01. Identidad & Símbolos</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onSelectModule('pedagogico')}
              className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#283556] transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>02. Modelo Pedagógico FPI</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onSelectModule('reglamento')}
              className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#283556] transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>03. Reglamento del Aprendiz</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onSelectModule('bienestar')}
              className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#283556] transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                <span>04. Bienestar al Aprendiz</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onSelectModule('certificado')}
              className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#283556] transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>08. Acta y Certificado</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* WIDGET 10: Status Progress Bars (Yellow & Cyan Download/Upload Status Cards from image) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Card A: Evidencias Upload Status (Yellow) */}
          <div className="rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md">
            <div className="bg-[#f59e0b] text-slate-950 px-3.5 py-2 flex items-center justify-between font-bold text-xs">
              <div className="flex items-center gap-1.5 uppercase">
                <Upload className="w-3.5 h-3.5" />
                <span>Carga de Evidencias</span>
              </div>
              <span className="font-mono-data">{progressPercentage}%</span>
            </div>
            <div className="p-3 text-white">
              <div className="w-full h-3 bg-[#13192b] rounded-full overflow-hidden border border-[#283556]">
                <div
                  className="h-full bg-[#f59e0b] transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-[11px] text-amber-200/80 block mt-1.5 font-mono-data">
                Portafolio del Aprendiz al día
              </span>
            </div>
          </div>

          {/* Card B: Certificado Download Status (Cyan) */}
          <div className="rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md">
            <div className="bg-[#00a8e8] text-white px-3.5 py-2 flex items-center justify-between font-bold text-xs">
              <div className="flex items-center gap-1.5 uppercase">
                <Download className="w-3.5 h-3.5" />
                <span>Acta & Certificado</span>
              </div>
              <span className="font-mono-data">Listo</span>
            </div>
            <div className="p-3 text-white">
              <div className="w-full h-3 bg-[#13192b] rounded-full overflow-hidden border border-[#283556]">
                <div className="h-full bg-[#00a8e8] w-full" />
              </div>
              <button
                onClick={() => onSelectModule('certificado')}
                className="text-[11px] text-sky-300 hover:text-white font-bold block mt-1.5 underline cursor-pointer"
              >
                Descargar Acta Oficial ({certificateCode})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Stepper Slider Horizontal Timeline (exact 1-2-3-4-5-6-7-8 Stepper from the bottom of reference image) */}
      <div className="rounded-xl overflow-hidden bg-[#1a2138] border border-[#283556] shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-3 border-b border-[#283556] gap-2 text-white">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
              Ruta Formativa Secuencial
            </span>
            <h3 className="text-base font-bold">Línea de Progreso de la Inducción SENA</h3>
          </div>
          <span className="text-xs font-mono-data text-sky-300 font-bold bg-[#13192b] px-3 py-1 rounded-md border border-[#283556]">
            {completedModules.filter(m => m !== 'tablero').length} de 8 Módulos Superados
          </span>
        </div>

        {/* The Inspired Horizontal Stepper Track */}
        <div className="relative py-4 px-2 sm:px-6">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[#283556] z-0" />
          
          {/* Active Highlight Fill Line */}
          <div
            className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-[#00a8e8] z-0 transition-all duration-300"
            style={{ width: `calc(${progressPercentage}% * 0.9)` }}
          />

          {/* Stepper Nodes */}
          <div className="relative z-10 flex items-center justify-between">
            {SENA_MODULES.map((mod, idx) => {
              const isCompleted = completedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className="group flex flex-col items-center cursor-pointer focus:outline-hidden"
                  title={`${mod.number}. ${mod.title}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-data font-bold transition-all shadow-md ${
                      isCompleted
                        ? 'bg-[#00a8e8] text-white ring-4 ring-[#00a8e8]/30 scale-110'
                        : 'bg-[#1a2138] text-slate-400 border-2 border-[#283556] group-hover:border-sky-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="hidden md:block text-[11px] font-medium text-slate-300 group-hover:text-white mt-2 max-w-[80px] text-center truncate">
                    {mod.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
