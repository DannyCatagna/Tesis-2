import React, { useState } from 'react';
import { DIDACTIC_GUIDES } from '../data/guides';
import { FORMATIVE_QUIZ } from '../data/quizData';
import { 
  CheckCircle2, 
  Circle, 
  Award, 
  FileText, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  Check, 
  X, 
  Layers, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';

interface TabEvaluacionProps {
  completedGuideIds: string[];
  onToggleGuideComplete: (guideId: string) => void;
  onOpenGuideModal: (guideId: string) => void;
}

export const TabEvaluacion: React.FC<TabEvaluacionProps> = ({
  completedGuideIds,
  onToggleGuideComplete,
  onOpenGuideModal,
}) => {
  const [activeSubView, setActiveSubView] = useState<'rastreador' | 'quiz' | 'rubricas'>('rastreador');
  
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const completedCount = completedGuideIds.length;
  const totalCount = DIDACTIC_GUIDES.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Handle quiz option selection
  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  // Calculate score
  const score = FORMATIVE_QUIZ.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER WITH PROGRESS BAR */}
      <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b45309]">
                Monitoreo Formativo Constructivista
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-semibold text-slate-500">Evaluación de Competencias SIG</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Seguimiento de Aprendizaje y Evaluación Espacial
            </h2>
          </div>

          {/* Quick Score Badge */}
          <div className="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm flex items-center gap-4 shrink-0">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Progreso Global</span>
              <span className="text-2xl font-black text-[#15803d]">
                {completedCount} <span className="text-sm font-semibold text-slate-400">/ {totalCount}</span>
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Completitud</span>
              <span className="text-2xl font-black text-[#0369a1]">{progressPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Progress Bar with Liquid Glass Accents */}
        <div>
          <div className="w-full bg-slate-200/80 rounded-full h-3.5 overflow-hidden p-0.5 border border-white/80">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#15803d] via-[#0369a1] to-[#b45309]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 mt-2 font-medium">
            <span>{completedCount === 4 ? '¡Todas las prácticas completadas!' : 'Continúa desarrollando las hojas de trabajo para consolidar el portafolio'}</span>
            <span>{completedCount} de 4 Hojas de Trabajo</span>
          </div>
        </div>

        {/* Sub-view selector tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
          <button
            onClick={() => setActiveSubView('rastreador')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeSubView === 'rastreador'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white/70 hover:bg-white text-slate-700'
            }`}
          >
            Hojas de Trabajo ({completedCount}/4)
          </button>
          <button
            onClick={() => setActiveSubView('quiz')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeSubView === 'quiz'
                ? 'bg-[#b45309] text-white shadow-sm'
                : 'bg-white/70 hover:bg-white text-slate-700'
            }`}
          >
            Cuestionario Espacial Práctico
          </button>
          <button
            onClick={() => setActiveSubView('rubricas')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeSubView === 'rubricas'
                ? 'bg-[#0369a1] text-white shadow-sm'
                : 'bg-white/70 hover:bg-white text-slate-700'
            }`}
          >
            Rúbricas de Desempeño
          </button>
        </div>
      </div>

      {/* VIEW 1: RASTREADOR DE HOJAS DE TRABAJO */}
      {activeSubView === 'rastreador' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Estado de las 4 Prácticas Geográficas
            </h3>
            <span className="text-xs text-slate-500">Persistido en almacenamiento local del navegador</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DIDACTIC_GUIDES.map((guide) => {
              const isDone = completedGuideIds.includes(guide.id);
              return (
                <div 
                  key={guide.id}
                  className={`liquid-glass-card rounded-2xl p-5 border transition-all ${
                    isDone ? 'border-emerald-300 bg-emerald-50/20 shadow-sm' : 'border-white/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          guide.unitId === 'unidad-2' ? 'bg-[#15803d] text-white' : 'bg-[#0369a1] text-white'
                        }`}>
                          Práctica {guide.number}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{guide.platform}</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1 leading-snug">
                        {guide.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => onToggleGuideComplete(guide.id)}
                      className="p-1 rounded-full transition-transform active:scale-95"
                      title={isDone ? 'Marcar como pendiente' : 'Marcar como completada'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 hover:text-slate-500" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {guide.theoreticalFoundation}
                  </p>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenGuideModal(guide.id)}
                        className="text-xs font-bold text-slate-900 hover:text-[#b45309] flex items-center gap-1 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Ver Hoja
                      </button>
                      <span className="text-slate-300">·</span>
                      <button
                        onClick={() => onOpenGuideModal(guide.id)}
                        className="text-xs font-bold text-[#b45309] hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Revisar con IA
                      </button>
                    </div>

                    <button
                      onClick={() => onToggleGuideComplete(guide.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isDone
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      {isDone ? 'Completada ✓' : 'Marcar completada'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: CUESTIONARIO ESPACIAL PRÁCTICO */}
      {activeSubView === 'quiz' && (
        <div className="space-y-6">
          <div className="liquid-glass-card rounded-2xl p-5 border border-white/80 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Evaluación Formativa de Razonamiento Geoespacial
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                4 preguntas basadas en escenarios reales del territorio ecuatoriano, proyecciones UTM y marco legal ambiental.
              </p>
            </div>

            {isQuizSubmitted && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Puntaje</span>
                  <span className="text-lg font-black text-[#15803d]">{score} / {FORMATIVE_QUIZ.length} correctas</span>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reintentar
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {FORMATIVE_QUIZ.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className="liquid-glass rounded-2xl p-6 border border-white/90 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0369a1]">
                        Pregunta {qIdx + 1} de {FORMATIVE_QUIZ.length}
                      </span>
                      <h4 className="text-sm md:text-base font-extrabold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                      <p className="text-xs text-slate-500 italic">
                        {q.context}
                      </p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      let optionClasses = 'bg-white/80 hover:bg-white text-slate-700 border-slate-200';

                      if (isQuizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionClasses = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                        } else if (isOptionSelected) {
                          optionClasses = 'bg-rose-100 text-rose-900 border-rose-400 font-bold';
                        } else {
                          optionClasses = 'bg-white/50 text-slate-400 border-slate-100';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = 'bg-[#0369a1] text-white border-[#0369a1] font-bold shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={isQuizSubmitted}
                          className={`w-full p-3.5 text-left rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${optionClasses}`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </span>

                          {isQuizSubmitted && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                          )}
                          {isQuizSubmitted && isOptionSelected && optIdx !== q.correctIndex && (
                            <X className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback on submit */}
                  {isQuizSubmitted && (
                    <div className={`p-4 rounded-xl text-xs leading-relaxed ${
                      isCorrect 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                        : 'bg-amber-50 border border-amber-200 text-amber-950'
                    }`}>
                      <strong className="block mb-1">
                        {isCorrect ? 'Retroalimentación Pedagógica:' : 'Explicación Formativa:'}
                      </strong>
                      {q.feedback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isQuizSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < FORMATIVE_QUIZ.length}
                className="px-6 py-3 rounded-2xl bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all"
              >
                Calificar Respuestas y Ver Retroalimentación
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: RÚBRICAS GLOBALES DE DESEMPEÑO */}
      {activeSubView === 'rubricas' && (
        <div className="space-y-4">
          <div className="liquid-glass-card rounded-2xl p-5 border border-white/80">
            <h3 className="text-base font-extrabold text-slate-900">
              Marco de Evaluación por Competencias Analítico-Espaciales
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Los productos finales de las Hojas de Trabajo se evalúan bajo cuatro dimensiones holísticas establecidas por el sílabo:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="liquid-glass rounded-2xl p-5 border border-white/90 space-y-2">
              <span className="text-xs font-black uppercase text-[#15803d] tracking-wider block">
                1. Rigor Cartográfico y Geodésico (25%)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Dominio de sistemas de referencia geocéntricos (SIRGAS-Ecuador / WGS84 UTM 17S/18S), precisión métrica en polígonos, ausencia de autointersecciones y jerarquía visual en composiciones de mapa.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-5 border border-white/90 space-y-2">
              <span className="text-xs font-black uppercase text-[#0369a1] tracking-wider block">
                2. Interpretación Ecológica y Bioclimática (30%)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Capacidad de correlacionar perfiles altimétricos, pisos zoogeográficos y gradientes de temperatura con la delimitación real del nicho ecológico de especies amenazadas o endémicas.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-5 border border-white/90 space-y-2">
              <span className="text-xs font-black uppercase text-[#b45309] tracking-wider block">
                3. Operaciones de Geoprocesamiento y Buffers (25%)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Aplicación correcta de análisis de superposición booleana (Overlay), cálculo numérico de hectáreas fragmentadas y zonificación concéntrica de zonas de amortiguamiento.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-5 border border-white/90 space-y-2">
              <span className="text-xs font-black uppercase text-slate-800 tracking-wider block">
                4. Sustento Jurídico y Propuesta Territorial (20%)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Articulación de los diagnósticos cartográficos con los Derechos de la Naturaleza (Art. 71-74 CE), el Código Orgánico del Ambiente (COA) y la gobernanza comunitaria con pueblos ancestrales.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
