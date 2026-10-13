import { ProtectedArea } from '../types';

export const PROTECTED_AREAS: ProtectedArea[] = [
  {
    id: 'pn-yasuni',
    name: 'Parque Nacional Yasuní',
    category: 'Parque Nacional',
    province: 'Orellana y Pastaza',
    region: 'Amazonía',
    extensionHa: 1022736,
    creationYear: 1979,
    snapCode: 'SNAP-PN-01',
    coordinates: [-0.9500, -76.0500],
    zoomLevel: 9,
    polygon: [
      [-0.45, -76.65],
      [-0.48, -75.40],
      [-1.15, -75.25],
      [-1.45, -75.60],
      [-1.50, -76.50],
      [-1.10, -76.85],
      [-0.70, -76.75],
      [-0.45, -76.65]
    ],
    mainEcosystems: [
      'Bosque siempreverde de tierras bajas de la Amazonía',
      'Bosque inundable por aguas negras (Igapó)',
      'Bosque inundable por aguas blancas (Várzea)',
      'Moretales pantanosos dominados por Mauritia flexuosa'
    ],
    keySpecies: [
      { commonName: 'Jaguar', scientificName: 'Panthera onca', status: 'Vulnerable' },
      { commonName: 'Delfín rosado del Amazonas', scientificName: 'Inia geoffrensis', status: 'En Peligro' },
      { commonName: 'Águila Harpía', scientificName: 'Harpia harpyja', status: 'Vulnerable' },
      { commonName: 'Mono araña de vientre amarillo', scientificName: 'Ateles belzebuth', status: 'En Peligro' },
      { commonName: 'Cedro amargo', scientificName: 'Cedrela odorata', status: 'Vulnerable' }
    ],
    description: 'Declarado Reserva de la Biosfera por la UNESCO en 1989. Es considerado uno de los lugares más biodiversos del planeta por metro cuadrado, con récord mundial en riqueza de árboles, anfibios y murciélagos.',
    threats: [
      'Presión por bloques hidrocarburíferos y carreteras de penetración',
      'Cacería ilegal y fragmentación del dosel arbóreo',
      'Colonización no planificada en zonas de amortiguamiento'
    ],
    conservationObjectives: [
      'Proteger la integridad ecológica de la cuenca alta amazónica',
      'Garantizar el territorio ancestral y el aislamiento voluntario de los pueblos Tagaeri y Taromenane',
      'Mantener el banco genético vegetal y animal más diverso del neotrópico'
    ]
  },
  {
    id: 'pn-cotopaxi',
    name: 'Parque Nacional Cotopaxi',
    category: 'Parque Nacional',
    province: 'Cotopaxi, Pichincha y Napo',
    region: 'Sierra',
    extensionHa: 33393,
    creationYear: 1975,
    snapCode: 'SNAP-PN-02',
    coordinates: [-0.6800, -78.4360],
    zoomLevel: 11,
    polygon: [
      [-0.58, -78.52],
      [-0.57, -78.36],
      [-0.67, -78.33],
      [-0.79, -78.36],
      [-0.82, -78.48],
      [-0.77, -78.56],
      [-0.66, -78.55],
      [-0.58, -78.52]
    ],
    mainEcosystems: [
      'Páramo de pajonal y frailejones',
      'Matorral interandino',
      'Bosque siempreverde montano alto',
      'Zona nival y glaciar del estratovolcán'
    ],
    keySpecies: [
      { commonName: 'Cóndor andino', scientificName: 'Vultur gryphus', status: 'En Peligro Crítico' },
      { commonName: 'Oso de anteojos', scientificName: 'Tremarctos ornatus', status: 'En Peligro' },
      { commonName: 'Lobo de páramo', scientificName: 'Lycalopex culpaeus', status: 'Preocupación Menor' },
      { commonName: 'Gaviota andina', scientificName: 'Chroicocephalus serranus', status: 'Preocupación Menor' },
      { commonName: 'Puma andino', scientificName: 'Puma concolor', status: 'Vulnerable' }
    ],
    description: 'Hogar del majestuoso volcán Cotopaxi (5.897 msnm), uno de los volcanes activos más altos del mundo. Protege un invaluable ecosistema de páramo hídrico que abastece a Quito y valles aledaños.',
    threats: [
      'Pastoreo de ganado asilvestrado y quemas antropogénicas de pajonales',
      'Presión turística no controlada en la laguna de Limpiopungo',
      'Impacto del retroceso acelerado del casquete glaciar'
    ],
    conservationObjectives: [
      'Salvaguardar los ecosistemas de páramo como reguladores del ciclo hidrológico',
      'Conservar el hábitat reproductivo del cóndor andino',
      'Fomentar la educación ambiental y el turismo de alta montaña sostenible'
    ]
  },
  {
    id: 'pn-cajas',
    name: 'Parque Nacional Cajas',
    category: 'Parque Nacional',
    province: 'Azuay',
    region: 'Sierra',
    extensionHa: 28544,
    creationYear: 1996,
    snapCode: 'SNAP-PN-03',
    coordinates: [-2.8333, -79.2333],
    zoomLevel: 11,
    polygon: [
      [-2.72, -79.28],
      [-2.74, -79.16],
      [-2.85, -79.15],
      [-2.95, -79.20],
      [-2.94, -79.31],
      [-2.83, -79.33],
      [-2.72, -79.28]
    ],
    mainEcosystems: [
      'Páramo herbáceo y almohadillas higrófilas',
      'Complejo lacustre de origen glaciar (más de 230 lagunas)',
      'Bosque de Polylepis (Quinoa o árbol de papel)',
      'Matorral húmedo montano'
    ],
    keySpecies: [
      { commonName: 'Colibrí del Cajas', scientificName: 'Metallura baroni', status: 'En Peligro' },
      { commonName: 'Trucha arcoíris (especie introducida)', scientificName: 'Oncorhynchus mykiss', status: 'Preocupación Menor' },
      { commonName: 'Tapir andino', scientificName: 'Tapirus pinchaque', status: 'En Peligro Crítico' },
      { commonName: 'Curiquingue', scientificName: 'Phalcoboenus carunculatus', status: 'Preocupación Menor' },
      { commonName: 'Polylepis weberbaueri', scientificName: 'Polylepis weberbaueri', status: 'Vulnerable' }
    ],
    description: 'Sitio RAMSAR de importancia hidrológica internacional y Reserva de Biosfera Macizo del Cajas. El 60% del agua potable de la ciudad de Cuenca proviene de este nudo hidrográfico.',
    threats: [
      'Contaminación hídrica por especies acuáticas invasoras',
      'Presión por trazados viales (vía Cuenca - Molleturo)',
      'Frecuentes incendios forestales en época seca'
    ],
    conservationObjectives: [
      'Garantizar la recarga hídrica de las cuencas Tomebamba, Mazán y Yanuncay',
      'Proteger relictos relictuales de bosque nativo de Polylepis',
      'Conservar aves endémicas de distribución restringida a los páramos del sur'
    ]
  },
  {
    id: 'pn-podocarpus',
    name: 'Parque Nacional Podocarpus',
    category: 'Parque Nacional',
    province: 'Loja y Zamora Chinchipe',
    region: 'Sierra',
    extensionHa: 146280,
    creationYear: 1982,
    snapCode: 'SNAP-PN-04',
    coordinates: [-4.2000, -79.0500],
    zoomLevel: 10,
    polygon: [
      [-3.98, -79.18],
      [-3.95, -78.96],
      [-4.22, -78.92],
      [-4.48, -79.02],
      [-4.44, -79.22],
      [-4.18, -79.25],
      [-3.98, -79.18]
    ],
    mainEcosystems: [
      'Bosque nublado montano oriental',
      'Páramo arbustivo del sur de Ecuador',
      'Bosque de Romerillo (únicas coníferas nativas de Ecuador)',
      'Sistema de lagunas del Compadre'
    ],
    keySpecies: [
      { commonName: 'Romerillo azuceno', scientificName: 'Podocarpus sprucei', status: 'Vulnerable' },
      { commonName: 'Oso de anteojos', scientificName: 'Tremarctos ornatus', status: 'En Peligro' },
      { commonName: 'Pava de monte barbada', scientificName: 'Penelope barbata', status: 'Vulnerable' },
      { commonName: 'Gallo de la peña andino', scientificName: 'Rupicola peruvianus', status: 'Preocupación Menor' },
      { commonName: 'Tapir de montaña', scientificName: 'Tapirus pinchaque', status: 'En Peligro Crítico' }
    ],
    description: 'Bautizado en honor al árbol de Romerillo (*Podocarpus*), la única conífera nativa del Ecuador. Constituye un puente biogeográfico vital entre los Andes y la cuenca amazónica del Marañón.',
    threats: [
      'Minería aluvial y subterránea ilegal en las cuencas de los ríos Zamora y Nangaritza',
      'Deforestación para pastos ganaderos en las vertientes orientales',
      'Extracción ilegal de madera fina y orquídeas'
    ],
    conservationObjectives: [
      'Preservar los últimos bosques maduros de podocarpáceas andinas',
      'Garantizar caudales limpios para las provincias de Loja y Zamora',
      'Proteger la rica avifauna de endemismo de Tumbes-Chocó-Magdalena'
    ]
  },
  {
    id: 'pn-sangay',
    name: 'Parque Nacional Sangay',
    category: 'Parque Nacional',
    province: 'Morona Santiago, Chimborazo, Tungurahua y Cañar',
    region: 'Amazonía',
    extensionHa: 502067,
    creationYear: 1975,
    snapCode: 'SNAP-PN-05',
    coordinates: [-2.0000, -78.3300],
    zoomLevel: 9,
    polygon: [
      [-1.48, -78.48],
      [-1.52, -78.18],
      [-2.15, -78.12],
      [-2.65, -78.38],
      [-2.52, -78.65],
      [-1.95, -78.60],
      [-1.48, -78.48]
    ],
    mainEcosystems: [
      'Páramo pluvial subandino',
      'Bosque nublado montano alto y bajo',
      'Bosques húmedos piemontanos amazónicos',
      'Estratos volcánicos activos (Volcán Sangay y Tungurahua)'
    ],
    keySpecies: [
      { commonName: 'Tapir andino', scientificName: 'Tapirus pinchaque', status: 'En Peligro Crítico' },
      { commonName: 'Oso de anteojos', scientificName: 'Tremarctos ornatus', status: 'En Peligro' },
      { commonName: 'Cóndor andino', scientificName: 'Vultur gryphus', status: 'En Peligro Crítico' },
      { commonName: 'Nutria gigante de río', scientificName: 'Pteronura brasiliensis', status: 'En Peligro' },
      { commonName: 'Puma', scientificName: 'Puma concolor', status: 'Vulnerable' }
    ],
    description: 'Declarado Patrimonio Natural de la Humanidad por la UNESCO en 1983. Alberga tres volcanes icónicos: Sangay (continuamente activo), Tungurahua y el extinguido Altar con su caldera turquesa.',
    threats: [
      'Construcción de la carretera Guamote-Macas que segmenta el corredor biológico',
      'Caza furtiva en zonas de difícil acceso',
      'Avance de la frontera agrícola en el flanco occidental'
    ],
    conservationObjectives: [
      'Salvaguardar el gradiente ecológico completo desde nieves perpetuas (5.230 m) hasta la selva amazónica (900 m)',
      'Asegurar el corredor genético de mamíferos mayores andino-amazónicos'
    ]
  },
  {
    id: 'pn-cayambe-coca',
    name: 'Parque Nacional Cayambe-Coca',
    category: 'Parque Nacional',
    province: 'Pichincha, Imbabura, Napo y Sucumbíos',
    region: 'Amazonía',
    extensionHa: 403103,
    creationYear: 1970,
    snapCode: 'SNAP-PN-06',
    coordinates: [-0.1000, -77.8500],
    zoomLevel: 10,
    polygon: [
      [0.22, -78.05],
      [0.18, -77.60],
      [-0.25, -77.50],
      [-0.50, -77.78],
      [-0.42, -78.15],
      [-0.05, -78.20],
      [0.22, -78.05]
    ],
    mainEcosystems: [
      'Páramo húmedo y humedales de altura',
      'Bosque de neblina montano oriental',
      'Bosque piemontano amazónico',
      'Casquete glaciar del volcán Cayambe (5.790 msnm)'
    ],
    keySpecies: [
      { commonName: 'Cóndor andino', scientificName: 'Vultur gryphus', status: 'En Peligro Crítico' },
      { commonName: 'Oso andino', scientificName: 'Tremarctos ornatus', status: 'En Peligro' },
      { commonName: 'Cuchucho andino', scientificName: 'Nasuella olivacea', status: 'Preocupación Menor' },
      { commonName: 'Armadillo gigante', scientificName: 'Priodontes maximus', status: 'Vulnerable' }
    ],
    description: 'Conocido como el "Parque del Agua", protege las nacientes que alimentan la mayor central hidroeléctrica del país (Coca Codo Sinclair) y los principales acueductos del Distrito Metropolitano de Quito.',
    threats: [
      'Procesos de erosión regresiva en la cuenca del río Coca',
      'Trazado de oleoductos y carreteras transversales',
      'Deforestación en zonas periféricas orientales'
    ],
    conservationObjectives: [
      'Proteger la mayor fábrica hídrica del norte del Ecuador',
      'Asegurar la viabilidad genética del oso andino y cóndor'
    ]
  },
  {
    id: 're-manglares-churute',
    name: 'Reserva Ecológica Manglares Churute',
    category: 'Reserva Ecológica',
    province: 'Guayas',
    region: 'Costa',
    extensionHa: 49383,
    creationYear: 1979,
    snapCode: 'SNAP-RE-01',
    coordinates: [-2.4300, -79.6300],
    zoomLevel: 11,
    polygon: [
      [-2.32, -79.72],
      [-2.30, -79.58],
      [-2.45, -79.55],
      [-2.58, -79.62],
      [-2.55, -79.75],
      [-2.42, -79.76],
      [-2.32, -79.72]
    ],
    mainEcosystems: [
      'Manglar estuarino del Golfo de Guayaquil (Mangle rojo, negro, blanco y jeli)',
      'Bosque seco tropical de colinas',
      'Bosque nublado costero de cerros aislados (Cerro Pancho Diablo)',
      'Laguna estacional El Canclón (humedal dulceacuícola)'
    ],
    keySpecies: [
      { commonName: 'Canclón (ave acuática)', scientificName: 'Anhima cornuta', status: 'En Peligro' },
      { commonName: 'Cocodrilo de la Costa', scientificName: 'Crocodylus acutus', status: 'En Peligro Crítico' },
      { commonName: 'Mono aullador de la costa', scientificName: 'Alouatta palliata aequatorialis', status: 'En Peligro' },
      { commonName: 'Cangrejo rojo del manglar', scientificName: 'Ucides occidentalis', status: 'Preocupación Menor' },
      { commonName: 'Concha prieta', scientificName: 'Anadara tuberculosa', status: 'Vulnerable' }
    ],
    description: 'Primer humedal RAMSAR del Ecuador continental (1990). Protege la mayor superficie remanente de manglares del Golfo de Guayaquil y colinas con bosque seco que albergan especies de flora endémicas.',
    threats: [
      'Expansión de piscinas camaroneras ilegales',
      'Sedimentación y escorrentía con agroquímicos desde cuencas agrícolas',
      'Presión por sobreexplotación de cangrejo rojo y concha prieta'
    ],
    conservationObjectives: [
      'Preservar el ciclo reproductivo de la ictiofauna marina y de crustáceos estuarinos',
      'Mantener la barrera natural contra huracanes, erosión costera y tsunamis',
      'Salvaguardar a la única población viable de Anhima cornuta en la costa ecuatoriana'
    ]
  },
  {
    id: 're-cotacachi-cayapas',
    name: 'Reserva Ecológica Cotacachi-Cayapas',
    category: 'Reserva Ecológica',
    province: 'Esmeraldas e Imbabura',
    region: 'Costa',
    extensionHa: 260971,
    creationYear: 1968,
    snapCode: 'SNAP-RE-02',
    coordinates: [0.4500, -78.6000],
    zoomLevel: 10,
    polygon: [
      [0.85, -78.90],
      [0.78, -78.45],
      [0.35, -78.30],
      [0.15, -78.45],
      [0.22, -78.85],
      [0.60, -79.05],
      [0.85, -78.90]
    ],
    mainEcosystems: [
      'Bosque húmedo tropical del Chocó biogeográfico',
      'Bosque nublado montano occidental',
      'Páramo andino de almohadillas y pajonal',
      'Laguna volcánica de Cuicocha'
    ],
    keySpecies: [
      { commonName: 'Mono araña de la cabeza café', scientificName: 'Ateles fusciceps fusciceps', status: 'En Peligro Crítico' },
      { commonName: 'Nutria neotropical', scientificName: 'Lontra longicaudis', status: 'Vulnerable' },
      { commonName: 'Tucán del Chocó', scientificName: 'Ramphastos brevis', status: 'Preocupación Menor' },
      { commonName: 'Puma de la costa', scientificName: 'Puma concolor', status: 'Vulnerable' },
      { commonName: 'Zamarrito pechinegro', scientificName: 'Eriocnemis nigrivestis', status: 'En Peligro Crítico' }
    ],
    description: 'Abarca uno de los gradientes altitudinales más extremos del planeta: desde los 30 msnm en el Chocó de Esmeraldas hasta los 4.939 msnm en el volcán Cotacachi. Punto crítico de biodiversidad global.',
    threats: [
      'Proyectos mineros a gran escala y minería ilegal en el valle de Intag',
      'Deforestación para monocultivos de palma aceitera en las tierras bajas',
      'Cacería de subsistencia insostenible'
    ],
    conservationObjectives: [
      'Conservar el núcleo más intacto del hotspot global Chocó-Andino',
      'Proteger el hábitat de uno de los 25 primates más amenazados del planeta (Ateles fusciceps)',
      'Mantener la conectividad biofísica entre la planicie marina y la cordillera occidental'
    ]
  },
  {
    id: 're-antisana',
    name: 'Reserva Ecológica Antisana',
    category: 'Reserva Ecológica',
    province: 'Napo y Pichincha',
    region: 'Sierra',
    extensionHa: 120000,
    creationYear: 1993,
    snapCode: 'SNAP-RE-03',
    coordinates: [-0.4800, -78.1500],
    zoomLevel: 10,
    polygon: [
      [-0.30, -78.28],
      [-0.28, -78.02],
      [-0.55, -77.95],
      [-0.72, -78.10],
      [-0.65, -78.32],
      [-0.45, -78.35],
      [-0.30, -78.28]
    ],
    mainEcosystems: [
      'Páramo de pajonal y humedales de altura (Laguna de Mica)',
      'Bosque siempreverde montano alto de la cordillera oriental',
      'Flujos de lava basáltica recientes',
      'Glaciar del volcán Antisana (5.758 msnm)'
    ],
    keySpecies: [
      { commonName: 'Cóndor andino', scientificName: 'Vultur gryphus', status: 'En Peligro Crítico' },
      { commonName: 'Bandurria andina', scientificName: 'Theristicus branickii', status: 'En Peligro' },
      { commonName: 'Oso de anteojos', scientificName: 'Tremarctos ornatus', status: 'En Peligro' },
      { commonName: 'Lobo de páramo', scientificName: 'Lycalopex culpaeus', status: 'Preocupación Menor' }
    ],
    description: 'El mayor santuario del cóndor andino en el Ecuador, albergando más del 50% de la población silvestre estimada del país. Abastece el 30% del agua potable para el Distrito Metropolitano de Quito.',
    threats: [
      'Ataques de perros ferales a la fauna silvestre nativa',
      'Conflicto humano-carnívoro con ganaderos por ataques a ganado vacuno',
      'Retroceso del glaciar por forzamiento térmico global'
    ],
    conservationObjectives: [
      'Proteger los dormideros y sitios de anidación del cóndor andino',
      'Garantizar la estabilidad de la cuenca hídrica de la represa La Mica-Quito Sur'
    ]
  },
  {
    id: 'rpf-cuyabeno',
    name: 'Reserva de Producción de Fauna Cuyabeno',
    category: 'Reserva de Producción de Fauna',
    province: 'Sucumbíos y Orellana',
    region: 'Amazonía',
    extensionHa: 590112,
    creationYear: 1979,
    snapCode: 'SNAP-RPF-01',
    coordinates: [-0.1500, -75.8000],
    zoomLevel: 9,
    polygon: [
      [0.25, -76.30],
      [0.20, -75.35],
      [-0.35, -75.20],
      [-0.55, -75.65],
      [-0.40, -76.25],
      [-0.05, -76.40],
      [0.25, -76.30]
    ],
    mainEcosystems: [
      'Complejo lacustre de aguas negras (Laguna Grande)',
      'Bosque de igapó inundado periódicamente',
      'Bosque de tierra firme amazónico'
    ],
    keySpecies: [
      { commonName: 'Delfín rosado', scientificName: 'Inia geoffrensis', status: 'En Peligro' },
      { commonName: 'Manatí amazónico', scientificName: 'Trichechus inunguis', status: 'En Peligro Crítico' },
      { commonName: 'Caimán negro', scientificName: 'Melanosuchus niger', status: 'Preocupación Menor' },
      { commonName: 'Anaconda verde', scientificName: 'Eunectes murinus', status: 'Preocupación Menor' },
      { commonName: 'Paiche', scientificName: 'Arapaima gigas', status: 'Vulnerable' }
    ],
    description: 'Uno de los sistemas acuáticos continentales más extensos y ricos del planeta. Coexiste armónicamente con cinco nacionalidades indígenas: Siona, Secoya, Cofán, Kichwa y Shuar.',
    threats: [
      'Presión por derrames de crudo en zonas aledañas al río Aguarico',
      'Turismo de alta intensidad en Laguna Grande',
      'Tala ilegal selectiva de árboles maderables gigantes'
    ],
    conservationObjectives: [
      'Garantizar la conservación de la fauna acuática amenazada (manatíes, delfines, nutrias)',
      'Fortalecer el co-manejo participativo comunitario indígena del territorio'
    ]
  },
  {
    id: 'rpf-chimborazo',
    name: 'Reserva de Producción de Fauna Chimborazo',
    category: 'Reserva de Producción de Fauna',
    province: 'Chimborazo, Bolívar y Tungurahua',
    region: 'Sierra',
    extensionHa: 58560,
    creationYear: 1987,
    snapCode: 'SNAP-RPF-02',
    coordinates: [-1.4690, -78.8170],
    zoomLevel: 11,
    polygon: [
      [-1.35, -78.92],
      [-1.33, -78.72],
      [-1.48, -78.70],
      [-1.60, -78.80],
      [-1.58, -78.95],
      [-1.45, -78.98],
      [-1.35, -78.92]
    ],
    mainEcosystems: [
      'Arenal y desierto de páramo de alta montaña',
      'Páramo seco andino de pajonal',
      'Cumbres nivales del Chimborazo (6.263 msnm, punto más cercano al sol desde el centro de la Tierra)',
      'Volcán Carihuairazo (5.018 msnm)'
    ],
    keySpecies: [
      { commonName: 'Vicuña', scientificName: 'Vicugna vicugna', status: 'Preocupación Menor' },
      { commonName: 'Alpaca', scientificName: 'Lama pacos', status: 'Preocupación Menor' },
      { commonName: 'Llama', scientificName: 'Lama glama', status: 'Preocupación Menor' },
      { commonName: 'Estrellita ecuatoriana (colibrí)', scientificName: 'Oreotrochilus chimborazo', status: 'Preocupación Menor' },
      { commonName: 'Lobo de páramo', scientificName: 'Lycalopex culpaeus', status: 'Preocupación Menor' }
    ],
    description: 'Establecida expresamente para el reasentamiento y manejo comunitario de camélidos sudamericanos (vicuñas reintroducidas de Chile y Bolivia). Sus suelos arenosos regulan aguas hacia la vertiente del Guayas.',
    threats: [
      'Desertificación y sobrepastoreo ovino/bovino en zonas bajas',
      'Quemas intencionales de pajonal para rebrote de pastos',
      'Pérdida acelerada del glaciar del Carihuairazo (declarado en extinción)'
    ],
    conservationObjectives: [
      'Fomentar la crianza y esquila sostenible de vicuñas para beneficio de comunidades indígenas',
      'Conservar el ecosistema de súper-páramo arenoso'
    ]
  },
  {
    id: 'rb-limoncocha',
    name: 'Reserva Biológica Limoncocha',
    category: 'Reserva Biológica',
    province: 'Sucumbíos',
    region: 'Amazonía',
    extensionHa: 4613,
    creationYear: 1985,
    snapCode: 'SNAP-RB-01',
    coordinates: [-0.4000, -76.6200],
    zoomLevel: 13,
    polygon: [
      [-0.37, -76.65],
      [-0.36, -76.58],
      [-0.43, -76.57],
      [-0.45, -76.64],
      [-0.37, -76.65]
    ],
    mainEcosystems: [
      'Laguna eutrófica de aguas negras y bosque de moretal',
      'Pantano herbáceo ribereño del río Napo',
      'Bosque secundario y primario húmedo tropical'
    ],
    keySpecies: [
      { commonName: 'Caimán negro', scientificName: 'Melanosuchus niger', status: 'Preocupación Menor' },
      { commonName: 'Hoatzín (Pava hedionda)', scientificName: 'Opisthocomus hoazin', status: 'Preocupación Menor' },
      { commonName: 'Mono ardilla', scientificName: 'Saimiri sciureus', status: 'Preocupación Menor' },
      { commonName: 'Piraña roja', scientificName: 'Pygocentrus nattereri', status: 'Preocupación Menor' }
    ],
    description: 'Humedal RAMSAR de enorme valor ornitológico con más de 450 especies de aves registradas en un territorio compacto. Protege la laguna de Limoncocha y la laguna Negra.',
    threats: [
      'Eutrofización del agua por escorrentías urbanas de la parroquia Limoncocha',
      'Actividades hidrocarburíferas del bloque Shushufindi-Limoncocha',
      'Crecimiento de lechuga de agua y jacintos invasores'
    ],
    conservationObjectives: [
      'Monitorear la población de caimán negro en sistemas lacustres',
      'Promover la investigación científica y la educación ambiental universitaria'
    ]
  },
  {
    id: 'rvs-pasochoa',
    name: 'Refugio de Vida Silvestre Pasochoa',
    category: 'Refugio de Vida Silvestre',
    province: 'Pichincha',
    region: 'Sierra',
    extensionHa: 500,
    creationYear: 1996,
    snapCode: 'SNAP-RVS-01',
    coordinates: [-0.4500, -78.4800],
    zoomLevel: 13,
    polygon: [
      [-0.43, -78.50],
      [-0.42, -78.46],
      [-0.48, -78.45],
      [-0.49, -78.49],
      [-0.43, -78.50]
    ],
    mainEcosystems: [
      'Bosque andino de neblina en caldera volcánica extinta',
      'Matorral interandino húmedo',
      'Páramo del cráter del Pasochoa'
    ],
    keySpecies: [
      { commonName: 'Puma andino', scientificName: 'Puma concolor', status: 'Vulnerable' },
      { commonName: 'Urcu-paloma (Paloma andina)', scientificName: 'Zenaida auriculata', status: 'Preocupación Menor' },
      { commonName: 'Pumamaqui', scientificName: 'Oreopanax ecuadorensis', status: 'Preocupación Menor' },
      { commonName: 'Quishuar', scientificName: 'Buddleja incana', status: 'Preocupación Menor' }
    ],
    description: 'Protege uno de los últimos remanentes de bosque andino primario dentro de la caldera colapsada de un volcán apagado, inaccesible a la tala por sus escarpadas paredes.',
    threats: [
      'Presión urbana de los valles de Los Chillos y Machachi',
      'Incendios forestales en la época de vientos de verano',
      'Presencia de perros de fincas agrícolas vecinas'
    ],
    conservationObjectives: [
      'Conservar el banco genético del bosque nublado interandino primario',
      'Servir como aula viva para escuelas y universidades de Pichincha'
    ]
  },
  {
    id: 'rg-pululahua',
    name: 'Reserva Geobotánica Pululahua',
    category: 'Reserva Geobotánica',
    province: 'Pichincha',
    region: 'Sierra',
    extensionHa: 3383,
    creationYear: 1966,
    snapCode: 'SNAP-RG-01',
    coordinates: [-0.0380, -78.5000],
    zoomLevel: 13,
    polygon: [
      [-0.01, -78.53],
      [-0.01, -78.46],
      [-0.07, -78.46],
      [-0.07, -78.52],
      [-0.01, -78.53]
    ],
    mainEcosystems: [
      'Bosque nublado montano de caldera volcánica',
      'Matorral seco interandino',
      'Domo de lava volcánica fértil habitado por comunidad campesina'
    ],
    keySpecies: [
      { commonName: 'Orquídea Epidendrum', scientificName: 'Epidendrum quitensium', status: 'Vulnerable' },
      { commonName: 'Lobo de páramo', scientificName: 'Lycalopex culpaeus', status: 'Preocupación Menor' },
      { commonName: 'Pava de monte andina', scientificName: 'Penelope montagnii', status: 'Preocupación Menor' },
      { commonName: 'Cedro andino', scientificName: 'Cedrela montana', status: 'En Peligro' }
    ],
    description: 'Una de las dos únicas calderas volcánicas habitadas en el planeta tierra. Su nombre quechua significa "nube de agua", debido a la niebla condensada permanente que nutre cientos de orquídeas.',
    threats: [
      'Extracción de carbonato de calcio y canteras en bordes externos',
      'Residuos sólidos por turismo masivo desde la Mitad del Mundo',
      'Cambio de uso de suelo en el cráter interior'
    ],
    conservationObjectives: [
      'Preservar la singular asociación geobotánica de flora en sustrato volcánico reciente',
      'Mantener la convivencia armónica entre agricultura tradicional campesina y la flora protegida'
    ]
  },
  {
    id: 're-el-angel',
    name: 'Reserva Ecológica El Ángel',
    category: 'Reserva Ecológica',
    province: 'Carchi',
    region: 'Sierra',
    extensionHa: 16005,
    creationYear: 1992,
    snapCode: 'SNAP-RE-04',
    coordinates: [0.7300, -77.8700],
    zoomLevel: 11,
    polygon: [
      [0.82, -77.94],
      [0.80, -77.80],
      [0.65, -77.82],
      [0.62, -77.93],
      [0.72, -77.96],
      [0.82, -77.94]
    ],
    mainEcosystems: [
      'Páramo de frailejones gigantes (Espeletia pycnophylla)',
      'Bosque de Polylepis de altura',
      'Humedales y lagunas glaciares de El Voladero'
    ],
    keySpecies: [
      { commonName: 'Frailejón del Carchi', scientificName: 'Espeletia pycnophylla', status: 'Casi Amenazado' },
      { commonName: 'Cóndor andino', scientificName: 'Vultur gryphus', status: 'En Peligro Crítico' },
      { commonName: 'Venado de cola blanca', scientificName: 'Odocoileus virginianus', status: 'Preocupación Menor' },
      { commonName: 'Pato punteado andino', scientificName: 'Anas puna', status: 'Preocupación Menor' }
    ],
    description: 'Famosa mundialmente por sus densos bosques de Frailejones (*Espeletia*), plantas con hojas aterciopeladas que pueden medir hasta 5 metros y capturan la humedad de la niebla como esponjas.',
    threats: [
      'Quemas de frailejones durante festividades o cacería',
      'Invasión de trucha arcoíris en lagunas naturales',
      'Drenaje de turberas para agricultura de papa'
    ],
    conservationObjectives: [
      'Proteger la mayor densidad de Espeletia pycnophylla de los Andes equinocciales',
      'Asegurar el agua potable y de regadío para la provincia del Carchi'
    ]
  },
  {
    id: 'pn-llanganates',
    name: 'Parque Nacional Llanganates',
    category: 'Parque Nacional',
    province: 'Tungurahua, Cotopaxi, Napo y Pastaza',
    region: 'Sierra',
    extensionHa: 219707,
    creationYear: 1996,
    snapCode: 'SNAP-PN-07',
    coordinates: [-1.2200, -78.2500],
    zoomLevel: 10,
    polygon: [
      [-1.02, -78.40],
      [-1.00, -78.10],
      [-1.38, -78.08],
      [-1.45, -78.35],
      [-1.25, -78.45],
      [-1.02, -78.40]
    ],
    mainEcosystems: [
      'Páramo pluvial de ciénaga y turbera',
      'Bosque montano pluvial de neblina',
      'Complejo lacustre altoandino Llanganati'
    ],
    keySpecies: [
      { commonName: 'Tapir andino', scientificName: 'Tapirus pinchaque', status: 'En Peligro Crítico' },
      { commonName: 'Oso de anteojos', scientificName: 'Tremarctos ornatus', status: 'En Peligro' },
      { commonName: 'Puma andino', scientificName: 'Puma concolor', status: 'Vulnerable' },
      { commonName: 'Lagartija de Llanganates', scientificName: 'Pholidobolus dicrus', status: 'En Peligro' }
    ],
    description: 'Zona de topografía abrupta e inaccesible envuelta en la leyenda del tesoro inca de Atahualpa escondido por Rumiñahui. Es un humedal RAMSAR de regulación hidrológica vital para la cuenca del Pastaza.',
    threats: [
      'Avanzada de buscadores informales de tesoros que alteran turberas',
      'Apertura no planificada de senderos ecoturísticos',
      'Extracción maderera en la vertiente oriental amazónica'
    ],
    conservationObjectives: [
      'Conservar el sistema de páramos hiperhúmedos más prístino del país',
      'Mantener la conectividad con el Parque Nacional Sangay y el corredor ecológico Llanganates-Sangay'
    ]
  },
  {
    id: 'rvs-manglares-muisne',
    name: 'Refugio de Vida Silvestre Manglares Estuario Río Muisne',
    category: 'Refugio de Vida Silvestre',
    province: 'Esmeraldas y Manabí',
    region: 'Costa',
    extensionHa: 3173,
    creationYear: 2003,
    snapCode: 'SNAP-RVS-02',
    coordinates: [0.6000, -80.0200],
    zoomLevel: 12,
    polygon: [
      [0.66, -80.05],
      [0.65, -79.98],
      [0.55, -79.98],
      [0.54, -80.06],
      [0.66, -80.05]
    ],
    mainEcosystems: [
      'Manglar de estuario marino',
      'Canales de marea e intermareales',
      'Bosque húmedo litoral'
    ],
    keySpecies: [
      { commonName: 'Pájaro fragata', scientificName: 'Fregata magnificens', status: 'Preocupación Menor' },
      { commonName: 'Concha prieta', scientificName: 'Anadara tuberculosa', status: 'Vulnerable' },
      { commonName: 'Mangle rojo', scientificName: 'Rhizophora mangle', status: 'Preocupación Menor' },
      { commonName: 'Cangrejo azul', scientificName: 'Cardisoma crassum', status: 'Preocupación Menor' }
    ],
    description: 'Creado para proteger los últimos remanentes de manglares del estuario de Muisne y Cojimíes tras la devastación provocada por las camaroneras en las décadas de 1980 y 1990.',
    threats: [
      'Tala clandestina para leña y carbón vegetal',
      'Contaminación por vertidos de aguas residuales urbanas',
      'Sedimentación excesiva por deforestación cuenca arriba'
    ],
    conservationObjectives: [
      'Recuperar las áreas degradadas de manglar con participación comunitaria afroecuatoriana',
      'Proteger la soberanía alimentaria de concheras y pescadores artesanales'
    ]
  },
  {
    id: 'anr-el-boliche',
    name: 'Área Nacional de Recreación El Boliche',
    category: 'Área Nacional de Recreación',
    province: 'Cotopaxi y Pichincha',
    region: 'Sierra',
    extensionHa: 392,
    creationYear: 1979,
    snapCode: 'SNAP-ANR-01',
    coordinates: [-0.6000, -78.5300],
    zoomLevel: 13,
    polygon: [
      [-0.58, -78.54],
      [-0.58, -78.51],
      [-0.62, -78.51],
      [-0.62, -78.54],
      [-0.58, -78.54]
    ],
    mainEcosystems: [
      'Bosque sembrado de pino (Pinus radiata)',
      'Remanentes de páramo y matorral interandino',
      'Humedales de recarga'
    ],
    keySpecies: [
      { commonName: 'Chucuri (comadreja andina)', scientificName: 'Mustela frenata', status: 'Preocupación Menor' },
      { commonName: 'Zorro de páramo', scientificName: 'Lycalopex culpaeus', status: 'Preocupación Menor' },
      { commonName: 'Pumamaqui', scientificName: 'Oreopanax ecuadorensis', status: 'Preocupación Menor' }
    ],
    description: 'Adyacente al Parque Nacional Cotopaxi, es un centro emblemático de educación ambiental, senderismo y campamento para escuelas de la zona interandina central.',
    threats: [
      'Acumulación de basura en zonas de pic-nic',
      'Efectos acidificantes de plantaciones exóticas de pino sobre el suelo'
    ],
    conservationObjectives: [
      'Educación ecológica escolar y recreación pasiva en la naturaleza',
      'Transición gradual hacia vegetación nativa arbustiva'
    ]
  }
];
