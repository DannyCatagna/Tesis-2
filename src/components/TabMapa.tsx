import React, { useState } from 'react';
import { InteractiveMap } from './InteractiveMap';
import { Thematic3DViewer, Thematic3DType } from './Thematic3DViewer';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { CategoryType } from '../types';
import { Trees, Compass, Filter, Sparkles, MapPin, Layers, Info, Mountain, Eye } from 'lucide-react';

interface TabMapaProps {
  selectedAreaId: string;
  onSelectArea: (areaId: string) => void;
}

export const TabMapa: React.FC<TabMapaProps> = ({
  selectedAreaId,
  onSelectArea,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  const get3DThemeForArea = (areaId: string): Thematic3DType => {
    if (areaId.includes('yasuni') || areaId.includes('cuyabeno') || areaId.includes('limoncocha') || areaId.includes('sumaco')) {
      return 'yasuni-amazon';
    }
    if (areaId.includes('churute') || areaId.includes('machalilla') || areaId.includes('pacoche') || areaId.includes('cayapas') || areaId.includes('mache')) {
      return 'mangrove-churute';
    }
    if (areaId.includes('cotopaxi') || areaId.includes('chimborazo') || areaId.includes('cayambe') || areaId.includes('antisana') || areaId.includes('sangay') || areaId.includes('pululahua')) {
      return 'cotopaxi-buffer';
    }
    return 'relief-podocarpus';
  };

  const categoryOptions = [
    { label: 'Todas las Áreas (78)', value: 'all' },
    { label: 'Parques Nacionales', value: 'Parque Nacional' },
    { label: 'Reservas Ecológicas', value: 'Reserva Ecológica' },
    { label: 'Reservas Biológicas', value: 'Reserva Biológica' },
    { label: 'Refugios de Vida Silvestre', value: 'Refugio de Vida Silvestre' },
    { label: 'Reservas Prod. Fauna', value: 'Reserva de Producción de Fauna' },
    { label: 'Reservas Geobotánicas', value: 'Reserva Geobotánica' },
    { label: 'Áreas de Recreación', value: 'Área Nacional de Recreación' },
  ];

  const visibleAreas = PROTECTED_AREAS.filter((area) => {
    if (activeCategoryTab === 'all') return true;
    return area.category === activeCategoryTab;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER EXPLANATION */}
      <div className="liquid-glass-card rounded-3xl p-6 border border-white/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#15803d]">
              Visor Cartográfico Satelital de Alta Resolución
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-500">Esri World Imagery</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Explorador Continental de Áreas Protegidas del Ecuador
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Control antifatiga cognitiva: El visor renderiza <strong>únicamente una entidad poligonal a la vez</strong> con trazo verde esmeralda (<code className="text-[#15803d] font-bold">#15803d</code>) y relleno translúcido (<code className="text-slate-700">opacity: 0.2</code>) para permitir la inspección geomorfológica del relieve satelital subyacente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
          {/* 2D vs 3D View Toggle */}
          <div className="p-1 rounded-xl bg-white/80 border border-slate-200 flex items-center gap-1 shadow-sm">
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === '2d'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Satelital 2D (Esri)
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === '3d'
                  ? 'bg-[#0369a1] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              Modelo 3D (WebGL)
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-[#15803d]">
              <Compass className="w-4 h-4" /> Proyección Geodésica
            </div>
            <div className="mt-0.5">WGS84 UTM 17S / 18S</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Ecuador Continental</div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CATEGORY SELECTOR CAROUSEL (Ruta /mapa requirement) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryOptions.map((cat) => {
          const isActive = activeCategoryTab === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategoryTab(cat.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#15803d] text-white border-[#15803d] shadow-sm'
                  : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* QUICK HORIZONTAL AREA SELECTOR BADGES */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold uppercase text-slate-500 shrink-0 mr-1">
          Áreas en categoría ({visibleAreas.length}):
        </span>
        {visibleAreas.slice(0, 10).map((area) => {
          const isSelected = selectedAreaId === area.id;
          return (
            <button
              key={area.id}
              onClick={() => onSelectArea(area.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#0369a1] text-white border-[#0369a1] shadow-sm'
                  : 'bg-white/60 hover:bg-white text-slate-700 border-slate-200'
              }`}
            >
              {area.name}
            </button>
          );
        })}
        {visibleAreas.length > 10 && (
          <span className="text-[11px] text-slate-400 italic shrink-0">
            +{visibleAreas.length - 10} más en el selector principal
          </span>
        )}
      </div>

      {/* INTERACTIVE LEAFLET MAP CANVAS OR 3D WEBGL VIEWER */}
      {viewMode === '2d' ? (
        <InteractiveMap 
          selectedAreaId={selectedAreaId}
          onSelectArea={onSelectArea}
        />
      ) : (
        <div className="space-y-4">
          <div className="liquid-glass rounded-2xl p-4 border border-white/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                ELEVACIÓN Y MODELADO DEL RELIEVE 3D
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Modelo Tridimensional del Área: {PROTECTED_AREAS.find(a => a.id === selectedAreaId)?.name}
              </h3>
            </div>
            <button
              onClick={() => setViewMode('2d')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
            >
              Volver a Mapa 2D
            </button>
          </div>

          <Thematic3DViewer 
            theme={get3DThemeForArea(selectedAreaId)}
            title={`Relieve 3D: ${PROTECTED_AREAS.find(a => a.id === selectedAreaId)?.name || 'Área Protegida'}`}
            subtitle={`Provincia: ${PROTECTED_AREAS.find(a => a.id === selectedAreaId)?.province} · Extensión: ${PROTECTED_AREAS.find(a => a.id === selectedAreaId)?.extensionHa?.toLocaleString('es-EC')} ha`}
            height="560px"
          />
        </div>
      )}
    </div>
  );
};
