import React, { useState } from 'react';
import { BIBLIOGRAPHY } from '../data/bibliography';
import { APAcitation } from '../types';
import { 
  BookMarked, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Filter, 
  BookOpen, 
  Scale, 
  Trees, 
  Layers 
} from 'lucide-react';

export const TabBibliografia: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { label: 'Todas las Referencias (10)', value: 'all' },
    { label: 'Normativa y Políticas', value: 'Normativa y Políticas' },
    { label: 'Biodiversidad y Ecología', value: 'Biodiversidad y Ecología' },
    { label: 'Sistemas de Información Geográfica', value: 'Sistemas de Información Geográfica' },
    { label: 'Cartografía Oficial', value: 'Cartografía Oficial' },
  ];

  const filteredBibliography = BIBLIOGRAPHY.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyAPA = (item: APAcitation) => {
    const citation = `${item.authors} (${item.year}). ${item.title}. ${item.source}.${item.doiOrUrl ? ` ${item.doiOrUrl}` : ''}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/80 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0369a1]">
              Rigor Académico Universitario
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-500">Formato Estándar APA (7.ª edición)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Bibliografía y Fuentes Científicas de Referencia
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Compendio de literatura científica sobre geomática aplicada, biodiversidad del Ecuador, informes oficiales del SNAP y cuerpo normativo constitucional y ambiental vigente.
          </p>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200/60">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por autor, título o concepto biológico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369a1]/30 text-slate-800"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/80 rounded-xl px-3 py-2 text-xs md:text-sm border border-slate-200 text-slate-800 focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* BIBLIOGRAPHY LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Mostrando <strong>{filteredBibliography.length}</strong> de {BIBLIOGRAPHY.length} referencias</span>
          <span>Click en "Copiar Cita" para exportar en APA 7</span>
        </div>

        {filteredBibliography.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div 
              key={item.id}
              className="liquid-glass-card rounded-2xl p-5 border border-white/90 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded inline-block ${
                    item.category === 'Normativa y Políticas'
                      ? 'bg-sky-100 text-[#0369a1]'
                      : item.category === 'Biodiversidad y Ecología'
                      ? 'bg-emerald-100 text-[#15803d]'
                      : item.category === 'Sistemas de Información Geográfica'
                      ? 'bg-amber-100 text-[#b45309]'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.category}
                  </span>

                  {/* APA Formatted Reference */}
                  <h4 className="text-sm md:text-base font-extrabold text-slate-900 leading-snug">
                    {item.authors} ({item.year}). <span className="italic">{item.title}</span>. {item.source}.
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyAPA(item)}
                    title="Copiar cita en formato APA 7"
                    className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 text-xs font-bold"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-600" />
                        <span>Copiar APA</span>
                      </>
                    )}
                  </button>

                  {item.doiOrUrl && (
                    <a
                      href={item.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm transition-colors"
                      title="Abrir enlace institucional o DOI"
                    >
                      <ExternalLink className="w-4 h-4 text-[#0369a1]" />
                    </a>
                  )}
                </div>
              </div>

              {/* Academic Abstract */}
              <p className="text-xs text-slate-600 leading-relaxed text-justify bg-white/50 p-3 rounded-xl border border-white/60">
                <strong className="text-slate-800">Resumen y Relevancia Pedagógica:</strong> {item.abstract}
              </p>
            </div>
          );
        })}

        {filteredBibliography.length === 0 && (
          <div className="text-center py-12 liquid-glass rounded-2xl border border-white/80">
            <BookMarked className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">No se encontraron referencias</h4>
            <p className="text-xs text-slate-500 mt-1">Pruebe ajustando los términos de búsqueda o el filtro de categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};
