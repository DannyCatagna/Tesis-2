import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Map, 
  CheckSquare, 
  BookMarked, 
  Menu, 
  X, 
  Compass, 
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: number;
  onSelectTab: (tabIndex: number) => void;
  completedGuideCount: number;
  totalGuidesCount: number;
  onOpenIntroModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  completedGuideCount,
  totalGuidesCount,
  onOpenIntroModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', sublabel: 'Fundamentos SIG', icon: Home, index: 0 },
    { label: 'Panel Pedagógico', sublabel: 'Unidades 2 y 3', icon: BookOpen, index: 1 },
    { label: 'Visor Satelital', sublabel: 'Cartografía SNAP', icon: Map, index: 2 },
    { label: 'Seguimiento y Rúbricas', sublabel: 'Hojas de Trabajo', icon: CheckSquare, index: 3 },
    { label: 'Bibliografía APA', sublabel: 'Fuentes y Leyes', icon: BookMarked, index: 4 },
  ];

  const handleNavClick = (index: number) => {
    onSelectTab(index);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f7f4ed]/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Academic Department Bar */}
      <div className="w-full bg-stone-900 text-stone-300 text-[10px] tracking-wider py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-stone-100">LABORATORIO DE BIOGEOGRAFÍA & CARTOGRAFÍA COMPUTACIONAL</span>
            <span className="text-stone-500">·</span>
            <span className="hidden sm:inline">CÁTEDRA DE SISTEMAS DE INFORMACIÓN GEOGRÁFICA</span>
            <span className="sm:hidden">CÁTEDRA SIG</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-stone-400">
            <span className="hidden md:inline font-bold text-emerald-400">CIENCIAS EXPERIMENTALES</span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span>REPÚBLICA DEL ECUADOR</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity - Authentic institutional crest style */}
        <div 
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#15803d] border border-[#166534] flex items-center justify-center text-white shadow-sm transition-colors group-hover:bg-[#166534]">
            <Compass className="w-5 h-5 text-white stroke-[2.2]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-900 tracking-tight text-base sm:text-lg">
                BIOSIG
              </span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-[#15803d] uppercase">
                ECUADOR
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium leading-none hidden sm:block">
              Visor Pedagógico y Cartográfico de la Biodiversidad Continental
            </p>
          </div>
        </div>

        {/* Desktop consolidated navigation (Zero-Pill discipline) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.index;
            return (
              <button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`px-3 py-2 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                  isActive
                    ? 'border-[#15803d] text-stone-950 font-bold bg-stone-100/60'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#15803d]' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right utility toolbar */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenIntroModal}
            className="px-3 py-1.5 rounded text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-300 flex items-center gap-1.5 transition-colors"
            title="Consultar manual de geodesia y proyecciones cartográficas"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0369a1]" />
            <span>Manual Cartográfico</span>
          </button>

          {/* Unboxed progress indicator */}
          <div 
            onClick={() => handleNavClick(3)}
            className="cursor-pointer text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5 pl-2 border-l border-stone-300"
            title="Ver estado de las 4 prácticas del portafolio"
          >
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span>Portafolio: <strong className="text-stone-900 font-bold">{completedGuideCount}/{totalGuidesCount}</strong></span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-stone-700 hover:bg-stone-100 border border-stone-300"
          aria-label="Menú de navegación"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.index;
            return (
              <button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`w-full p-2.5 rounded text-xs font-semibold flex items-center justify-between text-left transition-colors ${
                  isActive
                    ? 'bg-stone-100 text-[#15803d] font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[11px] text-stone-400 font-normal">{item.sublabel}</span>
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-stone-200 flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIntroModal();
              }}
              className="flex-1 p-2 rounded text-stone-800 font-medium border border-stone-300 text-center hover:bg-stone-50"
            >
              Manual Cartográfico
            </button>
            <button
              onClick={() => handleNavClick(3)}
              className="flex-1 p-2 rounded text-[#15803d] font-bold border border-emerald-300 bg-emerald-50/50 text-center"
            >
              Portafolio: {completedGuideCount}/4
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
