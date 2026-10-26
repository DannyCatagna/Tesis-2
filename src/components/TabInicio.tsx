import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Compass, Leaf, Mountain, Waves, CheckCircle2, Globe2 } from 'lucide-react';
import { DIDACTIC_GUIDES } from '../data/guides';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { AtlasMap } from './AtlasMap';

interface TabInicioProps {
  onNavigateTab: (index: number) => void;
  onOpenIntroModal: () => void;
  onOpenGuideModal: (id: string) => void;
  onExploreArea: (id: string) => void;
  completedGuideIds: string[];
}
export const TabInicio: React.FC<TabInicioProps> = ({ onNavigateTab, onOpenIntroModal, onOpenGuideModal, onExploreArea, completedGuideIds }) => {
  const [areaId, setAreaId] = useState(PROTECTED_AREAS[0].id);
  const area = PROTECTED_AREAS.find(item => item.id === areaId) || PROTECTED_AREAS[0];
  const next = DIDACTIC_GUIDES.find(guide => !completedGuideIds.includes(guide.id)) || DIDACTIC_GUIDES[0];
  const journeys = [
    { title: 'Comprende el territorio', text: 'Relaciona biodiversidad, ecosistemas y conservación con los conceptos de las unidades 2 y 3.', icon: BookOpen, action: () => onNavigateTab(1), label: 'Conocer las unidades' },
    { title: 'Explora y pregunta', text: 'Ubica un área, cambia el mapa base y distingue lo que observas de lo que todavía necesitas comprobar.', icon: Compass, action: () => onNavigateTab(2), label: 'Investigar en el mapa' },
    { title: 'Construye tu evidencia', text: 'Registra tus hallazgos, consulta la rúbrica y explica qué decisiones tomarías para conservar el territorio.', icon: CheckCircle2, action: () => onNavigateTab(3), label: 'Ver mi aprendizaje' },
  ];
  return <div className="atlas-home">
    <section className="atlas-hero">
      <div className="atlas-hero-copy">
        <span className="atlas-eyebrow"><span /> BIOGEOGRAFÍA EN EL AULA</span>
        <h1>El territorio<br />también <em>enseña.</em></h1>
        <p>Explora la biodiversidad del Ecuador, conecta los mapas con la ciencia y transforma tus observaciones en ideas para conservar.</p>
        <div className="atlas-actions">
          <button className="atlas-button atlas-button-primary" onClick={() => onNavigateTab(2)}>Explorar el mapa <ArrowUpRight size={18} /></button>
          <button className="atlas-button atlas-button-plain" onClick={() => onOpenGuideModal(next.id)}>{completedGuideIds.length ? 'Continuar aprendiendo' : 'Comenzar mi recorrido'} <ArrowRight size={18} /></button>
        </div>
        <div className="atlas-hero-foot"><span><BookOpen size={15} /> {DIDACTIC_GUIDES.length} guías de aprendizaje</span><span><Globe2 size={15} /> Unidades 2 y 3</span></div>
      </div>
      <div className="atlas-hero-atlas">
        <div className="atlas-map-heading"><span><span className="atlas-live-dot" /> ATLAS INTERACTIVO</span><span>ECUADOR CONTINENTAL ↗</span></div>
        <AtlasMap areaId={areaId} onSelectArea={setAreaId} overview />
        <div className="atlas-map-caption"><div><small>UN LUGAR PARA HACER PREGUNTAS</small><strong>{area.name}</strong><span>{area.region} · {area.province}</span></div><button onClick={() => onExploreArea(area.id)} aria-label={'Explorar ' + area.name}><ArrowUpRight size={23} /></button></div>
      </div>
    </section>
    <div className="atlas-context-strip"><span>OBSERVAR</span><span className="atlas-line" /><span>COMPRENDER</span><span className="atlas-line" /><span>CONSERVAR</span><p>Química y Biología · Aprendizaje con Sistemas de Información Geográfica</p></div>
    <section className="atlas-section" aria-labelledby="journey-heading">
      <div className="atlas-section-heading"><div><span className="atlas-eyebrow">TU RUTA DE APRENDIZAJE</span><h2 id="journey-heading">De la curiosidad a la evidencia.</h2></div><button className="atlas-text-link" onClick={onOpenIntroModal}>¿Es tu primer mapa? <ArrowUpRight size={16} /></button></div>
      <div className="atlas-journeys">{journeys.map((item, index) => <article className="atlas-journey" key={item.title}><div className="atlas-journey-top"><item.icon size={25} /><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p><button className="atlas-text-link" onClick={item.action}>{item.label}<ArrowRight size={17} /></button></article>)}</div>
    </section>
    <section className="atlas-section atlas-fieldwork" aria-labelledby="field-heading">
      <div className="atlas-section-heading"><div><span className="atlas-eyebrow">APRENDER HACIENDO</span><h2 id="field-heading">Un mapa. Muchas preguntas.</h2></div><button className="atlas-text-link" onClick={() => onNavigateTab(1)}>Todas las guías <ArrowUpRight size={16} /></button></div>
      <div className="atlas-guide-grid">{DIDACTIC_GUIDES.map((guide, index) => {
        const icons = [Mountain, Waves, Leaf, Compass]; const Icon = icons[index % icons.length];
        return <button className={'atlas-guide-card atlas-guide-tone-' + index} key={guide.id} onClick={() => onOpenGuideModal(guide.id)}>
          <div className="atlas-guide-art"><Icon size={72} strokeWidth={0.8} /><span>GUÍA 0{guide.number}</span>{completedGuideIds.includes(guide.id) && <CheckCircle2 className="atlas-guide-done" size={23} aria-label="Completada" />}</div>
          <div className="atlas-guide-content"><small>{guide.unitId === 'unidad-2' ? 'ECUADOR MEGADIVERSO' : 'CONSERVACIÓN Y ÁREAS PROTEGIDAS'}</small><h3>{guide.title}</h3><span>{guide.estimatedTime}<ArrowUpRight size={17} /></span></div>
        </button>;
      })}</div>
    </section>
    <section className="atlas-discovery-banner"><div><span className="atlas-eyebrow">TU BITÁCORA, TUS HALLAZGOS</span><h2>Aprender es mirar<br />con nuevas preguntas.</h2><p>Elige un lugar, anota una observación y formula una hipótesis. Tu bitácora se guarda en este navegador y puedes descargarla para compartirla en clase.</p></div><button className="atlas-button atlas-button-light" onClick={() => onNavigateTab(2)}>Crear mi primera observación <ArrowUpRight size={18} /></button></section>
    <section className="atlas-section" aria-labelledby="resources-heading"><div className="atlas-section-heading"><div><span className="atlas-eyebrow">AMPLÍA TU EXPLORACIÓN</span><h2 id="resources-heading">Fuentes para ir más allá.</h2></div><span className="atlas-small-note">Se abren en una nueva pestaña</span></div>
      <div className="atlas-resource-grid">
        <a href="https://ecuador.mapbiomas.org/" target="_blank" rel="noopener noreferrer"><span>01 / COBERTURA DEL SUELO</span><h3>MapBiomas Ecuador <ArrowUpRight size={19} /></h3><p>Consulta mapas y metodología para investigar los cambios del territorio.</p></a>
        <a href="https://worldview.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer"><span>02 / OBSERVACIÓN DE LA TIERRA</span><h3>NASA Worldview <ArrowUpRight size={19} /></h3><p>Explora imágenes por fecha y pregunta qué cambios puedes observar.</p></a>
        <a href="https://earth.google.com/web/" target="_blank" rel="noopener noreferrer"><span>03 / EXPLORACIÓN DEL RELIEVE</span><h3>Google Earth <ArrowUpRight size={19} /></h3><p>Reconoce paisajes y relaciona su forma con tus preguntas de investigación.</p></a>
      </div>
    </section>
  </div>;
};
