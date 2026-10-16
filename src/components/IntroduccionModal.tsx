import React, { useState } from 'react';
import { CARTOGRAPHY_THEORY } from '../data/cartographyTheory';
import { 
  X, 
  BookOpen, 
  Compass, 
  Layers, 
  GitMerge, 
  Check, 
  Copy, 
  Lightbulb, 
  FlaskConical, 
  Dna, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl bg-[#f8f5ee] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 md:p-6 bg-white border-b border-stone-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                  MARCO DE REFERENCIA GEODÉSICO Y CARTOGRÁFICO
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  REPÚBLICA DEL ECUADOR · IGM & MAATE
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-stone-950 tracking-tight leading-snug">
                Fundamentos Cartográficos, Geodésicos y Topográficos
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Conceptos espaciales, proyecciones UTM, sistemas de coordenadas y análisis geográfico en el Ecuador.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors shrink-0"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-stone-100">
            {CARTOGRAPHY_THEORY.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeSectionId === section.id
                    ? 'bg-[#15803d] text-white border-[#15803d] shadow-sm'
                    : 'bg-stone-50 hover:bg-white text-stone-700 border-stone-200'
                }`}
              >
                {idx + 1}. {section.title.split('.')[1]?.trim().split('?')[0]?.trim() || section.id}
              </button>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          <div className="bg-white rounded-xl p-5 md:p-6 border border-stone-200 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803d] font-bold block mb-1">
                {currentSection.subtitle}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-stone-950 tracking-tight">
                {currentSection.title}
              </h3>
            </div>

            <p className="text-xs md:text-sm text-stone-700 leading-relaxed text-justify">
              {currentSection.content}
            </p>

            {/* DIDACTIC ANALOGY BOX (HIGHLIGHTED FOR PEDAGOGY STUDENTS) */}
            {currentSection.didacticAnalogy && (
              <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-[#15803d] uppercase tracking-wide">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>{currentSection.didacticAnalogy.title}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line font-normal">
                  {currentSection.didacticAnalogy.analogyText}
                </p>
                <div className="text-[11px] text-emerald-800 bg-white/70 p-2 rounded border border-emerald-100 font-medium">
                  <strong>💡 ¿Por qué es útil para ti como futuro profesor?</strong> {currentSection.didacticAnalogy.whyItMatters}
                </div>
              </div>
            )}

            {/* CONNECTION WITH CHEMISTRY & BIOLOGY */}
            {currentSection.chemistryBiologyLink && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-950">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#0369a1] mb-1">
                    <Dna className="w-4 h-4" />
                    <span>Aplicación en Biología:</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {currentSection.chemistryBiologyLink.biology}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#b45309] mb-1">
                    <FlaskConical className="w-4 h-4" />
                    <span>Aplicación en Química:</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {currentSection.chemistryBiologyLink.chemistry}
                  </p>
                </div>
              </div>
            )}

            {/* Formula / Standard box */}
            {currentSection.formulaOrStandard && (
              <div className="bg-stone-900 text-stone-100 rounded-lg p-3.5 font-mono text-xs flex items-center justify-between gap-3 shadow-inner">
                <span className="truncate">{currentSection.formulaOrStandard}</span>
                <button
                  onClick={() => handleCopyStandard(currentSection.formulaOrStandard!)}
                  className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors shrink-0"
                  title="Copiar código o estándar"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* FREE TOOLS IF AVAILABLE */}
            {currentSection.freeToolsUsed && currentSection.freeToolsUsed.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Plataformas Gratuitas Prioritarias en esta Cátedra:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSection.freeToolsUsed.map((tool, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">{tool.name}</span>
                        <p className="text-[11px] text-stone-600 mt-1 leading-snug">{tool.description}</p>
                      </div>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#15803d] hover:underline"
                      >
                        Abrir plataforma <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Points Grid */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 pt-2">
              Conceptos Clave para tus Clases:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentSection.keyPoints.map((point, idx) => (
                <div key={idx} className="bg-stone-50 rounded-lg p-3 border border-stone-200">
                  <span className="text-xs font-bold text-stone-900 block mb-1">
                    {point.label}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Contexto Ecuatoriano */}
            <div className="p-3.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-800">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-1">
                🇪🇨 Contexto Institucional del Ecuador:
              </span>
              <p className="text-xs leading-relaxed text-stone-700">
                {currentSection.ecuadorContext}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-stone-500 font-mono text-[11px]">
            Propuesta de Tesis de Grado · Carrera de Pedagogía de las Ciencias Experimentales: Química y Biología
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#15803d] hover:bg-[#166534] text-white font-bold transition-colors shadow-sm"
          >
            Continuar con las Prácticas
          </button>
        </div>
      </div>
    </div>
  );
};
