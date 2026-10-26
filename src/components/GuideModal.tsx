import React, { useState } from 'react';
import { DidacticGuide } from '../types';
import { Thematic3DViewer, Thematic3DType } from './Thematic3DViewer';
import { 
  X, 
  ExternalLink, 
  Clock, 
  BookOpen, 
  Layers, 
  Lightbulb, 
  CheckCircle, 
  Award, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  ClipboardCheck,
  Send,
  Loader2,
  AlertCircle,
  BookMarked,
  Check,
  RotateCcw,
  Calculator,
  HelpCircle,
  ShieldAlert,
  GraduationCap,
  Eye,
  Info,
  FileText,
  Compass,
  Sparkles,
  Mountain
} from 'lucide-react';

interface GuideModalProps {
  guide: DidacticGuide | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (guideId: string) => void;
  onNavigateMapArea?: (areaId: string) => void;
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
  literatureKeywords?: string[];
}

interface ScientificArticle {
  id: string;
  title: string;
  authors: string;
  journal: string;
  pubYear: string;
  url: string;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  guide,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  onNavigateMapArea,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'procedimiento' | 'escena-3d' | 'ia-revision'>('procedimiento');
  const [expandedGlossary, setExpandedGlossary] = useState<number | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  // Review form state
  const [studyArea, setStudyArea] = useState<string>('');
  const [coordinatesOrDatum, setCoordinatesOrDatum] = useState<string>('');
  const [methodologySummary, setMethodologySummary] = useState<string>('');
  const [speciesOrThreats, setSpeciesOrThreats] = useState<string>('');
  const [spatialFindings, setSpatialFindings] = useState<string>('');
  const [conservationProposal, setConservationProposal] = useState<string>('');

