export interface GISSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  didacticAnalogy?: {
    title: string;
    analogyText: string;
    whyItMatters: string;
  };
  chemistryBiologyLink?: {
    biology: string;
    chemistry: string;
  };
  keyPoints: { label: string; text: string }[];
  ecuadorContext: string;
  formulaOrStandard?: string;
  freeToolsUsed?: { name: string; url: string; description: string }[];
}

export const CARTOGRAPHY_THEORY: GISSection[] = [
  {
    id: 'fundamentos-sig',
    title: '1. ¿Qué es un SIG? Explicación Sencilla y Arquitectura',
    subtitle: 'Los cinco componentes del análisis espacial explicados para futuros docentes',
    content: 'Un Sistema de Información Geográfica (SIG o GIS en inglés) es mucho más que un "Google Maps" o un visor de fotos. Es un sistema integral que une computadoras, personas, datos reales con coordenadas (dónde está algo en el planeta) e información descriptiva (qué es eso que está ahí, cuánto mide, qué especie vive ahí, qué pH tiene el agua). Nos permite responder preguntas como: ¿dónde se cruza la deforestación con el hábitat del oso de anteojos? o ¿qué fuentes de agua están a menos de 5 km de un volcán activo?',
    didacticAnalogy: {
      title: 'Analogía: El Sándwich de Acetatos del Laboratorio de Biología',
      analogyText: 'Imagina que en el laboratorio tienes una lámina transparente con el dibujo de una célula: una lámina tiene la membrana plasmática, otra tiene el citoplasma con las mitocondrias, y otra tiene el núcleo. Si las pones una sobre otra a contraluz, ves la célula completa. Un SIG hace exactamente lo mismo con la Tierra: una capa transparente tiene los ríos, otra tiene los tipos de bosque, otra tiene las carreteras y otra tiene los límites de los Parques Nacionales. Al encender o apagar capas, descubres relaciones que ningún mapa de papel te puede mostrar.',
      whyItMatters: 'Esta analogía permite a los alumnos de colegio comprender que el mapa digital no es un dibujo estático, sino una pila de capas temáticas que se pueden superponer y analizar.'
    },
    chemistryBiologyLink: {
      biology: 'Superposición de capas de rangos de vegetación con registros de colecta de herbario y cámaras trampa para determinar el nicho ecológico de especies amenazadas.',
      chemistry: 'Mapeo de concentraciones de nitratos y fosfatos a lo largo de una cuenca hidrográfica para identificar puntos de eutrofización y descargas agrícolas.'
    },
    keyPoints: [
      { label: 'Las Capas Temáticas (Layers)', text: 'Organizan la realidad territorial por temas homogéneos: red hidrográfica, cobertura vegetal, curvas de nivel y áreas SNAP.' },
      { label: 'La Tabla de Atributos', text: 'Cada punto, río o bosque tiene una hoja de datos asociada con nombre, área en hectáreas, temperatura media, especies presentes, etc.' },
      { label: 'De lo Pesado a la Web (WebGIS)', text: 'Antes se requería instalar software pesado y costoso (ArcGIS); hoy usamos visores Web gratuitos como el del MAATE, Google Earth Web y NASA Worldview directamente en el navegador de cualquier laptop.' }
    ],
    ecuadorContext: 'En el Ecuador, el Ministerio del Ambiente, Agua y Transición Ecológica (MAATE) administra el Sistema Nacional de Áreas Protegidas (SNAP) mediante cartografía oficial SIRGAS-Ecuador.',
    formulaOrStandard: 'SIG = {Personas + Datos Geoespaciales + Software Web + Metodología + Hardware}'
  },
  {
    id: 'proyecciones-utm-ecuador',
    title: '2. Coordenadas y Proyecciones Cartográficas en Ecuador',
    subtitle: 'Cómo pasar de la esfera terrestre curva a un mapa plano sin perder distancias',
    content: 'La Tierra es redonda (un geoide achatado en los polos), pero nuestras pantallas y cuadernos son planos. Para plasmar la curvatura tridimensional en una superficie plana necesitamos una fórmula matemática llamada "proyección cartográfica". En Ecuador continental utilizamos fundamentalmente la Proyección Universal Transversal de Mercator (UTM) bajo el elipsoide de referencia WGS84 / SIRGAS-Ecuador.',
    didacticAnalogy: {
      title: 'Analogía: Pelar una Naranja y Aplastarla en la Mesa',
      analogyText: 'Imagina que tienes una naranja redonda que representa al planeta Tierra. Si la pelas con cuidado e intentas aplastar la cáscara en una mesa plana de laboratorio sin romperla, notarás que los bordes se desgarran o se deforman obligatoriamente. Para evitar que las distancias y las áreas de los bosques se deformen demasiado, los cartógrafos dividieron el planeta en 60 "gajos" verticales de 6 grados cada uno, llamados ZONAS UTM. El Ecuador continental está justo en el gajo o Zona 17 Sur (Costa, Sierra y parte oriental) y Zona 18 Sur (Amazonía profunda).',
      whyItMatters: 'Comprender esto evita que los estudiantes se confundan cuando ven coordenadas en metros (ej. 785.400 m Este) versus coordenadas en grados decimales (ej. -0.25° Latitud).'
    },
    chemistryBiologyLink: {
      biology: 'Evita que al calcular el área de hábitat de una población vegetal en peligro se cometan errores de miles de hectáreas por deformación proyectiva.',
      chemistry: 'Determina con precisión métrica la pluma de dispersión de gases pesados en valles interandinos según la dirección del viento.'
    },
    keyPoints: [
      { label: 'Zona UTM 17 Sur (EPSG:32717)', text: 'Abarca toda la Costa ecuatoriana, las provincias de la Sierra y el nororiente amazónico (Pichincha, Guayas, Loja, Imbabura, etc.).' },
      { label: 'Zona UTM 18 Sur (EPSG:32718)', text: 'Abarca el extremo oriental de la Amazonía ecuatoriana (Pastaza oriental, Morona Santiago este y frontera con Perú).' },
      { label: 'Coordenadas Geográficas (EPSG:4326)', text: 'Expresadas en Grados Decimales [Longitud, Latitud]. Para el Ecuador continental ambas son NEGATIVAS (ej. Latitud -0.22°, Longitud -78.51°).' }
    ],
    ecuadorContext: 'El Instituto Geográfico Militar (IGM) y el MAATE exigen que todos los estudios de impacto ambiental y delimitaciones biológicas en Ecuador se entreguen bajo el marco geodésico oficial SIRGAS-Ecuador.',
    formulaOrStandard: 'Ecuador Continental: EPSG:32717 (UTM 17S) | EPSG:32718 (UTM 18S) | EPSG:4326 (WGS84 Grados)'
  },
  {
    id: 'modelos-datos-vector-raster',
    title: '3. Modelos de Datos: ¿Qué es Vectorial y qué es Ráster?',
    subtitle: 'Las dos formas en que la computadora "entiende" los fenómenos de la naturaleza',
    content: 'En la naturaleza hay cosas con bordes claros (un árbol, una carretera, el límite de un Parque Nacional) y cosas continuas que cambian suavemente paso a paso (la temperatura, la lluvia, la altitud, el pH del suelo). Los SIG usan dos modelos informáticos distintos para representarlas: el modelo Vectorial y el modelo Ráster.',
    didacticAnalogy: {
      title: 'Analogía: Esquema con Regla vs Fotografía en Píxeles al Microscopio',
      analogyText: '• Modelo Vectorial = Un dibujo geométrico hecho con regla y compás. Si haces zoom infinito, nunca se pixela porque son coordenadas matemáticas exactas. Puede ser un Punto (un árbol o un nido), una Línea (el cauce de un río) o un Polígono (el contorno de una laguna o reserva).\n• Modelo Ráster = Una fotografía digital de alta resolución tomada desde el microscopio o un satélite espacial. Está formada por una cuadrícula de cuadritos (píxeles). Cada cuadrito almacena un valor numérico: por ejemplo, temperatura en °C, altitud en metros o concentración de clorofila.',
      whyItMatters: 'Un docente de ciencias experimentales necesita saber cuál usar: límites jurídicos y sitios de muestreo son vectores; mapas de clima, elevación y fotos satelitales son rásteres.'
    },
    chemistryBiologyLink: {
      biology: 'Puntos de registros de aves en GBIF/BioWeb (vector) superpuestos sobre capas continuas de bioclima WorldClim (ráster) para modelar la idoneidad del hábitat.',
      chemistry: 'Malla ráster de salinidad o temperatura superficial del mar (SST) de la corriente fría de Humboldt y corriente cálida de El Niño frente a las costas de Manabí y Galápagos.'
    },
    keyPoints: [
      { label: 'Puntos, Líneas y Polígonos', text: 'Geometrías vectoriales: Punto = Estación meteorológica; Línea = Río Guayas; Polígono = Parque Nacional Yasuní.' },
      { label: 'Píxeles Ráster', text: 'Cada celda tiene un tamaño en metros (resolución espacial). Por ejemplo, el satélite Sentinel-2 tiene píxeles de 10 metros, mientras que MODIS tiene píxeles de 250 metros.' },
      { label: 'Fórmula de NDVI (Fotosíntesis)', text: 'Índice ráster que compara la luz roja y el infrarrojo para calcular cuán verde y viva está la vegetación.' }
    ],
    ecuadorContext: 'El mapa de los 91 Ecosistemas del Ecuador Continental combina polígonos vectoriales con modelos ráster de relieve digital del terreno del IGM.',
    formulaOrStandard: 'Vector: {X, Y} Geometrías | Ráster: Matriz [Fila, Columna] = Valor Numérico de Campo'
  },
  {
    id: 'operaciones-analisis-espacial',
    title: '4. Geoprocesos Clave: Buffers y Superposición Territorial',
    subtitle: 'Las herramientas que revelan conflictos socioambientales en el territorio',
    content: 'La verdadera magia de los SIG no es hacer mapas bonitos para una diapositiva, sino responder preguntas ecológicas mediante operaciones espaciales. La más importante para la conservación y la docencia es el Buffer (zona de amortiguamiento) y la Intersección (cruzar dos capas para ver qué coincide).',
    didacticAnalogy: {
      title: 'Analogía: El Perímetro de Bioseguridad en el Laboratorio Químico',
      analogyText: 'Cuando en el laboratorio de química escolar vas a trabajar con una sustancia volátil, ácida o tóxica, no colocas a los estudiantes pegados a la mesa de reactivos: estableces un radio de bioseguridad y una campana de extracción. En un Parque Nacional pasa lo mismo: no puedes tener campos con pesticidas químicos o carreteras pegadas al hábitat virgen. Se crea un "buffer" o zona de amortiguamiento de 2 km o 5 km alrededor del parque donde se restringen actividades pesadas y se fomenta la educación ambiental y agroforestería comunitaria.',
      whyItMatters: 'Permite a los estudiantes calcular con matemáticas sencillas cuántas hectáreas quedan bajo protección especial alrededor de una reserva.'
    },
    chemistryBiologyLink: {
      biology: 'Buffers de protección ribereña de 100 metros a los lados de los ríos para preservar el bosque de galería donde anidan aves y anfibios.',
      chemistry: 'Radio de afectación por dispersión de dióxido de azufre (SO2) y ceniza volcánica del Cotopaxi o Tungurahua en fuentes de agua dulce.'
    },
    keyPoints: [
      { label: 'Zona de Amortiguamiento (Buffer)', text: 'Crea un cinturón de protección a una distancia fija (ej. 2.000 metros) alrededor de un río, nido o parque protegido.' },
      { label: 'Intersección (Intersect)', text: 'Cruza dos capas y encuentra el área compartida: ¿Qué parte de un territorio indígena se solapa con una concesión petrolera o minera?' },
      { label: 'Recorte (Clip)', text: 'Como una tijera espacial: corta todos los ríos que quedan exactamente dentro de los límites de una provincia o cantón.' }
    ],
    ecuadorContext: 'El Código Orgánico del Ambiente (COA) del Ecuador exige zonas de amortiguamiento y franjas de protección hídrica obligatorias en todas las fuentes de agua dulce del país.',
    formulaOrStandard: 'Buffer: d(x, Entidad) ≤ Radio | Intersección: Capa A ∩ Capa B'
  },
  {
    id: 'plataformas-gratuitas-aula',
    title: '5. Las 3 Plataformas Gratuitas Prioritarias para el Aula Escolar',
    subtitle: 'Herramientas 100% libres, sin costo y directas en el navegador web',
    content: 'Para que un futuro profesor de Química y Biología pueda enseñar SIG en su colegio o en la universidad, no necesita licencias millonarias ni computadoras de alta gama. Estas tres plataformas recomendadas en nuestra propuesta de tesis funcionan directamente desde Google Chrome o Firefox y ofrecen información de satélites en tiempo real e instituciones oficiales del Ecuador.',
    didacticAnalogy: {
      title: 'Analogía: La Mochila de Campo del Educador Científico',
      analogyText: 'Así como en una salida de campo a un bosque llevas lupa, cinta métrica y frascos de recolección, en la era digital llevas tres visores web complementarios: 1) El visor del MAATE te da los datos legales y oficiales del gobierno ecuatoriano; 2) Google Earth Web te da la lupa 3D para ver las montañas y medir terrenos; y 3) NASA Worldview te da los ojos de satélite para ver fuegos y gases en tiempo real.',
      whyItMatters: 'Demuestra al tribunal de tesis y a los compañeros de carrera que la falta de computadoras de laboratorio no es excusa para no enseñar SIG moderno.'
    },
    chemistryBiologyLink: {
      biology: 'Visualización directa de los 91 ecosistemas del Ecuador y de las 78 áreas protegidas continentales del SNAP sin pagar suscripciones.',
      chemistry: 'Monitoreo de focos de calor por quemas agrícolas (química de la combustión) y aerosoles atmosféricos desde sensores MODIS y VIIRS de la NASA.'
    },
    keyPoints: [
      { label: '1. Visor Geográfico del MAATE', text: 'Acceso a la Infraestructura de Datos Espaciales del Ecuador: límites del SNAP, bosques protectores, mapa de cobertura vegetal oficial.' },
      { label: '2. Google Earth Web (earth.google.com)', text: 'Navegación 3D en la Cordillera de los Andes, perfiles de elevación altimétricos, medición de áreas en hectáreas y trazado de polígonos KML.' },
      { label: '3. NASA Worldview (worldview.earthdata.nasa.gov)', text: 'Imágenes satelitales diarias, detección de incendios activos (puntos rojos en tiempo real), plumas de gases y herramienta cortina (Swipe) multitemporal.' }
    ],
    ecuadorContext: 'Todas estas plataformas son de uso público abierto y respetan los acuerdos de datos abiertos del Estado ecuatoriano y de agencias espaciales internacionales.',
    formulaOrStandard: 'Trilogía WebGIS Gratuita: {MAATE IDE + Google Earth Web + NASA Worldview}',
    freeToolsUsed: [
      { name: 'Visor Geográfico MAATE', url: 'http://ide.ambiente.gob.ec/mapainteractivo/', description: 'Capas oficiales SNAP y 91 ecosistemas' },
      { name: 'Google Earth Web', url: 'https://earth.google.com/web/', description: 'Relieve 3D, medición de hectáreas y KML' },
      { name: 'NASA Worldview', url: 'https://worldview.earthdata.nasa.gov/', description: 'Imágenes diarias, fuegos activos y gases químicos' }
    ]
  }
];
