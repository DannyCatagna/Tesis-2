import { LEARNING_RUBRIC, LEARNING_RUBRIC_TITLE, LEARNING_RUBRIC_SCOPE } from '../data/learningRubric';
import React, { useState } from 'react';
import { DIDACTIC_GUIDES } from '../data/guides';
import { FORMATIVE_QUIZ } from '../data/quizData';
import { 
  CheckCircle2, 
  Circle, 
  Award, 
  FileText, 
  RotateCcw, 
  ClipboardCheck, 
  HelpCircle, 
  Check, 
  X, 
  Layers, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
  BookMarked,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  Compass,
  FileDown
} from 'lucide-react';
import { GenerarPdfModal } from './GenerarPdfModal';

interface TabEvaluacionProps {
  completedGuideIds: string[];
  onToggleGuideComplete: (guideId: string) => void;
  onOpenGuideModal: (guideId: string) => void;
}

interface AIReviewResult {
  overallScore: number;
  performanceLevel: string;
  executiveSummary: string;
  rubricBreakdown: {
    criterion: string;
    weight: string;
    score: number;
    level: string;
    feedback: string;
    recommendation: string;
  }[];
  scientificStrengths: string[];
  technicalOmissions: string[];
}

interface ScientificArticle {
  id: string;
  title: string;
  authors: string;
  journal: string;
  pubYear: string;
  url: string;
}