  // Review Status
  const [isSubmittingAI, setIsSubmittingAI] = useState<boolean>(false);
  const [aiReviewResult, setAiReviewResult] = useState<AIReviewResult | null>(null);
  const [scientificArticles, setScientificArticles] = useState<ScientificArticle[]>([]);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!isOpen || !guide) return null;

  const toggleGlossaryItem = (idx: number) => {
    setExpandedGlossary(expandedGlossary === idx ? null : idx);
  };

  const toggleQuestionItem = (idx: number) => {
    setExpandedQuestion(expandedQuestion === idx ? null : idx);
  };

  const handlePrint = () => {
    window.print();
  };

  // Populate reference case data
  const handleLoadSampleData = () => {
    if (guide.id === 'guia-1') {
      setStudyArea('Parque Nacional Podocarpus (Loja / Zamora Chinchipe)');
      setCoordinatesOrDatum('Ecuador; ubicación del lugar en el mapa y fuente consultada');
      setMethodologySummary('Se trazó un transecto altitudinal de 28 km desde la cuenca del río Zamora hasta los páramos del Compadre. Se superpusieron 14 registros de presencia de Podocarpus sprucei y Tremarctos ornatus exportados en formato KML.');
      setSpeciesOrThreats('Romerillo azuceno (Podocarpus sprucei), Oso de anteojos (Tremarctos ornatus) y Tapir andino (Tapirus pinchaque). Amenaza por minería aluvial en ríos limítrofes.');
      setSpatialFindings('El perfil de elevación mostró una pendiente media del 38%. Se identificaron 12.450 hectáreas de nicho ecológico óptimo en el bosque nublado, pero con un estrangulamiento de 450 metros en el corredor norte debido a pastizales.');
      setConservationProposal('Creación de una zona de amortiguamiento comunitaria bajo el Art. 71 de la Constitución y el Código Orgánico del Ambiente (COA), con incentivos de Socio Bosque para evitar la tala en las cabeceras hídricas.');
    } else if (guide.id === 'guia-2') {
      setStudyArea('Bloque 16 y Parque Nacional Yasuní (Orellana)');
      setCoordinatesOrDatum('Ecuador; ubicación del lugar en el mapa y fuente consultada');
      setMethodologySummary('Análisis multitemporal de 10 años (agosto 2014 a agosto 2024) utilizando producto True Color con <15% de nubosidad y la capa Fires and Thermal Anomalies en NASA Worldview.');
      setSpeciesOrThreats('Jaguar (Panthera onca) y delfín rosado (Inia geoffrensis). Amenaza por carreteras de penetración petrolera y focos de calor por quemas agrícolas en época seca.');
      setSpatialFindings('Se documentó un avance en espina de pescado de 14.2 km a lo largo del eje vial primario, registrándose 28 anomalías térmicas en la franja limítrofe.');
      setConservationProposal('Reforzar el control de la Zona Intangible Tagaeri-Taromenane con monitoreo satelital diario y aplicación del régimen sancionatorio del COA.');
    } else if (guide.id === 'guia-3') {
      setStudyArea('Reserva Ecológica Manglares Churute (Guayas)');
      setCoordinatesOrDatum('Ecuador; ubicación del lugar en el mapa y fuente consultada');
      setMethodologySummary('Carga de la capa oficial SNAP_2023 y superposición con el mapa de ecosistemas continentales y división cantonal de Naranjal y Guayaquil.');
      setSpeciesOrThreats('Canclón (Anhima cornuta) y Cocodrilo de la Costa (Crocodylus acutus). Presión por piscinas camaroneras ilegales.');
      setSpatialFindings('La reserva protege 49.383 ha, pero se detectó un vacío de conservación (gap) de 3.200 ha de manglar relicto adyacente que carece de protección legal formal.');
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

  // Submit to automated review endpoint
  const handleReviewWithAI = async () => {
    setIsSubmittingAI(true);
    setAiError(null);

    try {
      const response = await fetch('/api/review-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId: guide.id,
          guideNumber: guide.number,
          guideTitle: guide.title,
          unitTitle: guide.unitTitle,
          platform: guide.platform,
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
        throw new Error('Respuesta no válida del sistema de validación.');
      }
    } catch (err: any) {
      console.error('Validation error:', err);
      setAiError(err.message || 'Error al conectar con el servicio de validación');
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
      <div 
        className="relative w-full max-w-5xl bg-[#fdfbf7] rounded-xl shadow-2xl border border-stone-300 overflow-hidden max-h-[92vh] flex flex-col text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER - Official Dossier styling */}
        <div className="p-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-1">
                <span className="font-bold text-stone-900 uppercase">PRÁCTICA N° {guide.number}</span>
                <span aria-hidden="true">/</span>
                <span>{guide.unitTitle}</span>
                <span aria-hidden="true">/</span>
                <span className="text-stone-600 font-semibold">{guide.platform}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-stone-950 tracking-tight leading-snug">
                {guide.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors shrink-0"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick info toolbar & Sub-tab switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-stone-200 text-xs">
            {/* Main Tabs: Guía Didáctica vs Modelo 3D vs Validación con IA */}
            <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded">
              <button
                onClick={() => setActiveMainTab('procedimiento')}
                className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeMainTab === 'procedimiento'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Marco Teórico y 6 Fases
              </button>

              <button
                onClick={() => setActiveMainTab('escena-3d')}
                className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeMainTab === 'escena-3d'
                    ? 'bg-[#0369a1] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Mountain className="w-3.5 h-3.5" />
                Escena 3D Territorial
              </button>

              <button
                onClick={() => setActiveMainTab('ia-revision')}
                className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeMainTab === 'ia-revision'
                    ? 'bg-[#15803d] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                Revisión de Guía con IA
                {aiReviewResult && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={guide.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-900 text-white font-medium flex items-center gap-1.5 transition-colors text-xs"
              >
                Acceder a {guide.platform.split(' ')[0]}
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => onToggleComplete(guide.id)}
                className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 border transition-all text-xs ${
                  isCompleted
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {isCompleted ? 'Práctica Registrada' : 'Marcar como Completada'}
              </button>
            </div>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {/* TAB 1: PROCEDIMIENTO METODOLÓGICO Y RÚBRICA */}
          {activeMainTab === 'procedimiento' && (
            <>
              {/* 1. FUNDAMENTACIÓN TEÓRICA Y BIOGEOGRÁFICA */}
              <section className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0369a1]" /> Fundamentación Teórica, Geodésica y Ecológica
                  </h3>
                  <span className="text-[11px] font-mono text-stone-500">
                    Dedicación estimada: {guide.estimatedTime}
                  </span>
                </div>

                <div className="text-xs md:text-sm text-stone-700 leading-relaxed text-justify space-y-3 whitespace-pre-line">
                  {guide.theoreticalFoundation}
                </div>
              </section>

              {/* 2. PRINCIPIOS METODOLÓGICOS Y MARCO ECOLÓGICO */}
              {guide.methodologicalPrinciples && guide.methodologicalPrinciples.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#15803d]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Principios Científicos y Metodológicos Clave:
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {guide.methodologicalPrinciples.map((prin, idx) => (
                      <div key={idx} className="bg-stone-50 rounded-lg p-4 border border-stone-200 space-y-2">
                        <span className="text-xs font-bold text-stone-900 block leading-tight">
                          {idx + 1}. {prin.title}
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed text-justify">
                          {prin.explanation}
                        </p>
                        <div className="pt-2 border-t border-stone-200 text-[10px] text-stone-500 font-mono">
                          Ref: {prin.scientificCitation}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 3. ECUACIONES ESPACIALES Y MÉTRICAS FÍSICO-MATEMÁTICAS */}
              {guide.spatialEquations && guide.spatialEquations.length > 0 && (
                <section className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#b45309]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Ecuaciones Espaciales y Métricas Físico-Matemáticas de la Práctica:
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {guide.spatialEquations.map((eq, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3.5 border border-stone-200 space-y-1.5">
                        <span className="text-xs font-bold text-stone-900 block">{eq.name}</span>
                        <div className="bg-stone-900 text-amber-300 p-2 rounded font-mono text-xs text-center overflow-x-auto">
                          {eq.formula}
                        </div>
                        <p className="text-[11px] text-stone-600 leading-tight">{eq.description}</p>
                        <span className="text-[10px] text-stone-500 font-mono block pt-1 border-t border-stone-100">
                          {eq.variables}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. PREGUNTAS DE REFLEXIÓN CRÍTICA */}
              {guide.reflectionQuestions && guide.reflectionQuestions.length > 0 && (
                <section className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0369a1]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Preguntas Orientadoras de Indagación Científica y Análisis Espacial:
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {guide.reflectionQuestions.map((q, idx) => {
                      const isExpanded = expandedQuestion === idx;
                      return (
                        <div key={idx} className="border border-stone-200 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => toggleQuestionItem(idx)}
                            className="w-full p-3 text-left flex items-start justify-between gap-3 hover:bg-stone-50 transition-colors"
                          >
                            <span className="font-bold text-stone-900 text-xs leading-snug">
                              Pregunta {idx + 1}: {q.question}
                            </span>
                            <span className="text-stone-400 shrink-0 mt-0.5">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </span>
                          </button>

                          {isExpanded && (
                            <div className="p-3 pt-1 text-xs border-t border-stone-100 bg-stone-50 text-stone-800 leading-relaxed">
                              <strong>Orientación Pedagógica:</strong> {q.pedagogicalGuidance}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* 5. DIAGNÓSTICO DE ERRORES COMUNES Y CÓMO EVITARLOS */}
              {guide.commonPitfalls && guide.commonPitfalls.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-stone-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Diagnóstico de Errores Comunes en el Trabajo Práctico:
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {guide.commonPitfalls.map((pit, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                        <span className="font-bold text-stone-900 block leading-tight">
                          · {pit.pitfall}
                        </span>
                        <p className="text-stone-700 leading-snug">
                          <strong>Consecuencia:</strong> {pit.consequence}
                        </p>
                        <div className="p-2 rounded bg-white border border-stone-200 text-stone-800 text-[11px]">
                          <strong>Corrección:</strong> {pit.howToAvoid}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. PROCEDIMIENTO METODOLÓGICO SECUENCIAL EN 6 PASOS */}
              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#15803d]" /> Procedimiento Metodológico Paso a Paso (6 Fases)
                  </h3>
                  <span className="text-xs font-mono text-stone-500 font-semibold">Fase {activeStepTab} de 6</span>
                </div>

                {/* Step Pills Selector */}
                <div className="grid grid-cols-6 gap-1.5">
                  {guide.sequentialSteps.map((step) => (
                    <button
                      key={step.stepNumber}
                      onClick={() => setActiveStepTab(step.stepNumber)}
                      className={`py-2 px-1 text-center rounded text-xs font-bold transition-all border ${
                        activeStepTab === step.stepNumber
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
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
                    <div className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-4">
                      <div className="border-b border-stone-200 pb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803d] font-bold block">
                          FASE OPERATIVA {currentStep.stepNumber}
                        </span>
                        <h4 className="text-base font-bold text-stone-950 leading-snug">
                          {currentStep.title}
                        </h4>
                      </div>

                      {/* 1. Instrucción Detallada */}
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-stone-900 uppercase tracking-wide block">
                          Instrucción de Ejecución:
                        </span>
                        <p className="text-xs md:text-sm text-stone-700 leading-relaxed text-justify">
                          {currentStep.instruction}
                        </p>
                      </div>

                      {/* 2. Fundamento Conceptual y Razón Científica */}
                      {currentStep.conceptualRationale && (
                        <div className="p-3.5 rounded bg-white border border-stone-200 text-xs text-stone-800 space-y-1">
                          <span className="font-bold text-[#0369a1] uppercase tracking-wide block flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5" /> Fundamentación Científica y Razonamiento Espacial:
                          </span>
                          <p className="leading-relaxed text-justify">
                            {currentStep.conceptualRationale}
                          </p>
                        </div>
                      )}

                      {/* 3. Resultado Visual Esperado en Pantalla */}
                      {currentStep.expectedVisualResult && (
                        <div className="p-3.5 rounded bg-white border border-stone-200 text-xs text-stone-800 space-y-1">
                          <span className="font-bold text-[#15803d] uppercase tracking-wide block flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> Resultado Visual Esperado en Pantalla:
                          </span>
                          <p className="leading-relaxed">
                            {currentStep.expectedVisualResult}
                          </p>
                        </div>
                      )}

                      {/* 4. Technical Tip */}
                      <div className="bg-amber-50/70 border border-amber-200 rounded p-3 flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider block mb-0.5">
                            Consejo Técnico Cartográfico:
                          </span>
                          <p className="text-xs text-stone-800 leading-relaxed font-medium">
                            {currentStep.technicalTip}
                          </p>
                        </div>
                      </div>

                      {/* 5. Herramientas Aplicadas */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 text-xs text-stone-600">
                        <span className="font-semibold text-stone-800">Herramientas aplicadas:</span>
                        {currentStep.toolsUsed.map((tool, idx) => (
                          <span key={idx} className="bg-white px-2 py-0.5 rounded border border-stone-200 font-mono text-[11px] text-stone-700">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </section>

              {/* 7. GLOSARIO TÉCNICO INTERACTIVO */}
              <section className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#b45309]" /> Glosario Técnico Interactivo (6 Términos Clave)
                </h3>

                <div className="space-y-2">
                  {guide.glossaryTerms.map((term, idx) => {
                    const isExpanded = expandedGlossary === idx;
                    return (
                      <div 
                        key={idx}
                        className="border border-stone-200 rounded bg-white overflow-hidden"
                      >
                        <button
                          onClick={() => toggleGlossaryItem(idx)}
                          className="w-full p-3 text-left flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
                        >
                          <span className="font-bold text-stone-900 text-xs">
                            {idx + 1}. {term.term}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-stone-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-stone-400" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-3 pt-1 text-xs border-t border-stone-100 bg-stone-50 space-y-2">
                            <p className="text-stone-700 leading-relaxed">
                              <strong className="text-stone-900">Definición:</strong> {term.definition}
                            </p>
                            <div className="p-2 rounded bg-white border border-stone-200 text-stone-800">
                              <strong>Aplicación en Ecuador:</strong> {term.practicalApplication}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 8. PRODUCTO FINAL ESPERADO */}
              <section className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#15803d]" /> Producto Final Esperado por el Estudiante
                </h3>
                <h4 className="font-bold text-stone-950 text-xs md:text-sm">{guide.expectedProduct.type}</h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {guide.expectedProduct.description}
                </p>
                <div className="bg-white rounded p-3 border border-stone-200 mt-2">
                  <span className="text-xs font-bold text-stone-900 block mb-1">Entregables específicos obligatorios:</span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-stone-700">
                    {guide.expectedProduct.deliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 9. RÚBRICA FORMATIVA */}
              <section className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0369a1]" /> Rúbrica de Desempeño Analítico-Espacial
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-100 text-stone-800">
                        <th className="p-2 font-bold">Criterio (Peso)</th>
                        <th className="p-2 font-bold">Inicial (1-2 pts)</th>
                        <th className="p-2 font-bold">En Desarrollo (3 pts)</th>
                        <th className="p-2 font-bold">Competente (4 pts)</th>
                        <th className="p-2 font-bold text-[#15803d]">Avanzado (5 pts)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {guide.rubrics.map((r, idx) => (
                        <tr key={idx} className="hover:bg-white">
                          <td className="p-2 font-bold text-stone-900 align-top">
                            {r.criterion} <span className="text-stone-500 font-normal">({r.weight})</span>
                          </td>
                          <td className="p-2 text-stone-600 align-top">{r.levels.inicial}</td>
                          <td className="p-2 text-stone-600 align-top">{r.levels.enDesarrollo}</td>
                          <td className="p-2 text-stone-700 font-medium align-top">{r.levels.competente}</td>
                          <td className="p-2 text-[#15803d] font-semibold bg-emerald-50/40 align-top">{r.levels.avanzado}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: ESCENA 3D INTERACTIVA DEL TERRITORIO */}
          {activeMainTab === 'escena-3d' && (
            <div className="space-y-4">
              <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
                    <span className="font-bold text-stone-900 uppercase">MODELO DIGITAL 3D</span>
                    <span>·</span>
                    <span>Sistema de Información Geográfica Continental</span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-stone-950">
                    Inspección Geoespacial Tridimensional de la Práctica {guide.number}
                  </h3>
                </div>
                <div className="text-xs text-stone-600 bg-white px-3 py-1.5 rounded border border-stone-200">
                  <span className="font-semibold text-stone-900">Navegación:</span> Clic y arrastre para orbitar la escena · Rueda para zoom
                </div>
              </div>

              <Thematic3DViewer 
                theme={
                  guide.id === 'guia-1' ? 'relief-podocarpus' :
                  guide.id === 'guia-2' ? 'yasuni-amazon' :
                  guide.id === 'guia-3' ? 'mangrove-churute' :
                  'cotopaxi-buffer'
                }
                title={`Modelo 3D: ${guide.title}`}
                subtitle={`Área de Estudio: ${guide.unitTitle} · Herramienta: ${guide.platform}`}
                height="480px"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-[#15803d] uppercase tracking-wider text-[10px] block">
                    Criterio Bioclimático
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    Observe cómo la altitud y la orientación de laderas restringen la distribución de especies y ecosistemas protegidos en el territorio.
                  </p>
                </div>
                <div className="p-3 rounded bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-[#0369a1] uppercase tracking-wider text-[10px] block">
                    Georreferenciación Métrico-Espacial
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    La cuadrícula base representa la proyección UTM (WGS84 SIRGAS-Ecuador), evitando las deformaciones de áreas causadas por coordenadas planas arbitrarias.
                  </p>
                </div>
                <div className="p-3 rounded bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-[#b45309] uppercase tracking-wider text-[10px] block">
                    Interacción con la Práctica
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    Utilice este modelo como referencia visual antes de delimitar polígonos y calcular buffers en {guide.platform}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDITORÍA Y REVISIÓN CON IA (TRIBUNAL DOCENTE) */}
          {activeMainTab === 'ia-revision' && (
            <div className="space-y-6">
              {/* Submission Form Section */}
              <div className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                      CÁTEDRA DE BIOGEOGRAFÍA Y SIG APLICADO · REVISIÓN AUTOMATIZADA CON IA
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-stone-950">
                      Retroalimentación asistida por IA para Química y Biología
                    </h3>
                  </div>

                  <button
                    onClick={handleLoadSampleData}
                    className="px-3 py-1.5 rounded bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <span>Cargar Caso de Estudio de Referencia</span>
                  </button>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Describe tus observaciones, explica las relaciones químicas y biológicas, cita tus fuentes y propone una actividad de aula. La retroalimentación asistida es orientativa y no exige mediciones cartográficas especializadas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-stone-800 block mb-1">
                      1. Lugar o área protegida estudiada:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Parque Nacional Yasuní / Reserva Manglares Churute"
                      value={studyArea}
                      onChange={(e) => setStudyArea(e.target.value)}
                      className="w-full bg-white rounded p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 block mb-1">
                      2. Ubicación del lugar y mapa consultado:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Cotopaxi, Ecuador; mapa OpenStreetMap consultado en BIOSIG / Elevación 2.800 m"
                      value={coordinatesOrDatum}
                      onChange={(e) => setCoordinatesOrDatum(e.target.value)}
                      className="w-full bg-white rounded p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-600"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-stone-800 block mb-1">
                      3. Especies Amenazadas o Factores de Presión:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Tremarctos ornatus (Vulnerable), Ateles fusciceps, minería aluvial, deforestación en espina de pescado"
                      value={speciesOrThreats}
                      onChange={(e) => setSpeciesOrThreats(e.target.value)}
                      className="w-full bg-white rounded p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-600"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-stone-800 block mb-1">
                      4. Resumen Metodológico (Pasos ejecutados en {guide.platform}):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Detalla cómo exploraste la plataforma, qué capas activaste y cómo delimitaste el área de estudio..."
                      value={methodologySummary}
                      onChange={(e) => setMethodologySummary(e.target.value)}
                      className="w-full bg-white rounded p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-600 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-stone-800 block mb-1">
                      5. Observaciones y explicaciones sobre el ecosistema:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mencione hectáreas cuantificadas, distancias de fragmentación, ancho del corredor o anomalías térmicas..."
                      value={spatialFindings}
                      onChange={(e) => setSpatialFindings(e.target.value)}
                      className="w-full bg-white rounded p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-600 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-stone-800 block mb-1">
                      6. Propuesta de Manejo Territorial y Sustento Normativo (COA / Art. 71 CE):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Planteamiento de mitigación, delimitación de zonas de amortiguamiento y gobernanza comunitaria..."
                      value={conservationProposal}
                      onChange={(e) => setConservationProposal(e.target.value)}
                      className="w-full bg-white rounded p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-600 resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {aiError && (
                  <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{aiError}</span>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleReviewWithAI}
                    disabled={isSubmittingAI || !studyArea}
                    className="px-5 py-2.5 rounded bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
                  >
                    {isSubmittingAI ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                        Revisando explicaciones científicas, evidencias y propuesta educativa...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        Revisar Guía con IA (Calificar y Obtener Rúbrica)
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Review Results Display */}
              {aiReviewResult && (
                <div className="space-y-4">
                  {/* Score & Executive Summary Card */}
                  <div className="bg-stone-50 rounded-lg p-5 border border-stone-300 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-0.5">
                          <span>DICTAMEN TÉCNICO FORMAL</span>
                          <span aria-hidden="true">/</span>
                          <span className="font-bold text-stone-900">NIVEL: {aiReviewResult.performanceLevel.toUpperCase()}</span>
                        </div>
                        <h4 className="text-base font-bold text-stone-950">
                          Acta de Evaluación Cartográfica y Desempeño Analítico
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase text-stone-500 block">Puntaje Final</span>
                        <span className="text-2xl font-black text-stone-950 font-mono">
                          {aiReviewResult.overallScore} <span className="text-xs font-bold text-stone-400">/ 20</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded bg-white border border-stone-200 text-xs md:text-sm text-stone-800 leading-relaxed">
                      <strong className="text-stone-900 block mb-1 font-mono uppercase text-xs">Síntesis de Auditoría:</strong>
                      {aiReviewResult.executiveSummary}
                    </div>

                    {/* Rubric Breakdown Grid */}
                    <div className="space-y-3 pt-1">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                        Desglose de Desempeño por Rúbrica de aprendizaje:
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {aiReviewResult.rubricBreakdown.map((item, idx) => (
                          <div key={idx} className="p-3 rounded bg-white border border-stone-200 text-xs space-y-1.5">
                            <div className="flex items-center justify-between border-b border-stone-100 pb-1">
                              <span className="font-bold text-stone-900">{item.criterion}</span>
                              <span className="font-mono text-stone-700 font-bold text-[11px]">
                                {item.score} pts ({item.weight})
                              </span>
                            </div>
                            <p className="text-stone-600 leading-relaxed">
                              {item.feedback}
                            </p>
                            <div className="p-2 rounded bg-stone-50 text-stone-800 text-[11px]">
                              <strong>Recomendación técnica:</strong> {item.recommendation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strengths & Omissions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded bg-white border border-stone-200 text-xs">
                        <span className="font-bold text-stone-900 block mb-1">Criterios Superados Satisfactoriamente:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                          {aiReviewResult.scientificStrengths.map((str, idx) => (
                            <li key={idx}>{str}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded bg-white border border-stone-200 text-xs">
                        <span className="font-bold text-stone-900 block mb-1">Observaciones para Subsanación:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                          {aiReviewResult.technicalOmissions.map((om, idx) => (
                            <li key={idx}>{om}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Button to mark complete */}
                    {!isCompleted && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onToggleComplete(guide.id)}
                          className="px-4 py-2 rounded bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Check className="w-4 h-4" />
                          Aprobar Hoja de Trabajo y Registrar en Portafolio
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Scientific Articles */}
                  {scientificArticles.length > 0 && (
                    <div className="bg-stone-50 rounded-lg p-5 border border-stone-200 space-y-3">
                      <div className="flex items-center gap-2">
                        <BookMarked className="w-4 h-4 text-[#0369a1]" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                          Referencias Científicas Arbitradas Vinculadas (Europe PMC / NCBI)
                        </h5>
                      </div>
                      <p className="text-xs text-stone-600">
                        Publicaciones indexadas recomendadas para profundizar en los taxa y la dinámica espacial de conservación analizados:
                      </p>

                      <div className="space-y-2">
                        {scientificArticles.map((art) => (
                          <div 
                            key={art.id}
                            className="p-3 rounded bg-white border border-stone-200 text-xs flex items-start justify-between gap-3"
                          >
                            <div>
                              <h6 className="font-bold text-stone-900 leading-snug">{art.title}</h6>
                              <p className="text-stone-500 mt-0.5 text-[11px] font-mono">
                                {art.authors} · <span className="italic">{art.journal}</span> ({art.pubYear})
                              </p>
                            </div>
                            <a
                              href={art.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900 shrink-0 border border-stone-200"
                              title="Consultar publicación científica"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 text-xs">
          <div className="text-stone-500 font-mono text-[11px]">
            BIOSIG · CÁTEDRA DE BIOGEOGRAFÍA Y SIG APLICADO (ECUADOR)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-white hover:bg-stone-100 text-stone-800 font-medium border border-stone-300 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Imprimir Hoja
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-white font-bold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
