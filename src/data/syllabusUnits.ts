import { SyllabusUnit } from '../types';

export const SYLLABUS_UNITS: SyllabusUnit[] = [
  {
    id: 'unidad-2',
    title: 'Unidad 2: Ecuador, País Megadiverso',
    subtitle: 'Riqueza Biológica, Gradientes Ecológicos y Amenazas en el Espacio Geográfico',
    themeColor: 'jungle',
    colorHex: '#15803d',
    accentBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    statCallouts: [
      {
        value: '16% Mundial',
        label: 'Aves del Planeta',
        source: 'Aves del Ecuador / BioWeb (1.685 especies registradas en solo 0.2% de la superficie terrestre)'
      },
      {
        value: '8% Mundial',
        label: 'Anfibios Globales',
        source: 'Centro Jambatu / MAATE (660 especies con un alarmante 45% de endemismo estricto)'
      },
      {
        value: '>25.000',
        label: 'Plantas Vasculares',
        source: 'Herbario QCA / PUCE (Equivale al 10% de toda la diversidad florística del planeta)'
      },
      {
        value: '91',
        label: 'Ecosistemas Diferenciados',
        source: 'Sistema de Clasificación de Ecosistemas del Ecuador Continental (MAATE, 2013)'
      }
    ],
    subtopics: [
      {
        id: '2.1',
        title: '2.1 Diversidad de las Especies (Características ambientales y generales del Ecuador)',
        content: 'Ecuador se localiza en la zona tórrida equinoccial, pero su clima y fisonomía biogeográfica están gobernados por el levantamiento orogénico de la Cordillera de los Andes y la convergencia marina de las corrientes fría de Humboldt y cálida de El Niño. Esta conjunción genera una multiplicidad de pisos altitudinales y microclimas hiperhúmedos, secos e interandinos.',
        academicHighlights: [
          'Ubicación ecuatorial con radiación solar perpendicular constante pero moderada por nubosidad orográfica.',
          'Gradiente altitudinal vertical que va desde 0 msnm en el Océano Pacífico hasta 6.263 msnm en la cumbre del volcán Chimborazo.',
          'Presencia de dos hotspots de biodiversidad global: Tumbes-Chocó-Magdalena (Costa/Noroccidente) y Andes Tropicales (Sierra/Vertiente Amazónica).'
        ],
        keyConcepts: ['Gradiente Altitudinal', 'Zona de Convergencia Intertropical (ZCIT)', 'Hotspots de Biodiversidad', 'Microclimas Andinos']
      },
      {
        id: '2.2',
        title: '2.2 Flora y Fauna del Ecuador (Fauna y sus ecosistemas, Áreas protegidas)',
        content: 'La fauna silvestre ecuatoriana exhibe adaptaciones evolutivas únicas a los 91 tipos de ecosistemas continentales: desde los arrecifes y manglares costeros, pasando por los valles secos interandinos y páramos de frailejones, hasta las terrazas aluviales amazónicas con selvas inundables de igapó y várzea.',
        academicHighlights: [
          'Más de 440 especies de mamíferos continentales, incluyendo felinos tope (Panthera onca, Puma concolor) y megaherbívoros (Tapirus pinchaque).',
          'Los ecosistemas de manglar y páramo actúan como reservorios críticos de carbono azul y suelo orgánico andino (Andosoles).',
          'Interconexión biofísica entre las cuencas altas de captación hídrica protegidas y la productividad agropecuaria de las llanuras costeras.'
        ],
        keyConcepts: ['Fauna Ecosistémica', 'Carbono Azul', 'Andosoles', 'Conectividad Paisajística']
      },
      {
        id: '2.3',
        title: '2.3 Especies Endémicas (Flora ecosistémica y Manejo de cuencas hídricas)',
        content: 'El endemismo en el Ecuador continental es sobresaliente en plantas vasculares (>4.500 especies endémicas) y anfibios. Las cuencas hidrográficas de las vertientes del Pacífico y del Amazonas dependen de la cobertura vegetal nativa para evitar la colmatación de presas y regular las crecidas en época lluviosa.',
        academicHighlights: [
          'Concentración de especies endémicas en cordilleras aisladas (Cordillera del Cóndor, Cordillera Chongón-Colonche) y valles secos (Girón-Paute, Chota).',
          'El manejo integrado de cuencas hídricas (MICH) vincula la cartografía geomorfológica con la protección de bosques de ribera.',
          'Especies sombrilla endémicas sirven como indicadores cartográficos directos de la salud biológica del ecosistema.'
        ],
        keyConcepts: ['Endemismo Estricto', 'Especies Sombrilla', 'Manejo Integrado de Cuencas (MICH)', 'Regulación Hídrica']
      },
      {
        id: '2.4',
        title: '2.4 Extinción de las Especies (Principales amenazas para la pérdida de la biodiversidad)',
        content: 'La fragmentación antrópica del paisaje, la deforestación para monocultivos (palma aceitera, banano, pastos), la minería metálica aluvial y a gran escala, y el cambio climático constituyen las fuerzas directoras de extinción local en el territorio ecuatoriano.',
        academicHighlights: [
          'La fragmentación del hábitat aísla subpoblaciones, incrementando la endogamia genética y la vulnerabilidad ante enfermedades emergentes como el hongo quítrido (Batrachochytrium dendrobatidis).',
          'La minería ilegal en ríos amazónicos contamina con mercurio y sedimentos pesados las cadenas tróficas acuáticas.',
          'El retroceso acelerado de los glaciares andinos amenaza con desertificar los páramos secos de Chimborazo y Tungurahua.'
        ],
        keyConcepts: ['Fragmentación del Paisaje', 'Efecto de Borde', 'Bioacumulación de Metales Pesados', 'Quitridiomicosis']
      }
    ],
    externalResources: [
      {
        title: 'BioWeb Ecuador (PUCE)',
        description: 'Portal científico líder con catálogos actualizados de flora, aves, anfibios, reptiles y mamíferos del Ecuador con mapas de distribución y fichas taxonómicas.',
        url: 'https://bioweb.bio',
        badge: 'Base de Datos Taxonómica'
      },
      {
        title: 'Catálogo de Ecosistemas y Zonas Climáticas (MAATE)',
        description: 'Sistema nacional de clasificación de la vegetación del Ecuador continental con cartografía vectorial de 91 ecosistemas oficiales.',
        url: 'https://www.ambiente.gob.ec',
        badge: 'Cartografía Oficial'
      }
    ],
    guidesAssigned: ['guia-1', 'guia-2']
  },
  {
    id: 'unidad-3',
    title: 'Unidad 3: Conservación de la Biodiversidad en el Ecuador',
    subtitle: 'Marco Jurídico Constitucional, Gobernanza del SNAP y Análisis Territorial',
    themeColor: 'ocean',
    colorHex: '#0369a1',
    accentBg: 'bg-sky-50 text-sky-900 border-sky-200',
    statCallouts: [
      {
        value: '>20.3%',
        label: 'Territorio Continental Protegido',
        source: 'MAATE / Dirección de Áreas Protegidas (Más de 5.1 millones de hectáreas continentales en el SNAP)'
      },
      {
        value: '12.07%',
        label: 'Superficie Marina del SNAP',
        source: 'Subsecretaría de Gestión Marina y Costera (Reserva Marina Galápagos, Galápagos Hermandad y reservas costeras)'
      },
      {
        value: '78',
        label: 'Áreas Continentales Oficiales',
        source: 'Registro Oficial SNAP (Parques Nacionales, Reservas Ecológicas, Biológicas, Refugios y Áreas de Recreación)'
      },
      {
        value: 'Art. 71-74',
        label: 'Derechos de la Naturaleza',
        source: 'Constitución de la República del Ecuador (Pionera a nivel mundial en reconocer a la Pacha Mama como sujeto de derechos)'
      }
    ],
    subtopics: [
      {
        id: '3.1',
        title: '3.1 Ámbito legal y normativa ecuatoriana (Tratamiento constitucional y desarrollo normativo: Constitución de 2008 y Código Orgánico del Ambiente - COA)',
        content: 'Ecuador es el primer país del mundo en consagrar en su Carta Magna (Montecrísti, 2008) a la Naturaleza o Pacha Mama como sujeto de derechos (Arts. 71 al 74). El Código Orgánico del Ambiente (COA, 2017) y su Reglamento norman las herramientas de gestión preventiva, licenciamiento ambiental, régimen sancionatorio y la prohibición de actividades extractivas en áreas protegidas salvo declaratoria expresa de interés nacional por la Asamblea.',
        academicHighlights: [
          'Art. 71 CE: "La naturaleza o Pacha Mama, donde se reproduce y realiza la vida, tiene derecho a que se respete integralmente su existencia y el mantenimiento y regeneración de sus ciclos vitales".',
          'Art. 397 CE: En caso de daños ambientales el Estado actuará de forma inmediata y subsidiaria para garantizar la salud y la restauración de los ecosistemas.',
          'Código Orgánico del Ambiente (COA): Establece las 4 subsistemas del SNAP: Estatal, Autónomo Descentralizado, Comunitario y Privado.'
        ],
        keyConcepts: ['Derechos de la Naturaleza', 'Principio Precautorio', 'Código Orgánico del Ambiente (COA)', 'Subsistemas del SNAP']
      },
      {
        id: '3.2',
        title: '3.2 SNAP (Ordenamiento territorial y estrategias de manejo)',
        content: 'El Sistema Nacional de Áreas Protegidas (SNAP) es el conjunto de áreas naturales que garantizan la cobertura y conectividad de ecosistemas representativos. Los Planes de Manejo son instrumentos técnicos de ordenamiento territorial que delimitan las zonas de uso público, zona intangible, zona de amortiguamiento y zonas de restauración ecológica.',
        academicHighlights: [
          'La zonificación espacial interna en los Planes de Manejo define qué actividades se permiten en cada cuadrante cartográfico.',
          'Zonas intangibles como la Zona Intangible Tagaeri-Taromenane (ZITT) en Yasuní tienen prohibición perpetua de toda actividad extractiva.',
          'La integración del SNAP en los Planes de Desarrollo y Ordenamiento Territorial (PDOT) de los Gobiernos Autónomos Descentralizados (GAD).'
        ],
        keyConcepts: ['Zonificación de Áreas Protegidas', 'Planes de Manejo', 'Zonas Intangibles', 'PDOT Municipal/Provincial']
      },
      {
        id: '3.3',
        title: '3.3 Extinción de especies (Estrategias de conservación in situ y ex situ)',
        content: 'La conservación in situ salvaguarda a las especies dentro de sus hábitats y ecosistemas naturales (red de parques y reservas). La conservación ex situ actúa de manera complementaria mediante bancos de germoplasma vegetal, jardines botánicos, centros de rescate de fauna silvestre y zoocriaderos autorizados.',
        academicHighlights: [
          'Estrategia Nacional de Biodiversidad 2015-2030 alineada con las metas globales de Kunming-Montreal.',
          'Red de centros de rescate de fauna silvestre decomisada por el MAATE y la Unidad de Policía de Protección del Medio Ambiente (UPMA).',
          'Bancos de semillas nativas y germoplasma forestal del INIAP para la restauración post-incendio.'
        ],
        keyConcepts: ['Conservación In Situ', 'Conservación Ex Situ', 'Bancos de Germoplasma', 'Plan de Acción Kunming-Montreal']
      },
      {
        id: '3.4',
        title: '3.4 Estrategias y manejo de conservación (Clasificación, estructura del SNAP y el rol de las comunidades)',
        content: 'El éxito de la conservación radica en la gobernanza colaborativa. Las comunidades indígenas, afroecuatorianas y campesinas poseen derechos territoriales ancestrales. El SNAP reconoce el subsistema comunitario y los acuerdos de conservación mediante el Programa Socio Bosque.',
        academicHighlights: [
          'Programa Socio Bosque: Incentivos económicos directos a comunidades por conservación voluntaria de bosques nativos y páramos (más de 1.6 millones de hectáreas conservadas).',
          'Guardaparques comunitarios como guardianes de primera línea en monitoreo de fauna y control de talas.',
          'Articulación de corredores ecológicos binacionales (Ecuador-Colombia en el Chocó, Ecuador-Perú en la Cordillera del Cóndor).'
        ],
        keyConcepts: ['Socio Bosque', 'Gobernanza Comunitaria', 'Corredores Ecológicos', 'Co-manejo Territorial']
      }
    ],
    externalResources: [
      {
        title: 'Portal Oficial del SNAP (MAATE)',
        description: 'Plataforma oficial del Ministerio del Ambiente, Agua y Transición Ecológica con estadísticas de visitantes, fichas y cartografía descargable.',
        url: 'https://areasprotegidas.ambiente.gob.ec',
        badge: 'Portal Gubernamental'
      },
      {
        title: 'Marco Legal y Código Orgánico del Ambiente (COA)',
        description: 'Compendio legislativo del COA, su Reglamento general y resoluciones ministeriales sobre ordenamiento y vida silvestre.',
        url: 'https://www.ambiente.gob.ec/normativa-ambiental',
        badge: 'Legislación Ambiental'
      }
    ],
    guidesAssigned: ['guia-3', 'guia-4']
  }
];
