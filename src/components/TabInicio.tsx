import React from 'react';
import { 
  Globe2, 
  Layers, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Satellite, 
  ExternalLink, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  MonitorCheck,
  CheckCircle2
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
    <div className="space-y-8 animate-fadeIn">
      {/* HERO SECTION - LIQUID GLASS */}
      <section className="relative overflow-hidden rounded-3xl liquid-glass p-6 md:p-10 border border-white/80 shadow-[0_12px_40px_rgba(31,38,135,0.12)]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#15803d]">
              Plataforma WebGIS Universitaria
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-500">Biodiversidad & Territorio Continental</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            BIOSIG: Visor Pedagógico y Cartográfico para la Conservación de la Biodiversidad en el Ecuador
          </h1>

          <p className="mt-4 text-sm md:text-base text-slate-700 leading-relaxed font-normal">
            Una plataforma educativa constructivista diseñada para conectar la teoría biológica de los ecosistemas ecuatorianos con el análisis espacial moderno. Explora el territorio sin necesidad de instalar software pesado mediante herramientas abiertas de WebGIS satelital.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab(2)} // Mapa Interactivo
              className="px-5 py-2.5 rounded-2xl bg-[#15803d] hover:bg-[#166534] text-white font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 text-sm glow-jungle"
            >
              <Compass className="w-4 h-4" />
              Explorar Mapa Satelital
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenIntroModal}
              className="px-5 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-800 font-bold border border-slate-300/80 flex items-center gap-2 shadow-sm transition-all text-sm"
            >
              <BookOpen className="w-4 h-4 text-[#0369a1]" />
              Fundamentos SIG & Proyecciones
            </button>

            <button
              onClick={() => onNavigateTab(1)} // Panel Pedagógico
              className="px-5 py-2.5 rounded-2xl bg-[#b45309] hover:bg-[#92400e] text-white font-bold flex items-center gap-2 shadow-sm transition-all text-sm"
            >
              <Layers className="w-4 h-4" />
              Guías de Práctica
            </button>
          </div>
        </div>

        {/* Decorative corner badge */}
        <div className="hidden lg:flex flex-col items-end absolute top-10 right-10 text-right">
          <div className="p-3 rounded-2xl bg-white/70 border border-white/80 shadow-sm text-xs font-mono text-slate-600">
            <div>Datum Oficial: <strong>SIRGAS-Ecuador</strong></div>
            <div>Proyección: <strong>WGS84 UTM 17S / 18S</strong></div>
            <div className="text-[#15803d] font-bold mt-1">78 Áreas Continentales SNAP</div>
          </div>
        </div>
      </section>

      {/* DEFINICIÓN CONCEPTUAL DE SIG & EVOLUCIÓN TECNOLÓGICA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Qué es un SIG */}
        <div className="liquid-glass-card rounded-3xl p-6 border border-white/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#15803d]/10 text-[#15803d]">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803d]">Concepto Central</span>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                ¿Qué es un Sistema de Información Geográfica (SIG)?
              </h2>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
            Un SIG es mucho más que un software para elaborar mapas estéticos; es una arquitectura integral de cinco componentes (hardware, software, datos espaciales, metodologías analíticas y personas) capaz de:
          </p>

          <ul className="space-y-2 text-xs md:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
              <span><strong>Captura y Digitalización:</strong> Levantamiento de coordenadas en campo (GNSS), teledetección satelital y vuelos dron.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
              <span><strong>Almacenamiento Georreferenciado:</strong> Gestión de bases de datos relacionales espaciales (PostGIS, GeoJSON, Shapefile).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
              <span><strong>Análisis y Modelado:</strong> Operaciones booleanas de superposición, buffers de protección, álgebra de mapas e idoneidad ecológica.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
              <span><strong>Despliegue y Toma de Decisiones:</strong> Comunicación visual rigurosa para ordenamiento territorial y conservación de la naturaleza.</span>
            </li>
          </ul>
        </div>

        {/* Evolución Tecnológica: Desktop GIS vs WebGIS */}
        <div className="liquid-glass-card rounded-3xl p-6 border border-white/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#0369a1]/10 text-[#0369a1]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0369a1]">Evolución Didáctica</span>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                De Desktop GIS Tradicional a WebGIS Moderno
              </h2>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
            La enseñanza universitaria de las ciencias de la Tierra ha evolucionado desde instalaciones monolíticas hacia plataformas colaborativas y ligeras en el navegador:
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-white/70 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Desktop GIS (QGIS, ArcGIS)
              </span>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>· Instalación pesada (GB de almacenamiento)</li>
                <li>· Curva de aprendizaje técnica empinada</li>
                <li>· Dependencia de hardware local potente</li>
                <li>· Excelente para geoprocesamientos masivos</li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200">
              <span className="text-[11px] font-bold text-[#0369a1] uppercase block mb-1">
                WebGIS Moderno (Leaflet, Earth)
              </span>
              <ul className="text-xs text-sky-950 space-y-1">
                <li>· Acceso instantáneo en cualquier navegador</li>
                <li>· Cero instalación requerida</li>
                <li>· Enfoque en exploración e interacción visual</li>
                <li>· Aprendizaje constructivista inmediato</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-[#b45309]/30 text-amber-950 text-xs">
            <strong>Objetivo pedagógico de BIOSIG:</strong> Facilitar a estudiantes universitarios de biología y ciencias ambientales el dominio de conceptos geoespaciales aplicados al Ecuador sin barreras de instalación de software.
          </div>
        </div>
      </section>

      {/* PLATAFORMAS SATELITALES Y OBSERVATORIOS (TARJETAS DIDÁCTICAS) */}
      <section className="space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309]">
            Herramientas de Percepción Remota
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Plataformas Satelitales para el Aprendizaje Práctico
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            Herramientas web oficiales empleadas en las 4 Guías de Práctica de la plataforma:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tarjeta 1: Google Earth Web */}
          <div className="liquid-glass rounded-3xl p-5 border border-white/80 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-[#15803d]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase text-[#15803d] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Exploración 3D
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#15803d] transition-colors">
                Google Earth Web
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reconocimiento territorial en relieve 3D, perfiles de elevación altitudinales y delimitación de microcuencas mediante digitalización KML.
              </p>
              <div className="text-[11px] text-slate-500 font-medium">
                Vinculado a: <strong>Guía 1 (Nichos y Distribución de Especies)</strong>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
              <button
                onClick={() => onOpenGuideModal('guia-1')}
                className="text-xs font-bold text-[#b45309] hover:underline"
              >
                Ver Hoja de Trabajo 1
              </button>
              <a
                href="https://earth.google.com/web/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Abrir Google Earth Web"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tarjeta 2: NASA Worldview */}
          <div className="liquid-glass rounded-3xl p-5 border border-white/80 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-amber-100 text-[#b45309]">
                  <Satellite className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase text-[#b45309] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Monitoreo Temporal
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#b45309] transition-colors">
                NASA Worldview
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitoreo multitemporal interanual de incendios forestales mediante sensores MODIS/VIIRS y detección de deforestación por minería y vías.
              </p>
              <div className="text-[11px] text-slate-500 font-medium">
                Vinculado a: <strong>Guía 2 (Timelapse y Amenazas a la Biodiversidad)</strong>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
              <button
                onClick={() => onOpenGuideModal('guia-2')}
                className="text-xs font-bold text-[#b45309] hover:underline"
              >
                Ver Hoja de Trabajo 2
              </button>
              <a
                href="https://worldview.earthdata.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Abrir NASA Worldview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tarjeta 3: Visor Geográfico MAATE */}
          <div className="liquid-glass rounded-3xl p-5 border border-white/80 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-sky-100 text-[#0369a1]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase text-[#0369a1] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  Infraestructura IDE
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0369a1] transition-colors">
                Visor Geográfico MAATE
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interoperabilidad espacial mediante capas oficiales WMS/WFS del Sistema Nacional de Áreas Protegidas y 91 ecosistemas continentales.
              </p>
              <div className="text-[11px] text-slate-500 font-medium">
                Vinculado a: <strong>Guía 3 (Límites y Cobertura SNAP)</strong>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
              <button
                onClick={() => onOpenGuideModal('guia-3')}
                className="text-xs font-bold text-[#b45309] hover:underline"
              >
                Ver Hoja de Trabajo 3
              </button>
              <a
                href="http://ide.ambiente.gob.ec/mapainteractivo/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Abrir Visor MAATE"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER DE ACCESO RÁPIDO A METODOLOGÍA */}
      <section className="liquid-glass-dark rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b45309]">
            Enfoque Constructivista
          </span>
          <h3 className="text-xl md:text-2xl font-black tracking-tight">
            ¿Listo para poner en práctica las Hojas de Trabajo SIG?
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Cada guía cuenta con un procedimiento de 6 pasos, tips técnicos, glosario interactivo, rúbricas de evaluación formativa y enlace directo a la herramienta satelital.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab(1)} // Panel pedagógico
            className="px-5 py-2.5 rounded-xl bg-[#15803d] hover:bg-[#166534] font-bold text-xs md:text-sm transition-all shadow-md"
          >
            Ver Unidades Teóricas
          </button>
          <button
            onClick={() => onNavigateTab(3)} // Evaluación y seguimiento
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-xs md:text-sm transition-all"
          >
            Rastreador de Progreso
          </button>
        </div>
      </section>
    </div>
  );
};