export const TabEvaluacion: React.FC<TabEvaluacionProps> = ({
  completedGuideIds,
  onToggleGuideComplete,
  onOpenGuideModal,
}) => {
  const [activeSubView, setActiveSubView] = useState<'rastreador' | 'auditoria-ia' | 'quiz' | 'rubricas'>('rastreador');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // AI Evaluation Subview State
  const [selectedGuideForAI, setSelectedGuideForAI] = useState<string>('guia-1');
  const [studyArea, setStudyArea] = useState<string>('');
  const [coordinatesOrDatum, setCoordinatesOrDatum] = useState<string>('');
  const [methodologySummary, setMethodologySummary] = useState<string>('');
  const [speciesOrThreats, setSpeciesOrThreats] = useState<string>('');
  const [spatialFindings, setSpatialFindings] = useState<string>('');
  const [conservationProposal, setConservationProposal] = useState<string>('');

  const [isSubmittingAI, setIsSubmittingAI] = useState<boolean>(false);
  const [aiReviewResult, setAiReviewResult] = useState<AIReviewResult | null>(null);
  const [scientificArticles, setScientificArticles] = useState<ScientificArticle[]>([]);
  const [aiError, setAiError] = useState<string | null>(null);

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

  // Populate reference sample data for selected guide
  const handleLoadSampleDataForSelectedGuide = (guideId: string) => {
    if (guideId === 'guia-1') {
      setStudyArea('Parque Nacional Podocarpus (Loja / Zamora Chinchipe)');
      setCoordinatesOrDatum('Ecuador; ubicación del lugar en el mapa y fuente consultada');
      setMethodologySummary('Se trazó un transecto altitudinal de 28 km desde la cuenca del río Zamora hasta los páramos del Compadre. Se superpusieron registros de presencia de Podocarpus sprucei y Tremarctos ornatus en formato KML.');
      setSpeciesOrThreats('Romerillo azuceno (Podocarpus sprucei), Oso de anteojos (Tremarctos ornatus) y Tapir andino (Tapirus pinchaque). Amenaza por minería aluvial.');
      setSpatialFindings('El perfil de elevación mostró una pendiente media del 38%. Se identificaron 12.450 hectáreas de nicho ecológico óptimo en el bosque nublado.');
      setConservationProposal('Creación de una zona de amortiguamiento comunitaria bajo el Art. 71 de la Constitución y el Código Orgánico del Ambiente (COA), con incentivos de Socio Bosque.');
    } else if (guideId === 'guia-2') {
      setStudyArea('Bloque 16 y Parque Nacional Yasuní (Orellana)');
      setCoordinatesOrDatum('Ecuador; ubicación del lugar en el mapa y fuente consultada');
      setMethodologySummary('Análisis multitemporal de 10 años (agosto 2014 a agosto 2024) utilizando producto True Color y la capa Fires and Thermal Anomalies en NASA Worldview.');
      setSpeciesOrThreats('Jaguar (Panthera onca) y delfín rosado (Inia geoffrensis). Amenaza por carreteras de penetración petrolera y focos de calor por quemas.');
      setSpatialFindings('Se documentó un avance en espina de pescado de 14.2 km a lo largo del eje vial primario, registrándose 28 anomalías térmicas.');
      setConservationProposal('Reforzar el control de la Zona Intangible Tagaeri-Taromenane con monitoreo satelital diario y aplicación del régimen sancionatorio del COA.');
    } else if (guideId === 'guia-3') {
      setStudyArea('Reserva Ecológica Manglares Churute (Guayas)');
      setCoordinatesOrDatum('Ecuador; ubicación del lugar en el mapa y fuente consultada');
      setMethodologySummary('Carga de la capa oficial SNAP_2023 y superposición con el mapa de ecosistemas continentales y división cantonal de Naranjal.');
      setSpeciesOrThreats('Canclón (Anhima cornuta) y Cocodrilo de la Costa (Crocodylus acutus). Presión por piscinas camaroneras ilegales.');
      setSpatialFindings('La reserva protege 49.383 ha, pero se detectó un vacío de conservación (gap) de 3.200 ha de manglar relicto adyacente sin protección formal.');
      setConservationProposal('Incorporación del polígono adyacente como Área Protegida Comunitaria bajo el subsistema del SNAP previsto en el Código Orgánico del Ambiente.');
    } else {
      setStudyArea('Zona de Amortiguamiento Parque Nacional Cotopaxi');
      setCoordinatesOrDatum('Ecuador; ubicación del lugar en el mapa y fuente consultada');
      setMethodologySummary('Cálculo de buffers concéntricos de 2 km y 5 km alrededor del polígono del parque. Extracción de capas de caminos vecinales y uso del suelo en OSM.');
      setSpeciesOrThreats('Cóndor andino (Vultur gryphus) y lobo de páramo (Lycalopex culpaeus). Conflicto por avance de ganado asilvestrado y quemas.');
      setSpatialFindings('El buffer de 2 km abarca 18.600 ha, de las cuales 34% presentan uso agropecuario activo que interrumpe el pajonal nativo.');
      setConservationProposal('Acuerdos de manejo participativo con las comunas locales para cercado eléctrico de protección y transición hacia ecoturismo comunitario.');
    }
  };

  // Submit to AI review API
  const handleReviewWithAI = async () => {
    const currentGuide = DIDACTIC_GUIDES.find(g => g.id === selectedGuideForAI) || DIDACTIC_GUIDES[0];
    setIsSubmittingAI(true);
    setAiError(null);

    try {
      const response = await fetch('/api/review-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId: currentGuide.id,
          guideNumber: currentGuide.number,
          guideTitle: currentGuide.title,
          unitTitle: currentGuide.unitTitle,
          platform: currentGuide.platform,
          submission: {
            studyArea,
            coordinatesOrDatum,
            methodologySummary,
            speciesOrThreatsAnalyzed: speciesOrThreats,
            spatialFindings,
            conservationProposal,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor de validación: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.review) {
        setAiReviewResult(data.review);
        setScientificArticles(data.scientificArticles || []);
      } else {
        throw new Error('Respuesta no válida del sistema de revisión.');
      }
    } catch (err: any) {
      console.error('Validation error:', err);
      setAiError(err.message || 'Error al conectar con el servicio de revisión docente');
    } finally {
      setIsSubmittingAI(false);
    }
  };

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
              Seguimiento del aprendizaje en Química y Biología
            </h2>
          </div>

          {/* Action buttons and Quick Score Badge */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Generar y descargar resumen oficial de prácticas en formato PDF"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Resumen PDF</span>
            </button>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-white/90 shadow-sm flex items-center gap-3">
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Progreso</span>
                <span className="text-xl font-black text-[#15803d]">
                  {completedCount} <span className="text-xs font-semibold text-slate-400">/ {totalCount}</span>
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Completitud</span>
                <span className="text-xl font-black text-[#0369a1]">{progressPercentage}%</span>
              </div>
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
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
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
            onClick={() => setActiveSubView('auditoria-ia')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeSubView === 'auditoria-ia'
                ? 'bg-[#15803d] text-white shadow-sm'
                : 'bg-white/70 hover:bg-white text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Revisión de Guías con IA
          </button>

          <button
            onClick={() => setActiveSubView('quiz')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeSubView === 'quiz'
                ? 'bg-[#b45309] text-white shadow-sm'
                : 'bg-white/70 hover:bg-white text-slate-700'
            }`}
          >
            Cuestionario de comprensión ambiental
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Estado de las 4 actividades de aprendizaje
              </h3>
              <span className="text-xs text-slate-500">Persistido en almacenamiento local del navegador</span>
            </div>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 hover:border-[#15803d] text-stone-700 hover:text-[#15803d] text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-[#15803d]" />
              <span>Exportar Resumen PDF ({completedCount}/4)</span>
            </button>
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
                        onClick={() => {
                          setSelectedGuideForAI(guide.id);
                          handleLoadSampleDataForSelectedGuide(guide.id);
                          setActiveSubView('auditoria-ia');
                        }}
                        className="text-xs font-bold text-[#15803d] hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Revisar con IA
                      </button>
                    </div>

                    <button
                      onClick={() => onToggleGuideComplete(guide.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {isDone ? 'Completada' : 'Marcar como completada'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: REVISIÓN DE GUÍAS CON IA (TRIBUNAL DOCENTE) */}
      {activeSubView === 'auditoria-ia' && (
        <div className="space-y-6">
          <div className="liquid-glass rounded-2xl p-6 border border-white/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                  <span className="font-bold text-[#15803d] uppercase">TRIBUNAL DOCENTE INTELIGENTE</span>
                  <span>·</span>
                  <span>Revisión Formativa Automatizada con IA</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900">
                  Dictamen Académico y Calificación de Guías Prácticas
                </h3>
              </div>

              {/* Guide Selector Pill buttons */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {DIDACTIC_GUIDES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSelectedGuideForAI(g.id);
                      handleLoadSampleDataForSelectedGuide(g.id);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedGuideForAI === g.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Guía {g.number}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              La revisión asistida por IA ofrece retroalimentación orientativa sobre lectura básica del mapa (25%), comprensión química y biológica (30%), evidencias y fuentes (25%) y propuesta educativa (20%). No sustituye la valoración del docente ni exige cartografía especializada.
            </p>

            {/* Quick pre-fill button */}
            <div className="flex justify-end">
              <button
                onClick={() => handleLoadSampleDataForSelectedGuide(selectedGuideForAI)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
              >
                <span>Cargar Caso de Estudio de Campo de la Guía {DIDACTIC_GUIDES.find(g => g.id === selectedGuideForAI)?.number}</span>
              </button>
            </div>

            {/* Submission Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  1. Lugar o área protegida estudiada:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Parque Nacional Yasuní / Podocarpus"
                  value={studyArea}
                  onChange={(e) => setStudyArea(e.target.value)}
                  className="w-full bg-white rounded-lg p-2.5 border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  2. Ubicación del lugar y mapa consultado:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Cotopaxi, Ecuador; mapa OpenStreetMap consultado en BIOSIG"
                  value={coordinatesOrDatum}
                  onChange={(e) => setCoordinatesOrDatum(e.target.value)}
                  className="w-full bg-white rounded-lg p-2.5 border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">
                  3. Especies Amenazadas o Factores de Presión:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Tremarctos ornatus, minería aluvial, deforestación en espina de pescado"
                  value={speciesOrThreats}
                  onChange={(e) => setSpeciesOrThreats(e.target.value)}
                  className="w-full bg-white rounded-lg p-2.5 border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">
                  4. Resumen Metodológico del Estudiante:
                </label>
                <textarea
                  rows={2}
                  placeholder="Explica qué observaste, qué fuentes consultaste y cómo comparaste la información..."
                  value={methodologySummary}
                  onChange={(e) => setMethodologySummary(e.target.value)}
                  className="w-full bg-white rounded-lg p-2.5 border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-600 resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">
                  5. Observaciones y explicaciones sobre el ecosistema:
                </label>
                <textarea
                  rows={2}
                  placeholder="Relaciona agua, suelo, temperatura o vegetación con los seres vivos. Indica tus fuentes..."
                  value={spatialFindings}
                  onChange={(e) => setSpatialFindings(e.target.value)}
                  className="w-full bg-white rounded-lg p-2.5 border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-600 resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">
                  6. Propuesta educativa y cuidado del entorno:
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe una actividad de aula: propósito, pasos y cómo valorar lo aprendido..."
                  value={conservationProposal}
                  onChange={(e) => setConservationProposal(e.target.value)}
                  className="w-full bg-white rounded-lg p-2.5 border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-600 resize-none"
                />
              </div>
            </div>

            {aiError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleReviewWithAI}
                disabled={isSubmittingAI || !studyArea}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                {isSubmittingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    Evaluando entrega y verificando literatura científica...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Revisar Guía con IA y Calificar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Review Results Display */}
          {aiReviewResult && (
            <div className="liquid-glass rounded-2xl p-6 border border-white/90 space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                    <span className="font-bold text-slate-900 uppercase">DICTAMEN DOCENTE FORMAL</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      NIVEL: {aiReviewResult.performanceLevel.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-950">
                    Acta Oficial de Calificación de la Guía {DIDACTIC_GUIDES.find(g => g.id === selectedGuideForAI)?.number}
                  </h4>
                </div>

                <div className="text-right bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Puntaje Obtenido</span>
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    {aiReviewResult.overallScore} <span className="text-sm font-bold text-slate-400">/ 20</span>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs md:text-sm text-slate-800 leading-relaxed">
                <strong className="text-slate-900 block mb-1 font-mono uppercase text-xs">Evaluación General:</strong>
                {aiReviewResult.executiveSummary}
              </div>

              {/* Rubric Breakdown Grid */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Retroalimentación por criterio de aprendizaje:
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiReviewResult.rubricBreakdown.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-900">{item.criterion}</span>
                        <span className="font-mono text-slate-700 font-bold text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                          {item.score} pts ({item.weight})
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {item.feedback}
                      </p>
                      <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-200 text-slate-800 text-[11px]">
                        <strong>Recomendación pedagógica:</strong> {item.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths and Omissions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-emerald-800 block text-xs">Aciertos en la explicación científica:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {aiReviewResult.scientificStrengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-amber-800 block text-xs">Aspectos a Subsanar:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {aiReviewResult.technicalOmissions.map((om, idx) => (
                      <li key={idx}>{om}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Scientific Articles */}
              {scientificArticles.length > 0 && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-[#0369a1]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Literatura Científica Indexada de Contraste (Europe PMC / NCBI)
                    </span>
                  </div>

                  <div className="space-y-2">
                    {scientificArticles.map((art) => (
                      <div key={art.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3">
                        <div>
                          <h6 className="font-bold text-slate-900">{art.title}</h6>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {art.authors} · <em>{art.journal}</em> ({art.pubYear})
                          </p>
                        </div>
                        <a
                          href={art.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors"
                        >
                          Ver Paper
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action: Approve Worksheet */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onToggleGuideComplete(selectedGuideForAI)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-sm ${
                    completedGuideIds.includes(selectedGuideForAI)
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#15803d] hover:bg-[#166534] text-white'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {completedGuideIds.includes(selectedGuideForAI)
                    ? 'Hoja de Trabajo Registrada en Portafolio'
                    : 'Aprobar Hoja de Trabajo y Guardar en Portafolio'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: CUESTIONARIO ESPACIAL FORMATIVO */}
      {activeSubView === 'quiz' && (
        <div className="space-y-6">
          <div className="liquid-glass rounded-2xl p-6 border border-white/80 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/60 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#b45309]">
                  Evaluación Formativa Continua
                </span>
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mt-0.5">
                  Cuestionario Diagnóstico sobre SIG, Biodiversidad y Normativa
                </h3>
              </div>

              {isQuizSubmitted && (
                <div className="flex items-center gap-3 bg-white/90 p-3 rounded-xl border border-slate-200 shadow-sm">
                  <Award className="w-5 h-5 text-[#15803d]" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Puntaje Obtenido</span>
                    <span className="text-lg font-black text-slate-900">
                      {score} / {FORMATIVE_QUIZ.length} correctas
                    </span>
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors ml-2"
                    title="Reiniciar Cuestionario"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {FORMATIVE_QUIZ.map((q, idx) => {
                const selectedOption = selectedAnswers[q.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = isAnswered && selectedOption === q.correctIndex;

                return (
                  <div 
                    key={q.id}
                    className="p-5 rounded-2xl bg-white/60 border border-slate-200/80 space-y-3 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-1 pl-8">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selectedOption === optIdx;
                        let optionStyle = 'bg-white/80 hover:bg-white text-slate-800 border-slate-200';

                        if (isQuizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-semibold';
                          } else if (isThisSelected) {
                            optionStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                          } else {
                            optionStyle = 'bg-slate-50 opacity-60 border-slate-200 text-slate-500';
                          }
                        } else if (isThisSelected) {
                          optionStyle = 'bg-slate-900 text-white border-slate-900 font-semibold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            disabled={isQuizSubmitted}
                            className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isQuizSubmitted && optIdx === q.correctIndex && (
                              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                            )}
                            {isQuizSubmitted && isThisSelected && optIdx !== q.correctIndex && (
                              <X className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700 space-y-1 ml-8">
                        <span className="font-bold text-slate-900 block flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#0369a1]" /> Retroalimentación Pedagógica:
                        </span>
                        <p className="leading-relaxed">{q.feedback}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!isQuizSubmitted && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < FORMATIVE_QUIZ.length}
                  className="px-6 py-3 rounded-xl bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Enviar Respuestas y Calificar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shared formative rubric for future Chemistry and Biology teachers. */}
      {activeSubView === 'rubricas' && (
        <section aria-labelledby="learning-rubric-title" className="liquid-glass rounded-2xl p-6 md:p-8 border border-white/80 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0369a1]">Evaluación formativa · Química y Biología</span>
            <h3 id="learning-rubric-title" className="text-xl font-extrabold text-slate-900 mt-1">{LEARNING_RUBRIC_TITLE}</h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">{LEARNING_RUBRIC_SCOPE}</p>
            <p className="text-sm text-slate-600 mt-2">Ponderación total: 100%. Esta propuesta orienta la retroalimentación y requiere validación docente; no constituye una rúbrica institucional aprobada.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEARNING_RUBRIC.map((criterion, index) => (
              <article key={criterion.criterion} className="bg-white rounded-xl p-5 border border-stone-200 space-y-3">
                <h4 className="text-base font-bold text-[#166534]">{index + 1}. {criterion.criterion} ({criterion.weight})</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{criterion.description}</p>
                <p className="text-sm bg-emerald-50 rounded-lg p-3 text-emerald-950"><strong>Ejemplo de evidencia:</strong> {criterion.example}</p>
                <details className="text-sm text-slate-700">
                  <summary className="cursor-pointer font-semibold py-2">Ver niveles de desempeño</summary>
                  <dl className="space-y-3 mt-2">
                    {([{ key: 'inicial', label: 'Inicial' }, { key: 'enDesarrollo', label: 'En desarrollo' }, { key: 'competente', label: 'Competente' }, { key: 'avanzado', label: 'Avanzado' }] as const).map(level => (
                      <div key={level.key}><dt className="font-bold">{level.label}</dt><dd className="leading-relaxed">{criterion.levels[level.key]}</dd></div>
                    ))}
                  </dl>
                </details>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* MODAL PARA GENERAR Y DESCARGAR RESUMEN EN PDF */}
      <GenerarPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        completedGuideIds={completedGuideIds}
      />
    </div>
  );
};
