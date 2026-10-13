import React from 'react';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Base soft canvas color */}
      <div className="absolute inset-0 bg-[#f5e7da] opacity-90" />

      {/* Subtle topographic dot/mesh pattern */}
      <div className="absolute inset-0 topo-pattern opacity-60" />

      {/* Orb 1: Verde Selva (#15803d) - Top-left / center */}
      <div 
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-[110px] opacity-25 orb-animate-1"
        style={{ backgroundColor: '#15803d' }}
      />

      {/* Orb 2: Azul Océano (#0369a1) - Top-right / coast */}
      <div 
        className="absolute top-1/4 -right-36 w-[560px] h-[560px] rounded-full blur-[125px] opacity-25 orb-animate-2"
        style={{ backgroundColor: '#0369a1' }}
      />

      {/* Orb 3: Naranja Páramo (#b45309) - Bottom-center / andes */}
      <div 
        className="absolute -bottom-36 left-1/3 w-[620px] h-[620px] rounded-full blur-[130px] opacity-20 orb-animate-3"
        style={{ backgroundColor: '#b45309' }}
      />

      {/* Subtle secondary ambient orb for depth */}
      <div 
        className="absolute top-2/3 -left-20 w-[420px] h-[420px] rounded-full blur-[100px] opacity-15"
        style={{ backgroundColor: '#15803d' }}
      />
    </div>
  );
};
