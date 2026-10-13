import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ProtectedArea, CategoryType } from '../types';
import { PROTECTED_AREAS } from '../data/protectedAreas';
import { 
  MapPin, 
  Layers, 
  Compass, 
  Maximize2, 
  Trees, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  Info, 
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';

interface InteractiveMapProps {
  selectedAreaId?: string;
  onSelectArea?: (areaId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedAreaId,
  onSelectArea
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentPolygonRef = useRef<L.Polygon | null>(null);
  const currentMarkerRef = useRef<L.Marker | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);

  // Default to Yasuni if none selected
  const [currentId, setCurrentId] = useState<string>(selectedAreaId || PROTECTED_AREAS[0].id);
  const [baseMapType, setBaseMapType] = useState<'satellite' | 'topographic'>('satellite');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [activeFichaTab, setActiveFichaTab] = useState<'general' | 'biodiversidad' | 'amenazas'>('general');

  // Selected area object
  const currentArea = PROTECTED_AREAS.find((a) => a.id === currentId) || PROTECTED_AREAS[0];

  // Category list for filter
  const categories: { label: string; value: string }[] = [
    { label: 'Todas las Categorías (78 continentales)', value: 'all' },
    { label: 'Parques Nacionales', value: 'Parque Nacional' },
    { label: 'Reservas Ecológicas', value: 'Reserva Ecológica' },
    { label: 'Reservas de Producción de Fauna', value: 'Reserva de Producción de Fauna' },
    { label: 'Reservas Biológicas', value: 'Reserva Biológica' },
    { label: 'Refugios de Vida Silvestre', value: 'Refugio de Vida Silvestre' },
    { label: 'Reservas Geobotánicas', value: 'Reserva Geobotánica' },
    { label: 'Áreas Nacionales de Recreación', value: 'Área Nacional de Recreación' },
  ];

  const filteredAreas = PROTECTED_AREAS.filter((area) => {
    if (selectedCategoryFilter === 'all') return true;
    return area.category === selectedCategoryFilter;
  });

  // Handle prop change
  useEffect(() => {
    if (selectedAreaId && selectedAreaId !== currentId) {
      setCurrentId(selectedAreaId);
    }
  }, [selectedAreaId]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Fix default icons in Leaflet
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Continental Ecuador center: roughly -1.5, -78.5
      const map = L.map(mapContainerRef.current, {
        center: currentArea.coordinates,
        zoom: currentArea.zoomLevel,
        zoomControl: false, // We place custom zoom or top-right
        attributionControl: true,
      });

      // Add zoom control top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Add scale control
      L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(map);

      // Track mouse coordinates for educational GIS context
      map.on('mousemove', (e: L.LeafletMouseEvent) => {
        setMouseCoords({
          lat: Number(e.latlng.lat.toFixed(4)),
          lng: Number(e.latlng.lng.toFixed(4)),
        });
      });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing tile layer if any
    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
    }

    // Set Base Layer
    if (baseMapType === 'satellite') {
      // Esri World Imagery as required by prompt
      baseTileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Esri World Imagery, Maxar, Earthstar Geographics, USDA FSA, USGS, Aerogrid, IGN',
          maxZoom: 18,
        }
      ).addTo(map);
    } else {
      // Clean topographic / voyager cartography
      baseTileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 19,
        }
      ).addTo(map);
    }

    // Cleanup on unmount
    return () => {
      // We keep the map instance alive for the session
    };
  }, [baseMapType]);

  // Update Polygon and Marker when currentArea changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !currentArea) return;

    // Remove existing layers (STRICT ANTI-COGNITIVE FATIGUE: only ONE area at a time)
    if (currentPolygonRef.current) {
      map.removeLayer(currentPolygonRef.current);
      currentPolygonRef.current = null;
    }
    if (currentMarkerRef.current) {
      map.removeLayer(currentMarkerRef.current);
      currentMarkerRef.current = null;
    }

    // Custom marker icon with Green Jungle SVG pin
    const customIcon = L.divIcon({
      className: 'custom-leaflet-pin',
      html: `
        <div style="
          background: #15803d;
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid #ffffff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background: #ffffff;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add polygon with prompt requirements:
    // Trazo verde brillante (#15803d) y relleno translúcido (fillOpacity: 0.2)
    const polygon = L.polygon(currentArea.polygon, {
      color: '#15803d',
      weight: 3,
      opacity: 0.95,
      fillColor: '#15803d',
      fillOpacity: 0.2, // Keeps relief satellite visible underneath!
      dashArray: undefined,
    }).addTo(map);

    polygon.bindPopup(`
      <div style="padding: 4px; font-family: inherit;">
        <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #15803d; letter-spacing: 0.05em;">${currentArea.category}</span>
        <h4 style="margin: 2px 0 6px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${currentArea.name}</h4>
        <div style="font-size: 12px; color: #475569; margin-bottom: 4px;"><strong>Provincia:</strong> ${currentArea.province}</div>
        <div style="font-size: 12px; color: #475569; margin-bottom: 4px;"><strong>Superficie:</strong> ${currentArea.extensionHa.toLocaleString()} ha</div>
        <div style="font-size: 11px; color: #0369a1; margin-top: 6px;">Código Oficial: ${currentArea.snapCode}</div>
      </div>
    `);

    // Add centroid marker
    const marker = L.marker(currentArea.coordinates, { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div style="padding: 4px;">
        <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #15803d;">${currentArea.name}</h4>
        <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Centroide: [${currentArea.coordinates[0]}, ${currentArea.coordinates[1]}]</p>
      </div>
    `);

    currentPolygonRef.current = polygon;
    currentMarkerRef.current = marker;

    // Smooth flyTo animation as required
    map.flyTo(currentArea.coordinates, currentArea.zoomLevel, {
      duration: 1.4,
      easeLinearity: 0.25,
    });
  }, [currentId, currentArea]);

  // Handle area dropdown selection
  const handleAreaChange = (id: string) => {
    setCurrentId(id);
    if (onSelectArea) {
      onSelectArea(id);
    }
  };

  // Copy coordinates function
  const handleCopyCoords = () => {
    const text = `WGS84: Lat ${currentArea.coordinates[0]}, Long ${currentArea.coordinates[1]} (${currentArea.name})`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Recenter map
  const handleRecenter = () => {
    if (mapInstanceRef.current && currentArea) {
      mapInstanceRef.current.flyTo(currentArea.coordinates, currentArea.zoomLevel, { duration: 1 });
    }
  };

  return (
    <div className="relative w-full h-[760px] md:h-[820px] rounded-3xl overflow-hidden border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
      {/* MAP CANVAS */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* TOP CONTROLS BAR: Dropdowns & View switcher (Liquid Glass style) */}
      <div className="absolute top-4 left-4 right-16 z-20 flex flex-wrap items-center gap-3 pointer-events-none">
        {/* Anti-fatigue Area Selector */}
        <div className="pointer-events-auto liquid-glass-card rounded-2xl p-2 px-3 shadow-lg flex items-center gap-2 max-w-md w-full sm:w-auto">
          <MapPin className="w-5 h-5 text-[#15803d] shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <label htmlFor="area-select" className="text-[10px] font-bold uppercase tracking-wider text-[#15803d]">
              Área Protegida Seleccionada (1 a la vez)
            </label>
            <select
              id="area-select"
              value={currentId}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer truncate"
            >
              {filteredAreas.map((area) => (
                <option key={area.id} value={area.id} className="text-slate-900 bg-white">
                  {area.name} ({area.province})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="pointer-events-auto liquid-glass-card rounded-2xl p-2 px-3 shadow-lg flex items-center gap-2 hidden lg:flex">
          <span className="text-[11px] font-semibold text-slate-600">Filtrar por:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value} className="text-slate-900 bg-white">
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Base Layer Switcher (Satellite vs Carto) */}
        <div className="pointer-events-auto liquid-glass-card rounded-2xl p-1.5 shadow-lg flex items-center gap-1">
          <button
            onClick={() => setBaseMapType('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              baseMapType === 'satellite'
                ? 'bg-[#15803d] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Esri Satélite
          </button>
          <button
            onClick={() => setBaseMapType('topographic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              baseMapType === 'topographic'
                ? 'bg-[#0369a1] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Topográfico
          </button>
        </div>
      </div>

      {/* FLOATING TECHNICAL SHEET (FICHA TÉCNICA FLOTANTE) - LIQUID GLASS */}
      <div className="absolute bottom-6 left-4 right-4 md:right-auto md:left-6 md:w-[460px] z-20 pointer-events-auto">
        <div className="liquid-glass rounded-3xl p-5 border border-white/80 shadow-[0_12px_36px_rgba(31,38,135,0.22)] backdrop-blur-xl">
          {/* Header of Ficha */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-200/60 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803d]">
                  {currentArea.category}
                </span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-xs font-medium text-slate-500">Región {currentArea.region}</span>
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
                {currentArea.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Provincia: <strong className="text-slate-800">{currentArea.province}</strong> · Creado en {currentArea.creationYear}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleRecenter}
                title="Centrar mapa en este polígono"
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm transition-transform active:scale-95"
              >
                <Maximize2 className="w-4 h-4 text-[#15803d]" />
              </button>
              <button
                onClick={handleCopyCoords}
                title="Copiar coordenadas WGS84"
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm transition-transform active:scale-95"
              >
                {copiedCoords ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-2 my-3">
            <div className="bg-white/60 rounded-xl p-2.5 border border-white/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Superficie Oficial</span>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">
                {currentArea.extensionHa.toLocaleString()} <span className="text-xs font-semibold text-slate-600">ha</span>
              </p>
            </div>
            <div className="bg-white/60 rounded-xl p-2.5 border border-white/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Registro SNAP</span>
              <p className="text-sm font-extrabold text-[#0369a1] mt-0.5">
                {currentArea.snapCode}
              </p>
            </div>
          </div>

          {/* Tabs inside Ficha */}
          <div className="flex items-center gap-1 border-b border-slate-200/60 pb-2 mb-3">
            <button
              onClick={() => setActiveFichaTab('general')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeFichaTab === 'general'
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Descripción
            </button>
            <button
              onClick={() => setActiveFichaTab('biodiversidad')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeFichaTab === 'biodiversidad'
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Biodiversidad ({currentArea.keySpecies.length})
            </button>
            <button
              onClick={() => setActiveFichaTab('amenazas')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeFichaTab === 'amenazas'
                  ? 'bg-[#b45309] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Amenazas
            </button>
          </div>

          {/* Ficha Content based on Tab */}
          <div className="max-h-48 overflow-y-auto pr-1 text-xs text-slate-700 space-y-2.5">
            {activeFichaTab === 'general' && (
              <>
                <p className="leading-relaxed text-slate-700">{currentArea.description}</p>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Ecosistemas Principales:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {currentArea.mainEcosystems.map((eco, idx) => (
                      <li key={idx} className="truncate">{eco}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeFichaTab === 'biodiversidad' && (
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Especies Emblemáticas Registradas:</span>
                <div className="space-y-1.5">
                  {currentArea.keySpecies.map((species, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 bg-white/70 rounded-lg border border-white/60">
                      <div>
                        <div className="font-semibold text-slate-900">{species.commonName}</div>
                        <div className="italic text-[11px] text-slate-500">{species.scientificName}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        species.status === 'En Peligro Crítico'
                          ? 'bg-rose-100 text-rose-800'
                          : species.status === 'En Peligro'
                          ? 'bg-orange-100 text-orange-800'
                          : species.status === 'Vulnerable'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {species.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFichaTab === 'amenazas' && (
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-rose-800 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Factores de Presión Antrópica:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {currentArea.threats.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="font-bold text-[#0369a1] flex items-center gap-1 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0369a1]" /> Objetivos de Manejo:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {currentArea.conservationObjectives.map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer of Ficha: Visualizer note */}
          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-[#15803d] font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#15803d]/30 border border-[#15803d] inline-block" />
              Trazo verde (#15803d) · Relieve satelital visible
            </span>
            <span>WGS84 UTM 17S/18S</span>
          </div>
        </div>
      </div>

      {/* BOTTOM-RIGHT COORDINATE HUD */}
      <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-3">
        <div className="liquid-glass-card rounded-xl py-1.5 px-3 shadow-md text-[11px] text-slate-700 font-mono flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#b45309]" />
          <span>
            {mouseCoords
              ? `Cursor: Lat ${mouseCoords.lat}°, Long ${mouseCoords.lng}°`
              : `Centro: Lat ${currentArea.coordinates[0]}°, Long ${currentArea.coordinates[1]}°`}
          </span>
        </div>
      </div>
    </div>
  );
};
