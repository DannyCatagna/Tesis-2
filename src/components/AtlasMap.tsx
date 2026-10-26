import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { LocateFixed, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface AtlasMapProps {
  areaId: string;
  onSelectArea?: (id: string) => void;
  overview?: boolean;
}
export const AtlasMap: React.FC<AtlasMapProps> = ({ areaId, onSelectArea, overview = false }) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const selectionRef = useRef(onSelectArea);
  const [expanded, setExpanded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [tileStatus, setTileStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const area = PROTECTED_AREAS.find(item => item.id === areaId) || PROTECTED_AREAS[0];
  selectionRef.current = onSelectArea;

  useEffect(() => {
    if (!container.current) return;
    const map = L.map(container.current, { center: [-1.7, -78.4], zoom: 6, zoomControl: false, scrollWheelZoom: false });
    mapRef.current = map;
    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
    const resize = new ResizeObserver(() => map.invalidateSize());
    resize.observe(container.current);
    return () => { resize.disconnect(); map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    setTileStatus('loading');
    let failed = false;
    const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      noWrap: true,
      referrerPolicy: 'strict-origin-when-cross-origin',
    });
    let timeout: number | undefined;
    const watchLoading = () => {
      window.clearTimeout(timeout);
      failed = false;
      setTileStatus('loading');
      timeout = window.setTimeout(() => setTileStatus('error'), 15000);
    };
    layer.on('loading', watchLoading);
    layer.on('tileerror', () => { failed = true; setTileStatus('error'); });
    layer.on('load', () => { window.clearTimeout(timeout); if (!failed) setTileStatus('ready'); });
    layer.addTo(map);
    return () => { window.clearTimeout(timeout); layer.off(); layer.remove(); };
  }, [attempt]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const group = L.layerGroup().addTo(map);
    const items = overview ? PROTECTED_AREAS : [area];
    items.forEach(item => {
      const selected = item.id === area.id;
      const marker = L.circleMarker(item.coordinates, { radius: selected ? 9 : 5, color: '#fff', weight: 2, fillColor: selected ? '#be603c' : '#215b46', fillOpacity: 1 }).addTo(group);
      const tooltip = document.createElement('span');
      tooltip.textContent = item.name + ' · ubicación de referencia';
      marker.bindTooltip(tooltip);
      marker.on('click', () => selectionRef.current?.(item.id));
    });
    const outline = L.polygon(area.polygon, {
      className: 'atlas-selected-surface',
      color: '#166534',
      weight: 3,
      dashArray: '7 4',
      fillColor: '#22c55e',
      fillOpacity: 0.22,
    }).addTo(group);
    const label = document.createElement('span');
    label.textContent = area.name + ' · contorno orientativo, no oficial';
    outline.bindTooltip(label, { sticky: true });
    outline.bringToBack();
    if (!overview) map.fitBounds(outline.getBounds(), { padding: [28, 28], maxZoom: area.zoomLevel, animate: false });
    return () => { group.clearLayers(); group.remove(); };
  }, [area, overview]);

  const recenter = () => {
    if (overview) mapRef.current?.setView([-1.7, -78.4], 6);
    else mapRef.current?.fitBounds(L.latLngBounds(area.polygon), { padding: [28, 28], maxZoom: area.zoomLevel, animate: false });
  };
  return <div className={'atlas-map-frame' + (overview ? ' atlas-map-overview' : '') + (expanded ? ' atlas-map-expanded' : '')}>
    <div className="atlas-map-canvas" ref={container} aria-label="Mapa interactivo: usa los botones de zoom o arrastra para explorar" />
    <div className="atlas-map-tools" role="group" aria-label="Controles del mapa">
      <span className="atlas-open-map-label">OpenStreetMap</span>
      <button aria-pressed={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}{expanded ? 'Reducir mapa' : 'Ampliar mapa'}</button>
      <button onClick={recenter} aria-label="Volver a la vista inicial del mapa" title="Centrar mapa"><LocateFixed size={17} /></button>
    </div>
    <div className="atlas-map-status" role="status">
      {tileStatus === 'loading' && 'Cargando mapa…'}
      {tileStatus === 'ready' && (overview ? 'Mapa abierto · puntos de referencia educativos' : 'Mapa abierto · WGS84 · coordenadas en grados')}
      {tileStatus === 'error' && <span>No se pudo cargar parte del mapa. <button onClick={() => setAttempt(value => value + 1)}><RefreshCw size={13} /> Reintentar</button> · <a href={'https://www.openstreetmap.org/#map=' + area.zoomLevel + '/' + area.coordinates[0] + '/' + area.coordinates[1]} target="_blank" rel="noopener noreferrer">Abrir en OpenStreetMap</a></span>}
    </div>
    <div className="atlas-map-sketch" role="status"><span aria-hidden="true" style={{ width: 18, height: 14, flexShrink: 0, border: '2px dashed #166534', background: '#22c55e38' }} /><span><strong>{area.name}</strong> · Solo esta área está resaltada. Contorno orientativo, no oficial.</span></div>
  </div>;
};
