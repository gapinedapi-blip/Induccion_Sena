import React from 'react';

export const SENA_LOGO_OFFICIAL_PATH = "M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z";

/**
 * Official SENA Logo mark:
 * Features the head circle, the SENA lettering, and the forward-striding apprentice.
 */
export function SenaLogo({ className = "w-8 h-8 text-[#39A900]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 1000" fill="currentColor" className={className} aria-label="Logotipo oficial SENA">
      <path d={SENA_LOGO_OFFICIAL_PATH} />
    </svg>
  );
}

/**
 * SENA Escudo (Coat of Arms):
 * Contains three economic sectors:
 * 1. Piñón (Secondary sector: Industry & Construction)
 * 2. Caduceus with wings (Tertiary sector: Commerce & Services)
 * 3. Coffee branch (Primary sector: Agriculture & Natural Resources)
 */
export function SenaEscudo({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-label="Escudo oficial del SENA">
      <defs>
        <linearGradient id="shieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>
      
      {/* Shield Contour */}
      <path
        d="M25 35 C25 35 100 20 100 20 C100 20 175 35 175 35 C175 125 155 185 100 215 C45 185 25 125 25 35 Z"
        fill="url(#shieldBg)"
        stroke="#15803d"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Internal partition lines */}
      <path d="M100 30 L100 120" stroke="#16a34a" strokeWidth="3" strokeDasharray="2 2" />
      <path d="M30 120 L170 120" stroke="#16a34a" strokeWidth="3" />

      {/* TOP LEFT: Sector Secundario - Cogwheel / Piñón (Industria y Construcción) */}
      <g transform="translate(62, 75)" fill="#0f766e" stroke="#042f2e" strokeWidth="1">
        <circle cx="0" cy="0" r="14" fill="#0d9488" />
        <circle cx="0" cy="0" r="6" fill="#f8fafc" stroke="#0f766e" strokeWidth="2" />
        {/* Teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="-3"
            y="-19"
            width="6"
            height="7"
            rx="1"
            fill="#0d9488"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>

      {/* TOP RIGHT: Sector Terciario - Caduceo alado (Comercio y Servicios) */}
      <g transform="translate(138, 75)">
        {/* Staff */}
        <line x1="0" y1="-22" x2="0" y2="24" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="-22" r="3.5" fill="#f59e0b" />
        {/* Wings */}
        <path d="M-15 -14 C-10 -22 -3 -18 0 -14 C3 -18 10 -22 15 -14 C8 -10 3 -12 0 -10 C-3 -12 -8 -10 -15 -14 Z" fill="#f59e0b" />
        {/* Intertwined serpents stylized */}
        <path d="M-8 4 C-4 -4 4 -4 8 4 C4 12 -4 12 0 20" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 4 C4 -4 -4 -4 -8 4 C-4 12 4 12 0 20" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* BOTTOM CENTER: Sector Primario - Rama de Café (Agropecuario) */}
      <g transform="translate(100, 165)">
        {/* Coffee branch stem */}
        <path d="M-30 20 Q0 -5 30 18" fill="none" stroke="#166534" strokeWidth="3.5" strokeLinecap="round" />
        {/* Left leaf */}
        <path d="M-18 6 C-30 -10 -12 -22 0 -12 C-8 -4 -12 2 -18 6 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
        {/* Right leaf */}
        <path d="M18 8 C30 -8 14 -22 2 -12 C10 -4 14 3 18 8 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
        {/* Coffee cherries / berries */}
        <circle cx="-5" cy="0" r="4.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
        <circle cx="5" cy="1" r="4.5" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
        <circle cx="0" cy="7" r="4" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      </g>

      {/* Top Banner with "SENA" */}
      <path
        d="M50 16 L150 16 L140 29 L60 29 Z"
        fill="#15803d"
      />
      <text
        x="100"
        y="25.5"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="9"
        fontWeight="bold"
        letterSpacing="2.5"
        fontFamily="sans-serif"
      >
        SENA
      </text>
    </svg>
  );
}

/**
 * SENA Bandera (Flag):
 * White canvas (peace, serenity, progress) with the Escudo in the center.
 */
export function SenaBandera({ className = "w-48 h-32" }: { className?: string }) {
  return (
    <div className={`relative bg-white border border-slate-300 shadow-sm rounded-sm overflow-hidden flex items-center justify-center ${className}`}>
      {/* Flag mast styling line */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-400" />
      {/* Official shield inside */}
      <SenaEscudo className="w-16 h-20 drop-shadow-xs" />
    </div>
  );
}
