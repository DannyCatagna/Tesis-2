import React from 'react';
import { 
  Globe2, 
  Layers, 
  MapPin, 
  ArrowRight, 
  Compass, 
  Satellite, 
  ExternalLink, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Mountain,
  Flame,
  Waves
} from 'lucide-react';

interface TabInicioProps {
  onNavigateTab: (tabIndex: number) => void;
  onOpenIntroModal: () => void;
  onOpenGuideModal: (guideId: string) => void;
}

export const TabInicio: React.FC<TabInicioProps> = ({
  onNavigateTab,
  onOpenIntroModal,
  onOpenGuideModal,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn text-stone-900">
      {/* HERO SECTION - ARCHIVAL ATLAS DOSSIER */}
      <section className="relative overflow-hidden rounded-xl bg-white p-6 md:p-8 border border-stone-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2 text-xs text-stone-500 font-mono">
            <span className="font-bold text-[#15803d] uppercase">LABORATORIO WEB DE BIOLOGÍA & CARTOGRAFÍA</span>
            <span aria-hidden="true">·</span>
            <span>REPÚBLICA DEL ECUADOR</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight leading-tight">
            BIOSIG Ecuador: Plataforma de Aprendizaje y Enseñanza de la Biodiversidad Continental
          </h1>

          <p className="mt-3 text-xs md:text-sm text-stone-700 leading-relaxed font-normal">
            Conecta la biogeografía de los 91 ecosistemas continentales y las 78 áreas del Sistema Nacional de Áreas Protegidas (SNAP) con el análisis espacial, la química del agua y la dispersión biológica, sin necesidad de instalar software pesado.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab(2)} // Mapa Interactivo
              className="px-4 py-2 rounded bg-[#15803d] hover:bg-[#166534] text-white font-bold flex items-center gap-2 shadow-sm transition-all text-xs md:text-sm"
            >
              <Compass className="w-4 h-4" />
              Explorar Visor Satelital 2D/3D
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenIntroModal}
              className="px-4 py-2 rounded bg-white hover:bg-stone-50 text-stone-800 font-semibold border border-stone-300 flex items-center gap-2 transition-all text-xs md:text-sm"
            >
              <GraduationCap className="w-4 h-4 text-[#0369a1]" />
              Fundamentos de Cartografía & Geodesia
            </button>

            <button
              onClick={() => onNavigateTab(1)} // Panel pedagógico
              className="px-4 py-2 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold flex items-center gap-2 transition-all text-xs md:text-sm"
            >
              <BookOpen className="w-4 h-4 text-[#15803d]" />
              Guías Didácticas de Campo
            </button>
          </div>
        </div>

        {/* Decorative corner cartographic badge */}
        <div className="hidden lg:flex flex-col items-end absolute top-8 right-8 text-right font-mono text-[11px] text-stone-500 border-l border-stone-200 pl-4">
          <div>DATUM: <strong>SIRGAS-EC (WGS84)</strong></div>
          <div>PROYECCIÓN: <strong>UTM ZONAS 17S & 18S</strong></div>
          <div className="text-stone-900 font-bold mt-1">78 ÁREAS CONTINENTALES SNAP</div>
          <div className="text-stone-400 mt-0.5">MINISTERIO DEL AMBIENTE (MAATE)</div>
        </div>
      </section>

      {/* 4 CORE LEARNING MODULES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Module 1 */}
        <div 
          onClick={() => onNavigateTab(2)}
          className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:border-emerald-600/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-stone-400 font-bold">MÓDULO 01</span>
            </div>
            <h3 className="font-bold text-stone-950 text-sm group-hover:text-[#15803d] transition-colors">
              Visor Territorial 2D & 3D
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              Explora las 78 áreas del SNAP con capas satelitales oficiales, elevación y modelos interactivos de relieve en Three.js.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-[#15803d]">
            Abrir Visor Satelital →
          </div>
        </div>

        {/* Module 2 */}
        <div 
          onClick={() => onNavigateTab(1)}
          className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:border-sky-600/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0369a1] flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-stone-400 font-bold">MÓDULO 02</span>
            </div>
            <h3 className="font-bold text-stone-950 text-sm group-hover:text-[#0369a1] transition-colors">
              Guías Didácticas de Campo
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              4 prácticas secuenciales estructuradas con metodología activa paso a paso, producto esperado y escenas 3D WebGL.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-[#0369a1]">
            Ver Guías Prácticas →
          </div>
        </div>

        {/* Module 3 */}
        <div 
          onClick={() => onNavigateTab(3)}
          className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:border-amber-600/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#b45309] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-stone-400 font-bold">MÓDULO 03</span>
            </div>
            <h3 className="font-bold text-stone-950 text-sm group-hover:text-[#b45309] transition-colors">
              Seguimiento y Rúbricas
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              Portafolio de evidencias con rúbricas de evaluación de cátedra, test diagnóstico y retroalimentación formativa.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-[#b45309]">
            Revisar Portafolio →
          </div>
        </div>

        {/* Module 4 */}
        <div 
          onClick={() => onNavigateTab(4)}
          className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:border-stone-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-stone-400 font-bold">MÓDULO 04</span>
            </div>
            <h3 className="font-bold text-stone-950 text-sm group-hover:text-stone-900 transition-colors">
              Marco Jurídico & APA 7
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              Artículos 71-74 de la Constitución, Código Orgánico del Ambiente (COA) y literatura biogeográfica citada formalmente.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-stone-800">
            Consultar Normativa →
          </div>
        </div>
      </section>

      {/* PLATAFORMAS GRATUITAS PRIORITARIAS (MAATE, GOOGLE EARTH Y NASA WORLDVIEW) */}
      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#15803d] uppercase tracking-wider">
            <Globe2 className="w-4 h-4" />
            <span>Herramientas Abiertas y Gratuitas en el Navegador</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-950 tracking-tight">
            Plataformas Cartográficas Gratuitas Recomendadas para el Aula
          </h2>
          <p className="text-xs md:text-sm text-stone-600">
            Funcionan 100% en la web sin instalaciones complejas ni licencias comerciales, integradas directamente en las guías prácticas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tarjeta 1: Visor Geográfico MAATE (Prioritario) */}
          <div className="bg-white rounded-xl p-5 border-2 border-emerald-500 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#15803d] text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-bl">
              OFICIAL ECUADOR
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-mono text-emerald-700 font-bold">PLATAFORMA 01</span>
                <span className="text-stone-700 font-semibold text-[11px]">Servicios WMS/WFS</span>
              </div>
              <h3 className="text-base font-bold text-stone-950">
                Visor Geográfico del MAATE
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Geoportal oficial del Ministerio del Ambiente del Ecuador: consulta los límites del SNAP, bosques protectores, representatividad y los 91 ecosistemas continentales sin costo.
              </p>
              <div className="p-2.5 rounded bg-emerald-50 text-[11px] text-emerald-900 space-y-1">
                <strong>Uso didáctico:</strong>
                <p>Permite encender capas del SNAP y examinar acuerdos ministeriales y superficies territoriales.</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => onOpenGuideModal('guia-3')}
                className="font-bold text-[#15803d] hover:underline"
              >
                Abrir Guía Práctica 3 →
              </button>
              <a
                href="http://ide.ambiente.gob.ec/mapainteractivo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1 font-mono text-[11px]"
                title="Abrir visor oficial del MAATE"
              >
                ide.ambiente <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Tarjeta 2: Google Earth Web */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-stone-500">PLATAFORMA 02</span>
                <span className="text-stone-700 font-semibold text-[11px]">Relieve 3D & KML</span>
              </div>
              <h3 className="text-base font-bold text-stone-950">
                Google Earth Web
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Vuela en 3D sobre la Cordillera de los Andes, mide distancias y áreas en hectáreas con la regla, y extrae perfiles de elevación altitudinales.
              </p>
              <div className="p-2.5 rounded bg-sky-50 text-[11px] text-sky-900 space-y-1">
                <strong>Uso didáctico:</strong>
                <p>Ideal para observar gradientes altimétricos, pisos bioclimáticos y cuencas hidrográficas.</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => onOpenGuideModal('guia-1')}
                className="font-bold text-stone-900 hover:text-[#0369a1]"
              >
                Abrir Guía Práctica 1 →
              </button>
              <a
                href="https://earth.google.com/web/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1 font-mono text-[11px]"
                title="Abrir Google Earth Web"
              >
                earth.google <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Tarjeta 3: NASA Worldview */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-stone-500">PLATAFORMA 03</span>
                <span className="text-stone-700 font-semibold text-[11px]">Satélites Diarios</span>
              </div>
              <h3 className="text-base font-bold text-stone-950">
                NASA Worldview & FIRMS
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Imágenes satelitales diarias de Ecuador (sensores MODIS y VIIRS): detecta anomalías térmicas e incendios forestales activos y compara cambios temporales.
              </p>
              <div className="p-2.5 rounded bg-amber-50 text-[11px] text-amber-900 space-y-1">
                <strong>Uso didáctico:</strong>
                <p>Permite rastrear focos de calor y monitorear la atmósfera y cobertura vegetal.</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => onOpenGuideModal('guia-2')}
                className="font-bold text-stone-900 hover:text-[#b45309]"
              >
                Abrir Guía Práctica 2 →
              </button>
              <a
                href="https://worldview.earthdata.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1 font-mono text-[11px]"
                title="Abrir NASA Worldview"
              >
                worldview.nasa <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER INFERIOR DE CÁTEDRA DOCENTE */}
      <section className="bg-stone-900 rounded-xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            PORTAFOLIO DE PRÁCTICAS DOCENTES
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            Aprende a Tu Ritmo con Retroalimentación Formativa
          </h3>
          <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
            Cada guía cuenta con explicación paso a paso, resultado visual esperado, glosario técnico, escenas interactivas 3D y evaluación con rúbricas de cátedra.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab(1)} // Panel pedagógico
            className="px-4 py-2 rounded bg-[#15803d] hover:bg-[#166534] font-semibold text-xs md:text-sm transition-all shadow-sm"
          >
            Temas del Sílabo
          </button>
          <button
            onClick={() => onNavigateTab(3)} // Evaluación y seguimiento
            className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 font-semibold text-xs md:text-sm transition-all"
          >
            Portafolio y Rúbricas
          </button>
        </div>
      </section>
    </div>
  );
};
