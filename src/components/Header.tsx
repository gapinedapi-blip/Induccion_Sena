import React from 'react';
import { ModuleId } from '../types/induction';
import { User, Award, Moon, Sun, LayoutDashboard, ShieldCheck, Lock, BookOpen } from 'lucide-react';

const SENA_LOGO_DATA_URL = "data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e";

interface HeaderProps {
  activeModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  onOpenProfile: () => void;
  apprenticeName: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  blueEffectActive: boolean;
  isDriveConnected?: boolean;
  onOpenAdmin?: () => void;
  onOpenGlossary?: () => void;
}

export function Header({
  activeModule,
  onSelectModule,
  onOpenProfile,
  apprenticeName,
  isDarkMode,
  onToggleDarkMode,
  blueEffectActive,
  isDriveConnected,
  onOpenAdmin,
  onOpenGlossary,
}: HeaderProps) {
  const navItems: { id: ModuleId; label: string; icon?: React.ReactNode }[] = [
    { id: 'tablero', label: 'Inicio & Ruta', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'identidad', label: '1. Identidad' },
    { id: 'pedagogico', label: '2. Modelo FPI' },
    { id: 'reglamento', label: '3. Reglamento' },
    { id: 'bienestar', label: '4. Bienestar' },
    { id: 'ecosistema', label: '5. Ecosistema' },
    { id: 'evaluacion', label: '6. Evaluación' },
    { id: 'certificado', label: '7. Certificado' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#151b2e]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#263152] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectModule('tablero')}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2.5"
        >
          <img
            src={SENA_LOGO_DATA_URL}
            alt="Logo oficial SENA"
            className="w-[42px] h-[42px] object-contain shrink-0 transition-transform"
          />
          <span className="font-bold">SENA · Inducción</span>
        </button>

        {/* Zone 2: Clean navigation links for apprentices */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#00a8e8] text-white shadow-xs font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-[#202945] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions + Dark Mode Toggle on the right */}
        <div className="flex items-center gap-2">
          {/* Glossary Floating Quick Access */}
          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1e2640] hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-[#283556] rounded-lg transition-colors cursor-pointer border border-slate-200 dark:border-[#283556]"
              title="Consultar Glosario Institucional SENA"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Glosario</span>
            </button>
          )}

          {/* Apprentice Certificate Quick Action */}
          <button
            onClick={() => onSelectModule('certificado')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              activeModule === 'certificado'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Mi Certificado</span>
          </button>

          {/* Apprentice Profile Trigger */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#1e2640] hover:bg-slate-200 dark:hover:bg-[#283556] rounded-lg transition-colors whitespace-nowrap cursor-pointer max-w-[140px] sm:max-w-[180px] border border-slate-200 dark:border-[#283556]"
            title={`Perfil de ${apprenticeName}`}
          >
            <User className="w-3.5 h-3.5 text-slate-500 dark:text-sky-400 shrink-0" />
            <span className="truncate">{apprenticeName || 'Mi Ficha'}</span>
          </button>

          {/* Discreet Instructor / Admin Portal Trigger */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg border border-slate-200 dark:border-[#283556] bg-slate-100 dark:bg-[#1e2640] text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 transition-colors cursor-pointer"
              title="Portal de Instructor / Administrador (Seguro)"
              aria-label="Acceso Instructor"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Dark Mode Toggle Button with Blue Effect */}
          <button
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro con efecto blue'}
            title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro (Efecto Blue)'}
            className={`relative p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-300 flex items-center justify-center ${
              isDarkMode
                ? 'bg-blue-950/80 text-blue-300 border-blue-500/50 hover:bg-blue-900/70 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
            } ${blueEffectActive ? 'animate-blue-pulse ring-2 ring-blue-500' : ''}`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
            <span className="sr-only">
              {isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
