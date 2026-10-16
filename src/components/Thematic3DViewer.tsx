import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCcw, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Eye, 
  Info, 
  Sliders, 
  Mountain, 
  Flame, 
  Waves, 
  ShieldCheck, 
  Compass,
  Sparkles
} from 'lucide-react';

export type Thematic3DType = 
  | 'relief-podocarpus' 
  | 'yasuni-amazon' 
  | 'mangrove-churute' 
  | 'cotopaxi-buffer';

interface Thematic3DViewerProps {
  theme: Thematic3DType;
  title?: string;
  subtitle?: string;
  height?: string;
  showCardHeader?: boolean;
}

export const Thematic3DViewer: React.FC<Thematic3DViewerProps> = ({
  theme,
  title,
  subtitle,
  height = '420px',
  showCardHeader = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'all' | 'contour' | 'markers' | 'buffer'>('all');
  const [showInfo, setShowInfo] = useState(false);
  const [bufferDistance, setBufferDistance] = useState<number>(3.5); // km for cotopaxi/buffer
  const [timeSlice, setTimeSlice] = useState<number>(2024); // for yasuni

  // References for animation and interactive updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const bufferRingRef = useRef<THREE.Mesh | null>(null);
  const thermalGroupRef = useRef<THREE.Group | null>(null);

  // Orbit state
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 45, theta: Math.PI / 4, phi: Math.PI / 3.2 });
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));

  // Determine metadata based on theme
  const getThemeMeta = () => {
    switch (theme) {
      case 'relief-podocarpus':
        return {
          defaultTitle: 'Modelo 3D de Gradiente Andino y Pisos Bioclimáticos',
          defaultSubtitle: 'Parque Nacional Podocarpus (Elevación 1.000 - 3.750 msnm | WGS84 UTM 17S)',
          icon: <Mountain className="w-4 h-4 text-[#15803d]" />,
          color: '#15803d',
          elevationRange: '1.000 a 3.750 msnm',
          biome: 'Bosque Montano Húmedo y Páramo Arbustivo',
          keyFeatures: [
            'Cliserie altitudinal: Páramo > Bosque de Neblina > Selva Piemontana',
            'Capa de nubes orográficas en el flanco oriental amazónico',
            'Puntos de presencia modelados: Podocarpus sprucei y Tremarctos ornatus'
          ]
        };
      case 'yasuni-amazon':
        return {
          defaultTitle: 'Simulador 3D de Presión Antrópica y Cuenca Amazónica',
          defaultSubtitle: 'Bloque 16 y Parque Nacional Yasuní (Relieve Fluvial y Eje Vial | WGS84 UTM 18S)',
          icon: <Flame className="w-4 h-4 text-[#b45309]" />,
          color: '#b45309',
          elevationRange: '190 a 320 msnm',
          biome: 'Bosque Húmedo Tropical de Tierra Firme e Inundable (Várzea)',
          keyFeatures: [
            'Eje vial de penetración con patrón en espina de pescado (herringbone)',
            'Anomalías térmicas simuladas (focos de calor MODIS/VIIRS)',
            'Meandro activo de río de aguas blancas con barras de sedimentos'
          ]
        };
      case 'mangrove-churute':
        return {
          defaultTitle: 'Modelo 3D Hidrológico de Estuario y Matriz de Manglar',
          defaultSubtitle: 'Reserva Ecológica Manglares Churute (Golfo de Guayaquil | WGS84 UTM 17S)',
          icon: <Waves className="w-4 h-4 text-[#0369a1]" />,
          color: '#0369a1',
          elevationRange: '0 a 650 msnm (Cerros de Churute)',
          biome: 'Manglar de Marea y Humedal Ramsar El Canclón',
          keyFeatures: [
            'Red de esteros y canales de marea con escorrentía salobre',
            'Polígono oficial del SNAP frente a piscinas camaroneras artificiales',
            'Relieve abrupto de colinas costeras rodeadas de llanura de marea'
          ]
        };
      case 'cotopaxi-buffer':
      default:
        return {
          defaultTitle: 'Estratovolcán Cotopaxi y Geometría de Zonas de Amortiguamiento',
          defaultSubtitle: 'Parque Nacional Cotopaxi (Elevación 3.400 - 5.897 msnm | WGS84 UTM 17S)',
          icon: <ShieldCheck className="w-4 h-4 text-[#0369a1]" />,
          color: '#0369a1',
          elevationRange: '3.400 a 5.897 msnm',
          biome: 'Páramo de Pajonal y Glaciar Ecuatorial',
          keyFeatures: [
            'Cono volcánico simétrico con casquete glaciar y quebradas laharíticas',
            'Anillos concéntricos de amortiguamiento territorial (2 km y 5 km)',
            'Transición hacia matriz agropecuaria comunitaria'
          ]
        };
    }
  };

  const meta = getThemeMeta();

  // Initialize and run Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf6f3ed); // Warm academic canvas matching liquid theme
    scene.fog = new THREE.FogExp2(0xf6f3ed, 0.012);

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 1, 300);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    dirLight.position.set(30, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 5;
    dirLight.shadow.camera.far = 120;
    dirLight.shadow.camera.left = -30;
    dirLight.shadow.camera.right = 30;
    dirLight.shadow.camera.top = 30;
    dirLight.shadow.camera.bottom = -30;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    fillLight.position.set(-25, 20, -25);
    scene.add(fillLight);

    // 5. Build Dynamic Thematic Group
    const dynamicGroup = new THREE.Group();
    dynamicGroupRef.current = dynamicGroup;
    scene.add(dynamicGroup);

    // -------------------------------------------------------------
    // BUILD SPECIFIC GEOMETRY BASED ON THEME
    // -------------------------------------------------------------
    if (theme === 'relief-podocarpus') {
      // ANDEAN GRADIENT TERRAIN (Podocarpus)
      const segments = 64;
      const terrainGeo = new THREE.PlaneGeometry(42, 42, segments, segments);
      terrainGeo.rotateX(-Math.PI / 2);

      const pos = terrainGeo.attributes.position;
      const colors: number[] = [];

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);

        // Height synthesis: steep eastern slope + high andean ridge
        const ridge1 = Math.sin(x * 0.12) * Math.cos(z * 0.1) * 3.5;
        const ridge2 = Math.sin((x + z) * 0.22) * 1.8;
        const slopeEast = (-x * 0.28); // higher on west, lower on east
        const microNoise = Math.sin(x * 0.6) * Math.cos(z * 0.6) * 0.6;

        let y = Math.max(0, ridge1 + ridge2 + slopeEast + microNoise + 4.5);
        pos.setY(i, y);

        // Bioclimatic coloring by elevation
        // y: 0..12 -> Amazonian lowland to high Andean peak
        const normY = Math.min(1, Math.max(0, y / 11));
        const color = new THREE.Color();
        if (normY > 0.82) {
          // Gélido / Roca / Nieve
          color.setRGB(0.92, 0.94, 0.97);
        } else if (normY > 0.58) {
          // Páramo pajonal (Golden amber / olive)
          color.setRGB(0.72 + (normY - 0.58) * 0.4, 0.55 + (normY - 0.58) * 0.3, 0.25);
        } else if (normY > 0.32) {
          // Bosque nublado montano (Deep lush emerald green)
          color.setRGB(0.12, 0.45 + (normY - 0.32) * 0.3, 0.24);
        } else {
          // Selva Piemontana / Valle (Warm dense jungle green)
          color.setRGB(0.08, 0.36, 0.18);
        }
        colors.push(color.r, color.g, color.b);
      }

      terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      terrainGeo.computeVertexNormals();

      const terrainMat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.85,
        metalness: 0.05,
        flatShading: false,
      });

      const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
      terrainMesh.receiveShadow = true;
      terrainMesh.castShadow = true;
      dynamicGroup.add(terrainMesh);

      // Orographic cloud layer hovering at intermediate elevation (Bosque Nublado)
      const cloudGeo = new THREE.PlaneGeometry(36, 20, 24, 24);
      cloudGeo.rotateX(-Math.PI / 2);
      const cloudPos = cloudGeo.attributes.position;
      for (let i = 0; i < cloudPos.count; i++) {
        const cx = cloudPos.getX(i);
        const cz = cloudPos.getZ(i);
        cloudPos.setY(i, 4.2 + Math.sin(cx * 0.3) * Math.cos(cz * 0.4) * 0.6);
      }
      cloudGeo.computeVertexNormals();

      const cloudMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.42,
        roughness: 0.9,
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudMesh.position.set(4, 0, 0);
      dynamicGroup.add(cloudMesh);

      // 3D Species Presence & Landmark Pins
      const createPin = (x: number, y: number, z: number, colorHex: number, label: string) => {
        const pinGroup = new THREE.Group();
        const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5);
        const poleMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.y = 1.25;
        pinGroup.add(pole);

        const headGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const headMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.3, emissive: colorHex, emissiveIntensity: 0.2 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 2.5;
        pinGroup.add(head);

        pinGroup.position.set(x, y, z);
        dynamicGroup.add(pinGroup);
      };

      createPin(-10, 8.8, -4, 0xb45309, 'Páramos de El Compadre (3.650 m)');
      createPin(-2, 4.6, 2, 0x15803d, 'Nicho Podocarpus sprucei (2.400 m)');
      createPin(10, 1.8, 6, 0x0369a1, 'Cuenca Río Bombuscaro (1.100 m)');

    } else if (theme === 'yasuni-amazon') {
      // AMAZONIAN CANOPY & DEFORESTATION (Yasuní)
      const segments = 60;
      const terrainGeo = new THREE.PlaneGeometry(44, 44, segments, segments);
      terrainGeo.rotateX(-Math.PI / 2);

      const pos = terrainGeo.attributes.position;
      const colors: number[] = [];

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);

        // Lowland undulating rolling hills (colinas bajas amazónicas)
        const hill = Math.sin(x * 0.2) * Math.cos(z * 0.25) * 1.2;
        // Meandering river depression
        const riverPathZ = Math.sin(x * 0.15) * 7;
        const distToRiver = Math.abs(z - riverPathZ);
        const riverDepression = distToRiver < 3.2 ? -1.6 * (1 - distToRiver / 3.2) : 0;

        // Road penetration axis (linear clearing)
        const roadX = 5;
        const distToRoad = Math.abs(x - roadX);
        const isRoadClearing = distToRoad < 1.0;

        // Herringbone lateral trails
        const herringbone = Math.abs((z % 6) - 3) < 0.6 && x > 2 && x < 14;

        let y = hill + riverDepression + 1.8;
        pos.setY(i, y);

        const color = new THREE.Color();
        if (distToRiver < 1.8) {
          // River water (turbid amazon white-water / café turbio)
          color.setRGB(0.38, 0.32, 0.22);
        } else if (distToRiver < 3.0) {
          // Várzea flood forest / riparian beach
          color.setRGB(0.24, 0.42, 0.22);
        } else if (isRoadClearing || herringbone) {
          // Deforested bare soil / pastizal (ochre soil)
          color.setRGB(0.72, 0.48, 0.26);
        } else {
          // Dense tropical terra-firme forest
          const canopyVar = Math.sin(x * 1.2) * 0.05;
          color.setRGB(0.08 + canopyVar, 0.35 + canopyVar, 0.14 + canopyVar);
        }
        colors.push(color.r, color.g, color.b);
      }

      terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      terrainGeo.computeVertexNormals();

      const terrainMat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.85,
        metalness: 0.1,
      });

      const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
      terrainMesh.receiveShadow = true;
      terrainMesh.castShadow = true;
      dynamicGroup.add(terrainMesh);

      // 3D River water surface
      const waterGeo = new THREE.PlaneGeometry(42, 8, 32, 8);
      waterGeo.rotateX(-Math.PI / 2);
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x3d4a36,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.85,
      });
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.position.set(0, 0.7, 0);
      dynamicGroup.add(waterMesh);

      // Thermal anomaly hotspots (MODIS/VIIRS) with glowing fire particles
      const thermalGroup = new THREE.Group();
      thermalGroupRef.current = thermalGroup;
      dynamicGroup.add(thermalGroup);

      const fireLocations = [
        { x: 5.2, z: -8, label: 'Foco Térmico #1 (Quema Agrícola)' },
        { x: 7.5, z: 2, label: 'Foco Térmico #2 (Desmonte Eje Vial)' },
        { x: 5.0, z: 10, label: 'Foco Térmico #3 (Antorcha Gas)' },
      ];

      fireLocations.forEach((loc) => {
        const fireGeo = new THREE.ConeGeometry(0.6, 1.8, 8);
        const fireMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const fire = new THREE.Mesh(fireGeo, fireMat);
        fire.position.set(loc.x, 2.6, loc.z);
        thermalGroup.add(fire);

        const glowGeo = new THREE.SphereGeometry(1.2, 12, 12);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.45 });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(loc.x, 2.6, loc.z);
        thermalGroup.add(glow);
      });

    } else if (theme === 'mangrove-churute') {
      // ESTUARY & MANGROVE SYSTEM (Manglares Churute)
      const segments = 64;
      const terrainGeo = new THREE.PlaneGeometry(42, 42, segments, segments);
      terrainGeo.rotateX(-Math.PI / 2);

      const pos = terrainGeo.attributes.position;
      const colors: number[] = [];

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);

        // Cerros de Churute: Isolated high rocky coastal hills in the north-east
        const distToHills = Math.sqrt((x - 8) ** 2 + (z - 8) ** 2);
        const hillElevation = distToHills < 9 ? Math.cos((distToHills / 9) * (Math.PI / 2)) * 6.8 : 0;

        // Estuary tidal flats & channels
        const tidalChannel = Math.sin(x * 0.25) * Math.cos(z * 0.25) * 0.8;
        const waterFlat = Math.max(0, -x * 0.1);

        let y = Math.max(0, hillElevation + tidalChannel * 0.5 + waterFlat * 0.5);
        pos.setY(i, y);

        const color = new THREE.Color();
        if (hillElevation > 1.5) {
          // Cerro de Churute dry/cloud coastal forest
          color.setRGB(0.25, 0.46, 0.28);
        } else if (x < -2) {
          // Mangrove tidal flats (Rhizophora mangle - dark saline green)
          color.setRGB(0.06, 0.32, 0.22);
        } else if (z > 4 && x < 6) {
          // Shrimp aquaculture pool dike matrix (bermas de piscinas)
          const gridPattern = (Math.abs(x % 3) < 0.3 || Math.abs(z % 3) < 0.3);
          if (gridPattern) {
            color.setRGB(0.65, 0.55, 0.42); // Clay dikes
          } else {
            color.setRGB(0.22, 0.45, 0.52); // Aquaculture water
          }
        } else {
          // Humedal continental / Laguna de El Canclón
          color.setRGB(0.18, 0.48, 0.35);
        }
        colors.push(color.r, color.g, color.b);
      }

      terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      terrainGeo.computeVertexNormals();

      const terrainMat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.8,
        metalness: 0.1,
      });

      const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
      terrainMesh.receiveShadow = true;
      terrainMesh.castShadow = true;
      dynamicGroup.add(terrainMesh);

      // Translucent Estuarine Water Plane
      const waterGeo = new THREE.PlaneGeometry(28, 42);
      waterGeo.rotateX(-Math.PI / 2);
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.15,
        metalness: 0.85,
        transparent: true,
        opacity: 0.65,
      });
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.position.set(-8, 0.35, 0);
      dynamicGroup.add(waterMesh);

      // SNAP Official Boundary Fence (3D Glowing line)
      const fencePoints = [
        new THREE.Vector3(-14, 0.8, -16),
        new THREE.Vector3(2, 0.8, -16),
        new THREE.Vector3(2, 1.2, 16),
        new THREE.Vector3(-14, 0.8, 16),
        new THREE.Vector3(-14, 0.8, -16),
      ];
      const fenceGeo = new THREE.BufferGeometry().setFromPoints(fencePoints);
      const fenceMat = new THREE.LineBasicMaterial({ color: 0x15803d, linewidth: 3 });
      const fenceLine = new THREE.Line(fenceGeo, fenceMat);
      dynamicGroup.add(fenceLine);

    } else {
      // STRATOVOLCANO COTOPAXI WITH BUFFER RINGS
      const segments = 72;
      const terrainGeo = new THREE.PlaneGeometry(44, 44, segments, segments);
      terrainGeo.rotateX(-Math.PI / 2);

      const pos = terrainGeo.attributes.position;
      const colors: number[] = [];

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);

        const dist = Math.sqrt(x * x + z * z);
        // Conical volcano equation with exponential peak and crater caldera
        let y = 0;
        if (dist < 1.2) {
          // Crater caldera
          y = 8.6 - (1.2 - dist) * 1.5;
        } else if (dist < 16) {
          // Steep conical flanks
          y = Math.pow(Math.max(0, 16 - dist) / 16, 1.8) * 9.8;
          // Lahar ravines (quebradas laharíticas)
          const ravineAngle = Math.atan2(z, x);
          const ravineGrooves = Math.sin(ravineAngle * 8) * 0.45;
          y += ravineGrooves * (y / 8);
        } else {
          // Gentle plateau (Altiplano del Parque Nacional)
          y = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.35;
        }

        pos.setY(i, y);

        // Stratified coloring: Glacier > Moraine/Ash > Páramo de Pajonal
        const color = new THREE.Color();
        if (y > 6.8) {
          // Glaciar ecuatorial (ice white)
          color.setRGB(0.96, 0.98, 1.0);
        } else if (y > 4.5) {
          // Ceniza volcánica y morrenas (dark basaltic gray)
          color.setRGB(0.38, 0.36, 0.35);
        } else if (y > 1.8) {
          // Pajonal de alta montaña (Stipa ichu - golden straw)
          color.setRGB(0.68, 0.58, 0.32);
        } else {
          // Páramo bajo / Matriz agropecuaria
          color.setRGB(0.24, 0.48, 0.28);
        }
        colors.push(color.r, color.g, color.b);
      }

      terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      terrainGeo.computeVertexNormals();

      const terrainMat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.88,
        metalness: 0.05,
      });

      const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
      terrainMesh.receiveShadow = true;
      terrainMesh.castShadow = true;
      dynamicGroup.add(terrainMesh);

      // Concentric Buffer Rings (2 km & 5 km)
      const ring2Geo = new THREE.RingGeometry(7.2, 7.6, 64);
      ring2Geo.rotateX(-Math.PI / 2);
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x15803d, side: THREE.DoubleSide });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.position.y = 1.6;
      dynamicGroup.add(ring2);

      const ring5Geo = new THREE.RingGeometry(13.2, 13.7, 64);
      ring5Geo.rotateX(-Math.PI / 2);
      const ring5Mat = new THREE.MeshBasicMaterial({ color: 0xb45309, side: THREE.DoubleSide });
      const ring5 = new THREE.Mesh(ring5Geo, ring5Mat);
      ring5.position.y = 0.8;
      dynamicGroup.add(ring5);
      bufferRingRef.current = ring5;
    }

    // Grid Floor Plane for Cartographic Precision (Metric Coordinates)
    const gridHelper = new THREE.GridHelper(48, 24, 0x94a3b8, 0xd1d5db);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // 6. Camera Position & Animation Loop
    const updateCameraPosition = () => {
      const { radius, theta, phi } = sphericalRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(targetRef.current);
    };

    updateCameraPosition();

    // Render loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation if user is not actively interacting
      if (!isDraggingRef.current) {
        sphericalRef.current.theta += 0.0018;
        updateCameraPosition();
      }

      // Animate thermal fire hotspots if Yasuni theme
      if (thermalGroupRef.current) {
        thermalGroupRef.current.children.forEach((child, idx) => {
          if (child instanceof THREE.Mesh) {
            const scale = 1 + Math.sin(elapsedTime * 4 + idx) * 0.15;
            child.scale.set(scale, scale, scale);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Interactive Mouse / Touch Orbit Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      sphericalRef.current.theta -= deltaX * 0.008;
      sphericalRef.current.phi = Math.max(0.2, Math.min(Math.PI / 2.1, sphericalRef.current.phi - deltaY * 0.008));
      updateCameraPosition();
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      sphericalRef.current.radius = Math.max(16, Math.min(80, sphericalRef.current.radius + e.deltaY * 0.04));
      updateCameraPosition();
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Touch support for mobile/tablets
    let touchStartDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const deltaX = e.touches[0].clientX - prevMouseRef.current.x;
        const deltaY = e.touches[0].clientY - prevMouseRef.current.y;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        sphericalRef.current.theta -= deltaX * 0.008;
        sphericalRef.current.phi = Math.max(0.2, Math.min(Math.PI / 2.1, sphericalRef.current.phi - deltaY * 0.008));
        updateCameraPosition();
      } else if (e.touches.length === 2) {
        const newDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = touchStartDist - newDist;
        touchStartDist = newDist;
        sphericalRef.current.radius = Math.max(16, Math.min(80, sphericalRef.current.radius + diff * 0.1));
        updateCameraPosition();
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 420;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('wheel', handleWheel);

      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      if (container && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
    };
  }, [theme]);

  // Reset Camera View
  const handleResetCamera = () => {
    sphericalRef.current = { radius: 45, theta: Math.PI / 4, phi: Math.PI / 3.2 };
    if (cameraRef.current) {
      const { radius, theta, phi } = sphericalRef.current;
      cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
      cameraRef.current.position.y = radius * Math.cos(phi);
      cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
      cameraRef.current.lookAt(targetRef.current);
    }
  };

  return (
    <div className={`relative bg-stone-900/5 rounded-xl border border-stone-200 overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50 shadow-2xl bg-white' : ''}`}>
      {/* 3D Viewer Header */}
      {showCardHeader && (
        <div className="p-3.5 bg-white/90 backdrop-blur border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-stone-100 border border-stone-200">
              {meta.icon}
            </span>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
                {title || meta.defaultTitle}
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-stone-100 text-stone-600 rounded border border-stone-200 font-semibold">
                  WebGL 3D
                </span>
              </h4>
              <p className="text-[11px] text-stone-500 font-medium">
                {subtitle || meta.defaultSubtitle}
              </p>
            </div>
          </div>

          {/* Quick 3D Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-1.5 rounded text-xs flex items-center gap-1 border transition-colors ${
                showInfo ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
              }`}
              title="Información y Parámetros del Modelo"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Parámetros</span>
            </button>

            <button
              onClick={handleResetCamera}
              className="p-1.5 rounded text-xs bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 flex items-center gap-1 transition-colors"
              title="Restablecer Cámara"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Centrar</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded text-xs bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 flex items-center gap-1 transition-colors"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ height: isFullscreen ? 'calc(100% - 60px)' : height }}
        className="w-full relative cursor-grab active:cursor-grabbing select-none"
      />

      {/* Interactive Overlay Badge & Legend */}
      <div className="absolute bottom-3 left-3 pointer-events-none">
        <div className="bg-white/85 backdrop-blur-md px-3 py-2 rounded-lg border border-stone-200 shadow-sm text-[11px] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Compass className="w-3.5 h-3.5 text-[#0369a1]" />
            <span>Navegación 3D: Clic + arrastre para orbitar | Rueda para zoom</span>
          </div>
          <div className="text-stone-600 flex items-center gap-2">
            <span>Rango altimétrico: <strong>{meta.elevationRange}</strong></span>
          </div>
        </div>
      </div>

      {/* Slide-out Technical Parameters Drawer */}
      {showInfo && (
        <div className="absolute top-14 right-3 w-80 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-stone-300 shadow-lg text-xs space-y-3 z-10">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Metadatos y Bioma
            </span>
            <button 
              onClick={() => setShowInfo(false)}
              className="text-stone-400 hover:text-stone-700 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <div>
            <span className="text-stone-500 font-semibold block text-[10px] uppercase">Bioma / Ecosistema:</span>
            <p className="text-stone-800 font-medium">{meta.biome}</p>
          </div>

          <div>
            <span className="text-stone-500 font-semibold block text-[10px] uppercase">Rango de Elevación:</span>
            <p className="text-stone-800 font-medium">{meta.elevationRange}</p>
          </div>

          <div>
            <span className="text-stone-500 font-semibold block text-[10px] uppercase mb-1">Variables Espaciales Relevantes:</span>
            <ul className="space-y-1 list-disc list-inside text-stone-700">
              {meta.keyFeatures.map((feat, i) => (
                <li key={i} className="text-[11px] leading-tight">{feat}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
