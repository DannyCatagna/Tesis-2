import React, { useState } from 'react';
import { InteractiveMap } from './InteractiveMap';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { CategoryType } from '../types';
import { Trees, Compass, Filter, Sparkles, MapPin, Layers, Info } from 'lucide-react';

interface TabMapaProps {
  selectedAreaId: string;
  onSelectArea: (areaId: string) => void;
}

export const TabMapa: React.FC<TabMapaProps> = ({
  selectedAreaId,
  onSelectArea,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');

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

        <div className="p-3 rounded-2xl bg-white/70 border border-slate-200 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-[#15803d]">
            <Compass className="w-4 h-4" /> Proyección Geodésica
          </div>
          <div className="mt-0.5">WGS84 UTM 17S / 18S</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Ecuador Continental</div>
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

      {/* INTERACTIVE LEAFLET MAP CANVAS & LIQUID GLASS FICHA */}
      <InteractiveMap 
        selectedAreaId={selectedAreaId}
        onSelectArea={onSelectArea}
      />
    </div>
  );
};
