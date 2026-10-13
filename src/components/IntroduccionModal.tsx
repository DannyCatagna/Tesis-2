import React, { useState } from 'react';
import { CARTOGRAPHY_THEORY } from '../data/cartographyTheory';
import { X, BookOpen, Compass, Layers, GitMerge, Check, Copy } from 'lucide-react';

interface IntroduccionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGuide?: (guideId: string) => void;
}

export const IntroduccionModal: React.FC<IntroduccionModalProps> = ({
  isOpen,
  onClose,
  onOpenGuide,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(CARTOGRAPHY_THEORY[0].id);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const currentSection = CARTOGRAPHY_THEORY.find((s) => s.id === activeSectionId) || CARTOGRAPHY_THEORY[0];

  const handleCopyStandard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl bg-[#f8f4ee] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-6 bg-gradient-to-r from-emerald-900/10 via-sky-900/10 to-amber-900/10 border-b border-white/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#15803d] text-white">
                  Módulo Teórico Fundamental
                </span>
                <span className="text-xs text-slate-500 font-medium">Cartografía & WebGIS Continental</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Fundamentos de Cartografía, Geodesia y Análisis Espacial para el Ecuador
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 transition-colors shrink-0 shadow-sm"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-200/60">
            {CARTOGRAPHY_THEORY.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  activeSectionId === section.id
                    ? 'bg-[#15803d] text-white border-[#15803d] shadow-sm'
                    : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200'
                }`}
              >
                {idx + 1}. {section.id.split('-')[0].toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="liquid-glass rounded-2xl p-6 border border-white/90">
            <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight mb-1">
              {currentSection.title}
            </h3>
            <p className="text-xs font-semibold text-[#0369a1] uppercase tracking-wider mb-4">
              {currentSection.subtitle}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed text-justify mb-6">
              {currentSection.content}
            </p>

            {/* Formula / Standard box */}
            {currentSection.formulaOrStandard && (
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs flex items-center justify-between gap-3 mb-6 shadow-md">
                <span className="truncate">{currentSection.formulaOrStandard}</span>
                <button
                  onClick={() => handleCopyStandard(currentSection.formulaOrStandard!)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                  title="Copiar código o estándar"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Key Points Grid */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              Conceptos y Estándares Esenciales:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {currentSection.keyPoints.map((point, idx) => (
                <div key={idx} className="bg-white/80 rounded-xl p-3.5 border border-slate-200/80">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    {point.label}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Contexto Ecuatoriano */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-[#b45309]/30 text-amber-950">
              <span className="text-xs font-bold text-[#b45309] uppercase tracking-wider block mb-1">
                Aplicación Práctica en el Territorio Ecuatoriano:
              </span>
              <p className="text-xs leading-relaxed font-medium">
                {currentSection.ecuadorContext}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-white/70 border-t border-white/60 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            Marco Geodésico SIRGAS-Ecuador · WGS84 UTM 17S/18S
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
          >
            Entendido y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
