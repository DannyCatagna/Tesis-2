import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { LocateFixed, Layers, RefreshCw } from 'lucide-react';

interface AtlasMapProps {
  areaId: string;
  onSelectArea?: (id: string) => void;
  overview?: boolean;
}
export const AtlasMap: React.FC<AtlasMapProps> = ({ areaId, onSelectArea, overview = false }) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const selectionRef = useRef(onSelectArea);
  const [base, setBase] = useState<'map' | 'satellite'>('map');
  const [attempt, setAttempt] = useState(0);
  const [tileStatus, setTileStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [showSketch, setShowSketch] = useState(false);
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
    const layer = base === 'satellite'
      ? L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community', maxZoom: 18 })
      : L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', maxZoom: 19 });
    layer.on('loading', () => { failed = false; setTileStatus('loading'); });
    layer.on('tileerror', () => { failed = true; setTileStatus('error'); });
    layer.on('load', () => { if (!failed) setTileStatus('ready'); });
    layer.addTo(map);
    const timeout = window.setTimeout(() => setTileStatus(status => status === 'loading' ? 'error' : status), 15000);
    return () => { window.clearTimeout(timeout); layer.off(); layer.remove(); };
  }, [base, attempt]);

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
    if (showSketch && !overview) {
      const outline = L.polygon(area.polygon, { color: '#be603c', weight: 2, dashArray: '6 6', fillOpacity: 0.08 }).addTo(group);
      outline.bindTooltip('Esquema del catálogo: no es un límite oficial');
    }
    if (!overview) map.setView(area.coordinates, area.zoomLevel, { animate: false });
    return () => { group.clearLayers(); group.remove(); };
  }, [area, overview, showSketch]);

  const recenter = () => {
    if (overview) mapRef.current?.setView([-1.7, -78.4], 6);
    else mapRef.current?.setView(area.coordinates, area.zoomLevel);
  };
  return <div className={'atlas-map-frame' + (overview ? ' atlas-map-overview' : '')}>
    <div className="atlas-map-canvas" ref={container} aria-label="Mapa interactivo: usa los botones de zoom o arrastra para explorar" />
    <div className="atlas-map-tools" role="group" aria-label="Controles del mapa">
      <button aria-pressed={base === 'map'} onClick={() => setBase('map')}><Layers size={15} /> Mapa</button>
      <button aria-pressed={base === 'satellite'} onClick={() => setBase('satellite')}>Satélite</button>
      <button onClick={recenter} aria-label="Volver a la vista inicial del mapa" title="Centrar mapa"><LocateFixed size={17} /></button>
    </div>
    <div className="atlas-map-status" role="status">
      {tileStatus === 'loading' && 'Cargando mapa…'}
      {tileStatus === 'ready' && (overview ? 'Puntos de referencia · catálogo educativo' : 'WGS84 · latitud y longitud en grados')}
      {tileStatus === 'error' && <span>No se pudo cargar parte del mapa. <button onClick={() => setAttempt(value => value + 1)}><RefreshCw size={13} /> Reintentar</button></span>}
    </div>
    {!overview && <label className="atlas-map-sketch"><input type="checkbox" checked={showSketch} onChange={event => setShowSketch(event.target.checked)} /> Mostrar esquema orientativo (no oficial)</label>}
  </div>;
};
