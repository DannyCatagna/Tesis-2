import React, { useState } from 'react';
import { Compass, Menu, X, ArrowUpRight, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: number;
  onSelectTab: (tabIndex: number) => void;
  completedGuideCount: number;
  totalGuidesCount: number;
  onOpenIntroModal: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, completedGuideCount, totalGuidesCount, onOpenIntroModal }) => {
  const [open, setOpen] = useState(false);
  const labels = ['Inicio', 'Aprender', 'Explorar el mapa', 'Mi aprendizaje', 'Fuentes'];
  const navigate = (index: number) => { onSelectTab(index); setOpen(false); };
  return <header className="atlas-header">
    <div className="atlas-topline"><span>UN AULA ABIERTA AL TERRITORIO</span><span>QUÍMICA · BIOLOGÍA · ECUADOR</span></div>
    <div className="atlas-nav">
      <button className="atlas-brand" onClick={() => navigate(0)} aria-label="BIOSIG Ecuador, inicio">
        <span className="atlas-brand-icon"><Compass size={26} /></span>
        <span><strong>BIO<span>SIG</span></strong><small>ECUADOR / APRENDER EXPLORANDO</small></span>
      </button>
      <nav className="atlas-desktop-nav" aria-label="Navegación principal">{labels.map((label, index) =>
        <button key={label} onClick={() => navigate(index)} aria-current={activeTab === index ? 'page' : undefined}>{label}</button>
      )}</nav>
      <button className="atlas-progress-link" onClick={() => navigate(3)} aria-label={'Mi progreso: ' + completedGuideCount + ' de ' + totalGuidesCount + ' guías'}>
        <span className="atlas-progress-dot" />{completedGuideCount}/{totalGuidesCount} guías <ArrowUpRight size={15} />
      </button>
      <button className="atlas-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="atlas-mobile-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="atlas-mobile-nav" id="atlas-mobile-nav" aria-label="Navegación móvil">
      {labels.map((label, index) => <button key={label} onClick={() => navigate(index)} aria-current={activeTab === index ? 'page' : undefined}>{label}<ArrowUpRight size={16} /></button>)}
      <button onClick={() => { setOpen(false); onOpenIntroModal(); }}><BookOpen size={16} /> Fundamentos cartográficos</button>
    </nav>}
  </header>;
};
