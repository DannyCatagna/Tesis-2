import React, { useState, lazy, Suspense } from 'react';
import { InteractiveMap } from './InteractiveMap';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { Map, Box, ArrowUpRight } from 'lucide-react';
const Scene = lazy(() => import('./Thematic3DViewer').then(module => ({ default: module.Thematic3DViewer })));

interface TabMapaProps { selectedAreaId: string; onSelectArea: (id: string) => void; }
export const TabMapa: React.FC<TabMapaProps> = ({ selectedAreaId, onSelectArea }) => {
  const [view, setView] = useState<'map' | 'model'>('map');
  const area = PROTECTED_AREAS.find(item => item.id === selectedAreaId) || PROTECTED_AREAS[0];
  const theme = area.region === 'Amazonía' ? 'yasuni-amazon' : area.region === 'Costa' ? 'mangrove-churute' : area.id.includes('cotopaxi') ? 'cotopaxi-buffer' : 'relief-podocarpus';
  return <div className="atlas-lab">
    <div className="atlas-page-heading"><div><span className="atlas-eyebrow">LABORATORIO DE EXPLORACIÓN</span><h1>Lee el territorio.<br /><em>Encuentra conexiones.</em></h1><p>Selecciona un lugar, observa sus patrones y registra una explicación que puedas contrastar con evidencia.</p></div><div className="atlas-segments"><button aria-pressed={view === 'map'} onClick={() => setView('map')}><Map size={17} /> Mapa y bitácora</button><button aria-pressed={view === 'model'} onClick={() => setView('model')}><Box size={17} /> Modelo conceptual</button></div></div>
    {view === 'map' ? <InteractiveMap selectedAreaId={selectedAreaId} onSelectArea={onSelectArea} /> : <section className="atlas-model"><div className="atlas-map-context"><strong>Modelo ilustrativo, no elevación real.</strong> Esta escena ayuda a discutir relaciones espaciales. No representa un modelo digital del terreno del área seleccionada y no permite obtener mediciones geográficas.</div><Suspense fallback={<p>Cargando modelo conceptual…</p>}><Scene theme={theme} title="Modelo conceptual del paisaje" subtitle={'Contexto de estudio: ' + area.name} height="480px" /></Suspense><button className="atlas-text-link" onClick={() => setView('map')}>Volver al mapa y registrar mis hallazgos <ArrowUpRight size={17} /></button></section>}
  </div>;
};
