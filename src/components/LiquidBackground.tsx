import React from 'react';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Base warm archival cartographic paper */}
      <div className="absolute inset-0 bg-[#f7f4ed]" />

      {/* Subtle topographic contour vector background */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.045]" 
        xmlns="http://www.w3.org/2000/svg"
        patternUnits="userSpaceOnUse"
      >
        <defs>
          <pattern id="carto-topo-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M 0,40 Q 40,20 80,40 T 160,40" fill="none" stroke="#15803d" strokeWidth="1" />
            <path d="M 0,80 Q 40,65 80,80 T 160,80" fill="none" stroke="#0369a1" strokeWidth="1" />
            <path d="M 0,120 Q 40,140 80,120 T 160,120" fill="none" stroke="#b45309" strokeWidth="1" />
            <circle cx="80" cy="80" r="1.5" fill="#475569" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#carto-topo-grid)" />
      </svg>

      {/* Subtle hypsometric washes representing Ecuadorian natural regions (anchored, not bouncing) */}
      {/* Amazon basin / Oriente tint (Forest Green) */}
      <div 
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
        style={{ backgroundColor: '#15803d' }}
      />

      {/* Pacific coastline tint (Ocean Indigo) */}
      <div 
        className="absolute bottom-10 -left-28 w-[580px] h-[580px] rounded-full blur-[140px] opacity-15"
        style={{ backgroundColor: '#0369a1' }}
      />

      {/* Andean Paramo tint (Warm Clay / Amber) */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-full blur-[160px] opacity-10"
        style={{ backgroundColor: '#b45309' }}
      />

      {/* Graticule reference coordinate ticks (Cartographic study atlas realism) */}
      <div className="absolute top-2 left-4 text-[9px] font-mono tracking-widest text-stone-400 opacity-60">
        GRID: SIRGAS-EC / WGS84 · ZONAS UTM 17S-18S
      </div>
      <div className="absolute top-2 right-4 text-[9px] font-mono tracking-widest text-stone-400 opacity-60">
        LAT 00°00'00" · LONG 78°30'00"W
      </div>
      <div className="absolute bottom-2 left-4 text-[9px] font-mono tracking-widest text-stone-400 opacity-60">
        ESCALA REGIONAL 1:1.000.000 · ECUADOR CONTINENTAL
      </div>
      <div className="absolute bottom-2 right-4 text-[9px] font-mono tracking-widest text-stone-400 opacity-60">
        HOJA NACIONAL DE BIODIVERSIDAD SNAP
      </div>
    </div>
  );
};
