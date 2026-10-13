import React, { useState } from 'react';
import { SYLLABUS_UNITS } from '../data/syllabusUnits';
import { DIDACTIC_GUIDES } from '../data/guides';
import { 
  BookOpen, 
  Layers, 
  ExternalLink, 
  Trees, 
  ShieldCheck, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface TabPedagogicoProps {
  onOpenGuideModal: (guideId: string) => void;
  completedGuideIds: string[];
}

export const TabPedagogico: React.FC<TabPedagogicoProps> = ({
  onOpenGuideModal,
  completedGuideIds,
}) => {
  const [activeUnitId, setActiveUnitId] = useState<'unidad-2' | 'unidad-3'>('unidad-2');
  const [expandedTopicId, setExpandedTopicId] = useState<string>('2.1');

  const currentUnit = SYLLABUS_UNITS.find((u) => u.id === activeUnitId) || SYLLABUS_UNITS[0];
  const unitGuides = DIDACTIC_GUIDES.filter((g) => g.unitId === activeUnitId);

  const toggleTopic = (id: string) => {
    setExpandedTopicId(expandedTopicId === id ? '' : id);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* UNIT SELECTOR (SEGMENTED CONTROL TO AVOID COGNITIVE OVERLOAD) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 liquid-glass-card rounded-2xl p-2.5 border border-white/80">
        <div className="flex items-center gap-1.5 p-1 bg-white/70 rounded-xl border border-slate-200/80">
          <button
            onClick={() => {
              setActiveUnitId('unidad-2');
              setExpandedTopicId('2.1');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeUnitId === 'unidad-2'
                ? 'bg-[#15803d] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Trees className="w-4 h-4" />
            Unidad 2: Ecuador Megadiverso
          </button>

          <button
            onClick={() => {
              setActiveUnitId('unidad-3');
              setExpandedTopicId('3.1');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeUnitId === 'unidad-3'
                ? 'bg-[#0369a1] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Unidad 3: Conservación & SNAP
          </button>
        </div>

        <div className="text-xs text-slate-500 hidden md:flex items-center gap-2 px-2">
          <span>Acento temático:</span>
          <span 
            className="w-3 h-3 rounded-full inline-block" 
            style={{ backgroundColor: currentUnit.colorHex }}
          />
          <strong className="text-slate-800">{activeUnitId === 'unidad-2' ? 'Verde Selva (#15803d)' : 'Azul Océano (#0369a1)'}</strong>
        </div>
      </div>

      {/* UNIT HEADER BANNER */}
      <div 
        className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/90 relative overflow-hidden"
        style={{
          borderLeftWidth: '6px',
          borderLeftColor: currentUnit.colorHex,
        }}
      >
        <div className="max-w-3xl space-y-2">
          <span 
            className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md inline-block text-white"
            style={{ backgroundColor: currentUnit.colorHex }}
          >
            Sílabo de Biología y Geografía Ambiental
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {currentUnit.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            {currentUnit.subtitle}
          </p>
        </div>

        {/* RIGOROUS STATISTICAL CALLOUTS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200/60">
          {currentUnit.statCallouts.map((stat, idx) => (
            <div key={idx} className="bg-white/70 rounded-2xl p-3.5 border border-white/80 shadow-sm">
              <div 
                className="text-xl md:text-2xl font-black tracking-tight"
                style={{ color: currentUnit.colorHex }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 leading-tight">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                {stat.source}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO COLUMN LAYOUT: TOPICS ACCORDION (LEFT) + INTEGRATED GUIDES & RESOURCES (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: THEMATIC TOPICS (VERBATIM SYLLABUS TITLES) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0369a1]" /> Temas del Sílabo Oficial
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              4 subtemas estructurados
            </span>
          </div>

          <div className="space-y-3">
            {currentUnit.subtopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;
              return (
                <div 
                  key={topic.id}
                  className={`liquid-glass-card rounded-2xl border transition-all overflow-hidden ${
                    isExpanded ? 'border-slate-400/80 shadow-md' : 'border-white/80'
                  }`}
                >
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-white/60 transition-colors"
                  >
                    <div>
                      <span 
                        className="text-[10px] font-bold uppercase tracking-wider block mb-0.5"
                        style={{ color: currentUnit.colorHex }}
                      >
                        Subtema Oficial
                      </span>
                      <h4 className="text-sm md:text-base font-extrabold text-slate-900 leading-snug">
                        {topic.title}
                      </h4>
                    </div>

                    <div className="p-1 rounded-xl bg-white/80 text-slate-500 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-1 text-xs md:text-sm border-t border-slate-100 space-y-4">
                      <p className="text-slate-700 leading-relaxed text-justify">
                        {topic.content}
                      </p>

                      {/* Academic Highlights */}
                      <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 space-y-2">
                        <span className="text-xs font-bold text-slate-900 block">
                          Aspectos Científicos Relevantes:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {topic.academicHighlights.map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span 
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" 
                                style={{ backgroundColor: currentUnit.colorHex }}
                              />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Concepts without Pill Overload */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Conceptos clave:</span>
                        {topic.keyConcepts.map((concept, idx) => (
                          <span key={idx} className="bg-white/90 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700 border border-slate-200">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: INTEGRATED GUIDES & OFFICIAL EXTERNAL RESOURCES */}
        <div className="lg:col-span-5 space-y-6">
          {/* DIDACTIC GUIDES OF THIS UNIT */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#b45309]" /> Guías Didácticas Integradas
            </h3>

            <div className="space-y-3">
              {unitGuides.map((guide) => {
                const isCompleted = completedGuideIds.includes(guide.id);
                return (
                  <div 
                    key={guide.id}
                    className="liquid-glass rounded-2xl p-4 border border-white/90 shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#b45309] text-white">
                            Guía {guide.number}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{guide.platform}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-900 mt-1 leading-snug">
                          {guide.title}
                        </h4>
                      </div>

                      {isCompleted && (
                        <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0" title="Guía completada">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {guide.theoreticalFoundation}
                    </p>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <button
                        onClick={() => onOpenGuideModal(guide.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Ver Hoja de Trabajo
                      </button>

                      <a
                        href={guide.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#b45309] hover:underline flex items-center gap-1"
                      >
                        Abrir {guide.platform.split(' ')[0]}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EXTERNAL SCIENTIFIC RESOURCES */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#0369a1]" /> Recursos Científicos Vinculados
            </h3>

            <div className="space-y-2.5">
              {currentUnit.externalResources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block liquid-glass-card rounded-2xl p-3.5 border border-white/80 hover:border-slate-300 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#0369a1] uppercase">
                      {res.badge}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 mt-0.5 group-hover:text-[#0369a1] transition-colors">
                    {res.title}
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {res.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
