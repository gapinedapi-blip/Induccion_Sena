import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../../data/senaData';
import { Search, Bookmark, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNext: () => void;
}

export function ModuleGlosario({ onComplete, isCompleted, onNext }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Institucional', 'Académico', 'Tecnológico', 'Administrativo'];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.example.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Module Title Header with Clean Unboxed Metadata */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
          <span>Módulo 06</span>
          <span aria-hidden="true">·</span>
          <span>Glosario Oficial</span>
          <span aria-hidden="true">·</span>
          <span>Terminología SENA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
          Glosario Esencial de la Comunidad SENA
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Para comunicarte efectivamente en la comunidad SENA es indispensable apropiar su vocabulario técnico y pedagógico. Busca y filtra cualquier término.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar término (ej. RAP, Ficha, Sofia)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item) => (
          <div
            key={item.term}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.term}</h3>
                <span className="text-[11px] font-mono-data text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                {item.definition}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-3 rounded-lg text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Uso en la vida del aprendiz:</span>
              <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                "{item.example}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
          <Bookmark className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No se encontraron términos para "{searchTerm}"</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Intenta con otra palabra clave o selecciona otra categoría.</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900 text-white rounded-xl gap-4">
        <div>
          <h3 className="text-base font-bold">¿Listo para demostrar tus conocimientos?</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Presenta el Desafío de Inducción de 10 preguntas para habilitar tu Acta Oficial.
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
            <span>Ir a la Evaluación</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
