import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Music, Check } from 'lucide-react';
import { HIMNO_SENA_VERSOS } from '../data/senaData';

export function HimnoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  const currentVerse = HIMNO_SENA_VERSOS[activeVerseIndex];
  const lines = currentVerse.text.split('\n');

  // Simple harmonious audio chord synthesis for institutional atmosphere
  const playInstitutionalTone = (frequency = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.8);
      }
    } catch {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const tones = [392, 440, 523.25, 587.33];
    playInstitutionalTone(tones[activeLineIndex % tones.length]);

    timerRef.current = setInterval(() => {
      setActiveLineIndex((prev) => {
        if (prev + 1 < lines.length) {
          playInstitutionalTone(tones[(prev + 1) % tones.length]);
          return prev + 1;
        } else {
          // move to next verse
          setActiveVerseIndex((prevVerse) => {
            const nextVerse = (prevVerse + 1) % HIMNO_SENA_VERSOS.length;
            return nextVerse;
          });
          return 0;
        }
      });
    }, 3600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeVerseIndex, lines.length]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveVerseIndex(0);
    setActiveLineIndex(0);
  };

  const handleSelectVerse = (index: number) => {
    setActiveVerseIndex(index);
    setActiveLineIndex(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">Himno Oficial del SENA</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Letra: Luis Alfredo Sánchez · Música: Daniel Marlez
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title={soundEnabled ? 'Sonido armónico activado' : 'Sonido silenciado'}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            onClick={handlePlayToggle}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors shadow-xs cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Cantar / Reproducir</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg text-sm transition-colors cursor-pointer"
            title="Reiniciar himno"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Verse Tabs */}
      <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1">
        {HIMNO_SENA_VERSOS.map((v, idx) => (
          <button
            key={v.type}
            onClick={() => handleSelectVerse(idx)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeVerseIndex === idx
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {v.type}
          </button>
        ))}
      </div>

      {/* Lyrics Display */}
      <div className="mt-5 p-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-lg border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden transition-colors">
        <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400 block mb-3">
          {currentVerse.type}
        </span>

        <div className="space-y-2 max-w-lg mx-auto">
          {lines.map((line, lIdx) => {
            const isCurrentLine = activeLineIndex === lIdx && isPlaying;
            return (
              <p
                key={lIdx}
                className={`text-base transition-all duration-300 font-editorial ${
                  isCurrentLine
                    ? 'text-emerald-900 dark:text-emerald-200 font-bold scale-102 bg-emerald-100/70 dark:bg-emerald-950/80 py-1 px-3 rounded-md shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 font-medium'
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>

        {isPlaying && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Leyendo y entonando compás institucional...</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>Protocolo: Se entona en ceremonias solemnes y graduaciones con respeto</span>
        <span>Patrimonio Cultural SENA</span>
      </div>
    </div>
  );
}
