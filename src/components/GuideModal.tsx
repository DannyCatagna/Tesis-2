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
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Bot,
  Send,
  Loader2,
  AlertCircle,
  FileCheck2,
  BookMarked,
  Check,
  RotateCcw
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
  const [activeMainTab, setActiveMainTab] = useState<'procedimiento' | 'ia-revision'>('procedimiento');
  const [expandedGlossary, setExpandedGlossary] = useState<number | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  // AI Review form state
  const [studyArea, setStudyArea] = useState<string>('');
  const [coordinatesOrDatum, setCoordinatesOrDatum] = useState<string>('WGS84 UTM 17S (SIRGAS-Ecuador)');
  const [methodologySummary, setMethodologySummary] = useState<string>('');
  const [speciesOrThreats, setSpeciesOrThreats] = useState<string>('');
  const [spatialFindings, setSpatialFindings] = useState<string>('');
  const [conservationProposal, setConservationProposal] = useState<string>('');

  // AI Review Status
  const [isSubmittingAI, setIsSubmittingAI] = useState<boolean>(false);
  const [aiReviewResult, setAiReviewResult] = useState<AIReviewResult | null>(null);
  const [scientificArticles, setScientificArticles] = useState<ScientificArticle[]>([]);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!isOpen || !guide) return null;

  const toggleGlossaryItem = (idx: number) => {
    setExpandedGlossary(expandedGlossary === idx ? null : idx);
  };

  const handlePrint = () => {
    window.print();
  };

  // Populate sample student data for convenient testing
  const handleLoadSampleData = () => {
    if (guide.id === 'guia-1') {
      setStudyArea('Parque Nacional Podocarpus (Loja / Zamora Chinchipe)');
      setCoordinatesOrDatum('WGS84 UTM Zona 17 Sur (EPSG: 32717) / Elevación 2.400 - 3.700 msnm');
      setMethodologySummary('Se trazó un transecto altitudinal de 28 km desde la cuenca del río Zamora hasta los páramos del Compadre. Se superpusieron 14 registros de presencia de Podocarpus sprucei y Tremarctos ornatus exportados en formato KML.');
      setSpeciesOrThreats('Romerillo azuceno (Podocarpus sprucei), Oso de anteojos (Tremarctos ornatus) y Tapir andino (Tapirus pinchaque). Amenaza por minería aluvial en ríos limítrofes.');
      setSpatialFindings('El perfil de elevación mostró una pendiente media del 38%. Se identificaron 12.450 hectáreas de nicho ecológico óptimo en el bosque nublado, pero con un estrangulamiento de 450 metros en el corredor norte debido a pastizales.');
      setConservationProposal('Creación de una zona de amortiguamiento comunitaria bajo el Art. 71 de la Constitución y el Código Orgánico del Ambiente (COA), con incentivos de Socio Bosque para evitar la tala en las cabeceras hídricas.');
    } else if (guide.id === 'guia-2') {
      setStudyArea('Bloque 16 y Parque Nacional Yasuní (Orellana)');
      setCoordinatesOrDatum('WGS84 UTM Zona 18 Sur (EPSG: 32718) / Sensor MODIS Terra y VIIRS');
      setMethodologySummary('Análisis multitemporal de 10 años (agosto 2014 a agosto 2024) utilizando producto True Color con <15% de nubosidad y la capa Fires and Thermal Anomalies en NASA Worldview.');
      setSpeciesOrThreats('Jaguar (Panthera onca) y delfín rosado (Inia geoffrensis). Amenaza por carreteras de penetración petrolera y focos de calor por quemas agrícolas en época seca.');
      setSpatialFindings('Se documentó un avance en espina de pescado de 14.2 km a lo largo del eje vial primario, registrándose 28 anomalías térmicas en la franja limítrofe.');
      setConservationProposal('Reforzar el control de la Zona Intangible Tagaeri-Taromenane con monitoreo satelital diario y aplicación del régimen sancionatorio del COA.');
    } else if (guide.id === 'guia-3') {
      setStudyArea('Reserva Ecológica Manglares Churute (Guayas)');
      setCoordinatesOrDatum('WGS84 UTM Zona 17 Sur (EPSG: 32717) / Servicios WMS y WFS IDE-MAATE');
      setMethodologySummary('Carga de la capa oficial SNAP_2023 y superposición con el mapa de ecosistemas continentales y división cantonal de Naranjal y Guayaquil.');
      setSpeciesOrThreats('Canclón (Anhima cornuta) y Cocodrilo de la Costa (Crocodylus acutus). Presión por piscinas camaroneras ilegales.');
      setSpatialFindings('La reserva protege 49.383 ha, pero se detectó un vacío de conservación (gap) de 3.200 ha de manglar relicto adyacente que carece de protección legal formal.');
      setConservationProposal('Incorporación del polígono adyacente como Área Protegida Comunitaria bajo el subsistema del SNAP previsto en el Código Orgánico del Ambiente.');
    } else {
      setStudyArea('Zona de Amortiguamiento Parque Nacional Cotopaxi');
      setCoordinatesOrDatum('WGS84 UTM Zona 17 Sur (EPSG: 32717) / OpenStreetMap & Overpass Turbo');
      setMethodologySummary('Cálculo de buffers concéntricos de 2 km y 5 km alrededor del polígono del parque. Extracción de capas de caminos vecinales y uso del suelo en OSM.');
      setSpeciesOrThreats('Cóndor andino (Vultur gryphus) y lobo de páramo (Lycalopex culpaeus). Conflicto por avance de ganado asilvestrado y quemas.');
      setSpatialFindings('El buffer de 2 km abarca 18.600 ha, de las cuales 34% presentan uso agropecuario activo que interrumpe el pajonal nativo.');
      setConservationProposal('Acuerdos de manejo participativo con las comunas locales para cercado eléctrico de protección y transición hacia ecoturismo comunitario.');
    }
  };

  // Submit to AI evaluation endpoint
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
        throw new Error(`Error en el servidor de evaluación: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.review) {
        setAiReviewResult(data.review);
        setScientificArticles(data.scientificArticles || []);
      } else {
        throw new Error('Respuesta inválida del evaluador pedagógico.');
      }
    } catch (err: any) {
      console.error('AI Review error:', err);
      setAiError(err.message || 'Error al conectar con el servicio de IA');
    } finally {
      setIsSubmittingAI(false);
    }
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

          {/* Quick info toolbar & TAB SWITCHER */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200/60 text-xs">
            {/* Main Tabs: Guía Didáctica vs Revisión con IA */}
            <div className="flex items-center gap-1.5 p-1 bg-white/80 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveMainTab('procedimiento')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  activeMainTab === 'procedimiento'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Guía & Procedimiento
              </button>

              <button
                onClick={() => setActiveMainTab('ia-revision')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  activeMainTab === 'ia-revision'
                    ? 'bg-[#b45309] text-white shadow-sm'
                    : 'text-[#b45309] hover:bg-amber-50'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                Revisión con IA
                {aiReviewResult && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={guide.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#b45309] hover:bg-[#92400e] text-white font-bold flex items-center gap-1.5 shadow-sm transition-all text-xs"
              >
                Abrir {guide.platform.split(' ')[0]}
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
                {isCompleted ? 'Completada' : 'Marcar completada'}
              </button>
            </div>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PROCEDIMIENTO METODOLÓGICO Y RÚBRICA */}
          {activeMainTab === 'procedimiento' && (
            <>
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

              {/* 5. RÚBRICA FORMATIVA */}
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
            </>
          )}

          {/* TAB 2: REVISIÓN CON IA (TUTOR CIENTÍFICO BIOSIG) */}
          {activeMainTab === 'ia-revision' && (
            <div className="space-y-6">
              {/* Submission Form Section */}
              <div className="liquid-glass rounded-2xl p-5 border border-white/90 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#b45309]">
                      Módulo de Evaluación Inteligente
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      Envío de la Hoja de Trabajo para Revisión con IA
                    </h3>
                  </div>

                  <button
                    onClick={handleLoadSampleData}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-[#b45309] text-xs font-bold border border-[#b45309]/30 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Cargar Datos de Muestra de Estudiante
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Ingresa los resultados obtenidos durante la práctica o carga un ejemplo para que el Tutor Científico BIOSIG califique tu trabajo contra las 4 rúbricas oficiales y consulte literatura biológica de referencia (Europe PMC / PubMed).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      1. Área de Estudio o Polígono Analizado:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Parque Nacional Yasuní / Reserva Manglares Churute"
                      value={studyArea}
                      onChange={(e) => setStudyArea(e.target.value)}
                      className="w-full bg-white/90 rounded-xl p-2.5 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b45309]/30"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      2. Parámetros Geodésicos / Datum / Elevación:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. WGS84 UTM 17S (SIRGAS-Ecuador) / Cota 2.800 m"
                      value={coordinatesOrDatum}
                      onChange={(e) => setCoordinatesOrDatum(e.target.value)}
                      className="w-full bg-white/90 rounded-xl p-2.5 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b45309]/30"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-slate-800 block mb-1">
                      3. Especies Amenazadas o Factores de Presión:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Tremarctos ornatus (Vulnerable), Ateles fusciceps, minería aluvial, deforestación en espina de pescado"
                      value={speciesOrThreats}
                      onChange={(e) => setSpeciesOrThreats(e.target.value)}
                      className="w-full bg-white/90 rounded-xl p-2.5 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b45309]/30"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-slate-800 block mb-1">
                      4. Resumen Metodológico (Pasos ejecutados en {guide.platform}):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Detalla cómo exploraste la plataforma, qué capas activaste y cómo delimitaste el área de estudio..."
                      value={methodologySummary}
                      onChange={(e) => setMethodologySummary(e.target.value)}
                      className="w-full bg-white/90 rounded-xl p-2.5 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b45309]/30 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-slate-800 block mb-1">
                      5. Hallazgos Espaciales y Métricas (Hectáreas, buffers, elevaciones):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Menciona las hectáreas cuantificadas, distancias de fragmentación, ancho del corredor o anomalías térmicas..."
                      value={spatialFindings}
                      onChange={(e) => setSpatialFindings(e.target.value)}
                      className="w-full bg-white/90 rounded-xl p-2.5 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b45309]/30 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-slate-800 block mb-1">
                      6. Propuesta de Conservación y Sustento Legal (COA / Art. 71 Constitución):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Plantea cómo mitigar los impactos, zonas de amortiguamiento y mecanismos de gobernanza comunitaria..."
                      value={conservationProposal}
                      onChange={(e) => setConservationProposal(e.target.value)}
                      className="w-full bg-white/90 rounded-xl p-2.5 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b45309]/30 resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {aiError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{aiError}</span>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleReviewWithAI}
                    disabled={isSubmittingAI || !studyArea}
                    className="px-6 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#92400e] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    {isSubmittingAI ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analizando con Tutor de IA & Science Skills...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Calificar y Retroalimentar con IA
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* AI Review Results Display */}
              {aiReviewResult && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Score & Executive Summary Card */}
                  <div className="liquid-glass-card rounded-2xl p-6 border border-emerald-300 shadow-md space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Dictamen Pedagógico Emitido
                          </span>
                          <span className="text-xs text-slate-500">Nivel: <strong>{aiReviewResult.performanceLevel}</strong></span>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mt-1">
                          Evaluación Constructivista de la Guía {guide.number}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase text-slate-500 block">Calificación</span>
                          <span className="text-3xl font-black text-[#15803d]">
                            {aiReviewResult.overallScore} <span className="text-sm font-bold text-slate-400">/ 20</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/80 border border-slate-200 text-xs md:text-sm text-slate-800 leading-relaxed">
                      <strong className="text-[#0369a1] block mb-1">Síntesis Formativa:</strong>
                      {aiReviewResult.executiveSummary}
                    </div>

                    {/* Rubric Breakdown Grid */}
                    <div className="space-y-3 pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Desglose de Desempeño por Rúbrica Oficial:
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {aiReviewResult.rubricBreakdown.map((item, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-slate-200/90 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-slate-900">{item.criterion}</span>
                              <span className="font-bold text-[#15803d] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {item.score} pts ({item.weight})
                              </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                              {item.feedback}
                            </p>
                            <div className="p-2 rounded bg-amber-50/70 border border-amber-200 text-amber-950 font-medium">
                              <strong>Consejo de Mejora:</strong> {item.recommendation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strengths & Omissions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                        <span className="font-bold text-emerald-900 block mb-1">Fortalezas Demostradas:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-emerald-800">
                          {aiReviewResult.scientificStrengths.map((str, idx) => (
                            <li key={idx}>{str}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                        <span className="font-bold text-amber-900 block mb-1">Aspectos a Profundizar:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-amber-800">
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
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Aprobar Hoja de Trabajo y Marcar como Completada
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Science Skills: Peer-Reviewed Scientific Articles */}
                  {scientificArticles.length > 0 && (
                    <div className="liquid-glass rounded-2xl p-5 border border-white/90 space-y-3">
                      <div className="flex items-center gap-2">
                        <BookMarked className="w-4 h-4 text-[#0369a1]" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Literatura Científica Relacionada (Europe PMC / BioScience Skills)
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600">
                        Publicaciones indexadas recomendadas para profundizar en los taxa y dinámicas de conservación abordados en tu entrega:
                      </p>

                      <div className="space-y-2">
                        {scientificArticles.map((art) => (
                          <div 
                            key={art.id}
                            className="p-3 rounded-xl bg-white/80 border border-slate-200 text-xs flex items-start justify-between gap-3"
                          >
                            <div>
                              <h6 className="font-extrabold text-slate-900 leading-snug">{art.title}</h6>
                              <p className="text-slate-600 mt-0.5 text-[11px]">
                                {art.authors} · <span className="italic">{art.journal}</span> ({art.pubYear})
                              </p>
                            </div>
                            <a
                              href={art.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0"
                              title="Ver artículo científico"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-[#0369a1]" />
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
        <div className="p-4 bg-white/70 border-t border-white/60 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            BIOSIG Ecuador · Módulo de Evaluación Inteligente con IA
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
