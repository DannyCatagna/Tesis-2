export interface GISSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  keyPoints: { label: string; text: string }[];
  ecuadorContext: string;
  formulaOrStandard?: string;
}

export const CARTOGRAPHY_THEORY: GISSection[] = [
  {
    id: 'fundamentos-sig',
    title: '1. Arquitectura y Definición Conceptual de un SIG',
    subtitle: 'Los cinco pilares del tratamiento sistemático de datos espaciales',
    content: 'Un Sistema de Información Geográfica (SIG o GIS, por sus siglas en inglés) es un conjunto integrado de hardware, software, datos geoespaciales, metodologías analíticas y talento humano capacitado, diseñado para capturar, almacenar, manipular, analizar, modelar y desplegar información georreferenciada con el propósito de resolver problemas complejos de planificación y gestión ambiental.',
    keyPoints: [
      { label: 'Componente Datos', text: 'El activo más valioso; comprende la componente geométrica (dónde está) y la componente alfanumérica o temática (qué es y cuáles son sus atributos).' },
      { label: 'Evolución Histórica', text: 'Desde el primer Canadian GIS de Roger Tomlinson en 1968 hasta las arquitecturas modernas de WebGIS en la nube con visualización masiva en navegadores.' },
      { label: 'Interoperabilidad OGC', text: 'Estándares abiertos del Open Geospatial Consortium (WMS, WFS, WCS, CSW) que permiten compartir capas sin barreras de formato entre instituciones.' }
    ],
    ecuadorContext: 'En el Ecuador, la Infraestructura Ecuatoriana de Datos Espaciales (IEDG) articula a ministerios, gobiernos autónomos descentralizados (GAD) y la academia bajo estándares geoespaciales homologados.',
    formulaOrStandard: 'SIG = {Hardware, Software, Geodatos, Métodos Analíticos, Personas}'
  },
  {
    id: 'proyecciones-utm-ecuador',
    title: '2. Sistemas Geodésicos y Proyecciones Cartográficas en Ecuador',
    subtitle: 'Elipsoide WGS84, Datum SIRGAS-Ecuador y Zonas UTM 17S y 18S',
    content: 'La Tierra es un geoide irregular que se aproxima matemáticamente mediante un elipsoide de revolución. Para representar la curvatura tridimensional en un plano bidimensional sin distorsiones inaceptables, se emplean proyecciones cartográficas conformes cilíndricas transversas como la Proyección Universal Transversal de Mercator (UTM).',
    keyPoints: [
      { label: 'Marco Geodésico Oficial', text: 'SIRGAS-Ecuador (materializado mediante la Red GNSS de Monitoreo Continuo del IGM), coincidente a efectos prácticos con WGS84 (World Geodetic System 1984).' },
      { label: 'Zona UTM 17 Sur (17S)', text: 'Cubre la totalidad de la Costa, la mayor parte de la Sierra y el nororiente amazónico (entre 84°W y 78°W). Meridiano central: 81°W. Falso Este: 500.000 m. Falso Norte: 10.000.000 m.' },
      { label: 'Zona UTM 18 Sur (18S)', text: 'Cubre el oriente de la Amazonía ecuatoriana (Pastaza oriental, Morona Santiago oriental, Orellana este; entre 78°W y 72°W). Meridiano central: 75°W.' },
      { label: 'Región Insular (Galápagos)', text: 'Se proyecta en las Zonas UTM 15S y 16S (meridianos entre 96°W y 89°W).' }
    ],
    ecuadorContext: 'Al trabajar proyectos biológicos a nivel nacional continental, es un error fatal mezclar coordenadas métricas UTM 17S con 18S sin re-proyección previa. Para análisis a escala nacional se recomienda proyectar a un sistema de coordenadas cónicas equivalentes o mantener las coordenadas en Grados Decimales Geográficos WGS84 (EPSG:4326).',
    formulaOrStandard: 'EPSG Oficial Continental: EPSG:32717 (UTM 17S) / EPSG:32718 (UTM 18S) / EPSG:4326 (Geográficas)'
  },
  {
    id: 'modelos-datos-vector-raster',
    title: '3. Modelos de Datos Geoespaciales: Vectorial vs. Ráster',
    subtitle: 'Representación discreta y continua de fenómenos de la biosfera',
    content: 'La realidad ecológica se abstrae en dos modelos primarios de representación informática según la naturaleza espacial del fenómeno estudiado: el modelo vectorial para entidades discretas con límites netos y el modelo ráster para variaciones continuas de campo en el espacio.',
    keyPoints: [
      { label: 'Modelo Vectorial', text: 'Utiliza coordenadas explícitas [X, Y]. Geometrías fundamentales: Puntos (árboles nido, registros de avistamiento), Líneas (ríos, fallas geológicas, senderos, oleoductos) y Polígonos (áreas protegidas, lagunas, predios cantonales).' },
      { label: 'Modelo Ráster', text: 'Estructura matricial regular de celdas o píxeles, donde cada celda almacena un valor numérico representativo. Ideal para variables continuas: temperatura, precipitación, elevación (DEM), índice de vegetación (NDVI) o reflectancia de satélites.' },
      { label: 'Resolución del Ráster', text: 'Cuatro dimensiones críticas: Espacial (tamaño de celda en metros), Espectral (número y ancho de bandas electromagnéticas), Radiométrica (profundidad en bits) y Temporal (tiempo de revisita satelital).' }
    ],
    ecuadorContext: 'En conservación de la biodiversidad, la delimitación jurídica de un Parque Nacional es estrictamente vectorial (polígono cerrado con tabla de atributos), mientras que la idoneidad bioclimática del oso de anteojos se modela mediante rásteres continuos continuos de temperatura y precipitación de WorldClim.',
    formulaOrStandard: 'Vector: {Point, LineString, Polygon} | Ráster: Matriz [Fila, Columna] = Valor digital'
  },
  {
    id: 'operaciones-analisis-espacial',
    title: '4. Operaciones Fundamentales de Geoprocesamiento y Álgebra de Mapas',
    subtitle: 'Herramientas algorítmicas para responder preguntas ecológicas territoriales',
    content: 'El verdadero poder de un SIG no es dibujar mapas estéticos, sino formular consultas espaciales (Spatial Queries) y ejecutar geoprocesos algorítmicos que revelan patrones invisibles al ojo humano.',
    keyPoints: [
      { label: 'Área de Influencia (Buffer)', text: 'Genera una zona poligonal a una distancia métrica determinada alrededor de una entidad geográfica. Esencial para delimitar fajas de protección ribereña (100m en ríos) y zonas de amortiguamiento alrededor de parques.' },
      { label: 'Intersección (Intersect)', text: 'Calcula la superposición geométrica entre dos capas y conserva los atributos alfanuméricos de ambas. Permite responder: ¿Cuántas hectáreas de bosque primario coinciden con concesiones mineras activas?' },
      { label: 'Recorte (Clip)', text: 'Corta una capa temática utilizando los límites poligonales de otra capa de máscara (ej. extraer únicamente los ríos que quedan dentro del Parque Nacional Cotopaxi).' },
      { label: 'Disolución (Dissolve)', text: 'Fusiona polígonos adyacentes que comparten un mismo atributo alfanumérico, simplificando la topología y eliminando bordes internos artificiales.' },
      { label: 'Estadística Zonal (Zonal Statistics)', text: 'Calcula métricas estadísticas de una capa ráster (elevación media, precipitación acumulada) dentro de las zonas poligonales de una capa vectorial.' }
    ],
    ecuadorContext: 'El Ministerio del Ambiente utiliza la operación de Intersección geométrica en tiempo real para el Sistema Único de Información Ambiental (SUIA), alertando automáticamente si una solicitud de concesión petrolera o minera se intersecta con el patrimonio de áreas protegidas del SNAP o bosques protectores.',
    formulaOrStandard: 'Intersección: A ∩ B | Unión: A ∪ B | Diferencia: A - B | Buffer: d(x, A) ≤ r'
  }
];
