import React, { useState } from 'react';
import { DidacticGuide } from '../types';
import { 
  X, 
  ExternalLink, 
  Clock, 
  BookOpen, 
  Layers, 
  Lightbulb, 
  CheckCircle, 
  Award, 
  Download, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface GuideModalProps {
  guide: DidacticGuide | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (guideId: string) => void;
  onNavigateMapArea?: (areaId: string) => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  guide,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  onNavigateMapArea,
}) => {
  const [expandedGlossary, setExpandedGlossary] = useState<number | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  if (!isOpen || !guide) return null;

  const toggleGlossaryItem = (idx: number) => {
    setExpandedGlossary(expandedGlossary === idx ? null : idx);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#f8f4ee] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className={`p-6 border-b border-white/60 ${
          guide.unitId === 'unidad-2' ? 'bg-[#15803d]/10' : 'bg-[#0369a1]/10'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                  guide.unitId === 'unidad-2'
                    ? 'bg-[#15803d] text-white'
                    : 'bg-[#0369a1] text-white'
                }`}>
                  Guía Práctica N° {guide.number}
                </span>
                <span className="text-xs text-slate-500 font-medium">{guide.unitTitle}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {guide.title}
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

          {/* Quick info toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200/60 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-slate-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#b45309]" /> {guide.estimatedTime}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Layers className="w-4 h-4 text-[#0369a1]" /> Plataforma: <strong>{guide.platform}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={guide.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#b45309] hover:bg-[#92400e] text-white font-bold flex items-center gap-1.5 shadow-sm transition-all text-xs"
              >
                Abrir {guide.platform}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onToggleComplete(guide.id)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all text-xs ${
                  isCompleted
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {isCompleted ? 'Completada' : 'Marcar como completada'}
              </button>
            </div>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. FUNDAMENTO TEÓRICO */}
          <section className="liquid-glass-card rounded-2xl p-5 border border-white/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-[#0369a1]" /> Fundamentación Teórica y Cartográfica
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              {guide.theoreticalFoundation}
            </p>
          </section>

          {/* 2. PROCEDIMIENTO SECUENCIAL (6 PASOS) */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#15803d]" /> Procedimiento Metodológico en 6 Pasos
              </h3>
              <span className="text-xs text-slate-500 font-medium">Paso {activeStepTab} de 6</span>
            </div>

            {/* Step Pills Selector */}
            <div className="grid grid-cols-6 gap-1.5 mb-4">
              {guide.sequentialSteps.map((step) => (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepTab(step.stepNumber)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border ${
                    activeStepTab === step.stepNumber
                      ? 'bg-[#15803d] text-white border-[#15803d] shadow-sm'
                      : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Paso {step.stepNumber}
                </button>
              ))}
            </div>

            {/* Active Step Card */}
            {(() => {
              const currentStep = guide.sequentialSteps.find((s) => s.stepNumber === activeStepTab) || guide.sequentialSteps[0];
              return (
                <div className="liquid-glass rounded-2xl p-5 border border-white/90 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-extrabold text-slate-900">
                      Paso {currentStep.stepNumber}: {currentStep.title}
                    </h4>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentStep.instruction}
                  </p>

                  {/* Technical Tip in Paramo Orange */}
                  <div className="bg-[#b45309]/10 border border-[#b45309]/30 rounded-xl p-3.5 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#b45309] uppercase tracking-wider block mb-0.5">
                        Tip Técnico SIG:
                      </span>
                      <p className="text-xs text-amber-950 leading-relaxed font-medium">
                        {currentStep.technicalTip}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/50 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Herramientas aplicadas:</span>
                    {currentStep.toolsUsed.map((tool, idx) => (
                      <span key={idx} className="bg-white/70 px-2 py-0.5 rounded-md border border-slate-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </section>

          {/* 3. GLOSARIO TÉCNICO INTERACTIVO (6 TÉRMINOS) */}
          <section className="liquid-glass-card rounded-2xl p-5 border border-white/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#b45309]" /> Glosario Técnico Interactivo (6 Términos Clave)
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Haga clic sobre cada término para desplegar su definición epistemológica y su aplicación práctica en el territorio ecuatoriano.
            </p>

            <div className="space-y-2">
              {guide.glossaryTerms.map((term, idx) => {
                const isExpanded = expandedGlossary === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-slate-200/70 rounded-xl bg-white/70 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleGlossaryItem(idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-3 hover:bg-white/90 transition-colors"
                    >
                      <span className="font-bold text-slate-800 text-xs md:text-sm">
                        {idx + 1}. {term.term}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#b45309]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 pt-1 text-xs border-t border-slate-100 bg-amber-50/20 space-y-2">
                        <p className="text-slate-700 leading-relaxed">
                          <strong className="text-slate-900">Definición:</strong> {term.definition}
                        </p>
                        <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-900">
                          <strong>Aplicación en Ecuador:</strong> {term.practicalApplication}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. PRODUCTO FINAL ESPERADO */}
          <section className="liquid-glass-card rounded-2xl p-5 border border-white/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-[#15803d]" /> Producto Final Esperado por el Estudiante
            </h3>
            <h4 className="font-bold text-slate-900 text-sm mb-1">{guide.expectedProduct.type}</h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {guide.expectedProduct.description}
            </p>
            <div className="bg-white/80 rounded-xl p-3 border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-1.5">Entregables específicos obligatorios:</span>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                {guide.expectedProduct.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 5. RÚBRICA DE EVALUACIÓN FORMATIVA */}
          <section className="liquid-glass-card rounded-2xl p-5 border border-white/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#0369a1]" /> Rúbrica de Desempeño Analítico-Espacial
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/60 text-slate-700">
                    <th className="p-2.5 font-bold">Criterio (Peso)</th>
                    <th className="p-2.5 font-bold">Inicial (1-2 pts)</th>
                    <th className="p-2.5 font-bold">En Desarrollo (3 pts)</th>
                    <th className="p-2.5 font-bold">Competente (4 pts)</th>
                    <th className="p-2.5 font-bold text-[#15803d]">Avanzado (5 pts)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {guide.rubrics.map((r, idx) => (
                    <tr key={idx} className="hover:bg-white/50">
                      <td className="p-2.5 font-bold text-slate-900 align-top">
                        {r.criterion} <span className="text-slate-500 font-normal">({r.weight})</span>
                      </td>
                      <td className="p-2.5 text-slate-600 align-top">{r.levels.inicial}</td>
                      <td className="p-2.5 text-slate-600 align-top">{r.levels.enDesarrollo}</td>
                      <td className="p-2.5 text-slate-700 font-medium align-top">{r.levels.competente}</td>
                      <td className="p-2.5 text-[#15803d] font-semibold bg-emerald-50/30 align-top">{r.levels.avanzado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-white/70 border-t border-white/60 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            BIOSIG Ecuador · Módulo de Prácticas Constructivistas
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Imprimir Hoja
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
