import React, { useState } from 'react';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { AtlasMap } from './AtlasMap';
import { FieldNotebook } from './FieldNotebook';
import { MapPin, Search, ArrowUpRight, Copy } from 'lucide-react';

interface InteractiveMapProps { selectedAreaId?: string; onSelectArea?: (id: string) => void; }
export const InteractiveMap: React.FC<InteractiveMapProps> = ({ selectedAreaId, onSelectArea }) => {
  const [localId, setLocalId] = useState(PROTECTED_AREAS[0].id);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Todas');
  const [copied, setCopied] = useState('');
  const [detail, setDetail] = useState<'ecosystems' | 'species' | 'threats'>('ecosystems');
  const area = PROTECTED_AREAS.find(item => item.id === (selectedAreaId || localId)) || PROTECTED_AREAS[0];
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const visible = PROTECTED_AREAS.filter(item => (region === 'Todas' || item.region === region) && normalize(item.name + ' ' + item.province).includes(normalize(search)));
  const select = (id: string) => { setLocalId(id); onSelectArea?.(id); setCopied(''); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(area.coordinates.join(', ')); setCopied('Coordenadas copiadas.'); }
    catch { setCopied('No se pudo copiar. Puedes seleccionar las coordenadas de la ficha.'); }
  };
  return <div className="atlas-explorer">
    <div className="atlas-explorer-grid">
      <aside className="atlas-area-list" aria-label="Seleccionar un área de estudio">
        <div className="atlas-list-heading"><span className="atlas-eyebrow">01 / ELIGE UN LUGAR</span><h3>¿Dónde exploramos?</h3></div>
        <label className="atlas-search"><Search size={17} /><input aria-label="Buscar área o provincia" value={search} onChange={event => setSearch(event.target.value)} placeholder="Área o provincia…" /></label>
        <label className="atlas-region-label" htmlFor="atlas-region">Región</label><select id="atlas-region" value={region} onChange={event => setRegion(event.target.value)}>{['Todas', ...new Set(PROTECTED_AREAS.map(item => item.region))].map(item => <option key={item}>{item}</option>)}</select>
        <p className="atlas-results-count" role="status">{visible.length} lugares del catálogo educativo</p>
        <div className="atlas-area-results">{visible.map(item => <button className="atlas-area-option" key={item.id} onClick={() => select(item.id)} aria-pressed={item.id === area.id}><MapPin size={17} /><span><strong>{item.name}</strong><small>{item.region} · {item.province}</small></span><ArrowUpRight size={14} /></button>)}
        {!visible.length && <div className="atlas-empty"><p>No hay coincidencias. Prueba otra provincia o región.</p><button className="atlas-text-link" onClick={() => { setSearch(''); setRegion('Todas'); }}>Restablecer filtros</button></div>}</div>
      </aside>
      <div className="atlas-map-workspace">
        <div className="atlas-selected-heading"><div><span className="atlas-eyebrow">{area.region} / {area.category}</span><h2>{area.name}</h2></div><span className="atlas-location-tag"><MapPin size={14} /> {area.province}</span></div>
        <AtlasMap areaId={area.id} />
        <div className="atlas-map-underbar"><span>Referencia: {area.coordinates[0]}°, {area.coordinates[1]}°</span><button onClick={copy}><Copy size={14} /> Copiar coordenadas</button></div>
        {copied && <p className="atlas-small-note" role="status">{copied}</p>}
        <div className="atlas-map-context"><strong>Lee el mapa con criterio.</strong> Las imágenes son mapas base externos; su fecha y resolución varían. Los puntos y esquemas proceden del catálogo inicial y no son límites oficiales ni registros de presencia de especies. El visor usa Web Mercator; las coordenadas se muestran en WGS84.</div>
      </div>
    </div>
    <section className="atlas-area-detail" aria-label="Ficha del área">
      <div><span className="atlas-eyebrow">02 / CONECTA CON LA CIENCIA</span><h2>Del paisaje a la pregunta.</h2><p>¿Cómo pueden influir el relieve, el agua y las actividades humanas en la conservación de este lugar?</p><small>Ficha educativa del proyecto. Contrasta las afirmaciones, estados de conservación y datos con fuentes fechadas antes de usarlos como evidencia.</small></div>
      <div><div className="atlas-segments" role="group" aria-label="Contenido de la ficha">{([{ id: 'ecosystems', label: 'Ecosistemas' }, { id: 'species', label: 'Especies' }, { id: 'threats', label: 'Presiones' }] as const).map(item => <button key={item.id} aria-pressed={detail === item.id} onClick={() => setDetail(item.id)}>{item.label}</button>)}</div>
        <ul className="atlas-fact-list">{detail === 'ecosystems' && area.mainEcosystems.map(item => <li key={item}>{item}</li>)}{detail === 'species' && area.keySpecies.map(item => <li key={item.scientificName}><strong>{item.commonName}</strong><em>{item.scientificName}</em></li>)}{detail === 'threats' && area.threats.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
    <FieldNotebook key={area.id} area={area} />
  </div>;
};
