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
  Sparkles,
  Layers,
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
    { label: 'Mapa Satelital', sublabel: 'Visor Continental', icon: Map, index: 2 },
    { label: 'Evaluación', sublabel: 'Hojas y Rúbricas', icon: CheckSquare, index: 3 },
    { label: 'Bibliografía', sublabel: 'Normas APA 7', icon: BookMarked, index: 4 },
  ];

  const handleNavClick = (index: number) => {
    onSelectTab(index);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto liquid-glass rounded-2xl md:rounded-3xl border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* BRAND IDENTITY */}
        <div 
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#15803d] via-[#0369a1] to-[#b45309] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-900 tracking-tight text-base sm:text-lg">
                BIOSIG
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#15803d]/15 text-[#15803d] border border-[#15803d]/30">
                Ecuador
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">
              Visor Pedagógico & Cartográfico
            </p>
          </div>
        </div>

        {/* DESKTOP CONSOLIDATED NAV (SINGLE MENU WITHOUT DUPLICATION) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/60 p-1 rounded-2xl border border-white/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.index;
            return (
              <button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${
                  isActive 
                    ? item.index === 1 
                      ? 'text-[#15803d]' 
                      : item.index === 2 
                      ? 'text-[#0369a1]' 
                      : item.index === 3 
                      ? 'text-[#b45309]' 
                      : 'text-slate-900'
                    : 'text-slate-400'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTION: INTRO MODAL & PROGRESS INDICATOR */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenIntroModal}
            className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 text-xs font-bold border border-slate-200/80 shadow-sm flex items-center gap-1.5 transition-all"
            title="Ver teoría de geodesia y proyecciones UTM 17S/18S"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0369a1]" />
            <span>Teoría SIG</span>
          </button>

          <button
            onClick={() => handleNavClick(3)}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#15803d] border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Progreso de las Hojas de Trabajo"
          >
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span>{completedGuideCount}/{totalGuidesCount} Guías</span>
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/80 text-slate-700 border border-slate-200/80 shadow-sm"
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto liquid-glass rounded-2xl border border-white/80 p-3 shadow-lg space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.index;
            return (
              <button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between text-left transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] opacity-75 font-normal">{item.sublabel}</span>
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIntroModal();
              }}
              className="flex-1 p-2 rounded-xl bg-white/80 text-slate-800 text-xs font-bold border border-slate-200 text-center"
            >
              Teoría SIG & UTM
            </button>
            <button
              onClick={() => handleNavClick(3)}
              className="flex-1 p-2 rounded-xl bg-emerald-50 text-[#15803d] text-xs font-bold border border-emerald-200 text-center"
            >
              Progreso: {completedGuideCount}/4
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
