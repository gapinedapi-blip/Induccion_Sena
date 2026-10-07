import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/senaData';
import { Search, BookOpen, X, Sparkles, Filter, ExternalLink } from 'lucide-react';

interface GlossaryFloatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlossaryFloatingModal({ isOpen, onClose }: GlossaryFloatingModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Institucional', 'Académico', 'Tecnológico', 'Administrativo'];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white dark:bg-[#111728] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-[#243050] overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-300 uppercase">
                  Diccionario Institucional
                </span>
                <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700/60 text-emerald-300 font-mono">
                  {filteredTerms.length} términos
                </span>
              </div>
              <h2 className="text-base font-bold tracking-tight">
                Glosario Terminológico SENA
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Cerrar glosario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 bg-slate-50 dark:bg-[#161f36] border-b border-slate-200 dark:border-[#243050] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término, sigla o concepto (ej. RAP, Ficha, Sofia, SofiaPlus)..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#101726] border border-slate-300 dark:border-[#2d3c63] rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Categoría:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-[#101726] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f2a48] border border-slate-200 dark:border-[#2a385c]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term List */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
          {filteredTerms.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium">No se encontraron términos para "{searchTerm}"</p>
              <p className="text-xs text-slate-500 mt-1">Prueba con palabras como RAP, Ficha, Competencia o Instructor.</p>
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white font-mono-data">
                      {item.term}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {item.category}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
                {item.example && (
                  <div className="mt-1.5 p-2 rounded bg-slate-50 dark:bg-slate-900/60 text-[11px] text-slate-500 dark:text-slate-400 italic border-l-2 border-emerald-500">
                    💡 Ejemplo: {item.example}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-[#131b2e] border-t border-slate-200 dark:border-[#243050] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Consulta pedagógica rápida para aprendices SENA</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
