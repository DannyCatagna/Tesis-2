import { QuizQuestion } from '../types';

export const FORMATIVE_QUIZ: QuizQuestion[] = [
  {
    id: 'q-1',
    question: '¿Qué sistema geodésico y zona de proyección UTM debe seleccionarse para realizar un análisis de buffer en la Reserva Ecológica Manglares Churute (Provincia del Guayas)?',
    context: 'Caso Práctico: Un equipo técnico necesita calcular la faja de protección marina y zonas de amortiguamiento en el Golfo de Guayaquil.',
    options: [
      'WGS84 / UTM Zona 17 Sur (EPSG: 32717)',
      'PSAD56 / UTM Zona 18 Norte (EPSG: 24878)',
      'WGS84 / UTM Zona 18 Sur (EPSG: 32718)',
      'Coordenadas Geocéntricas ITRF92 sin proyección'
    ],
    correctIndex: 0,
    feedback: '¡Correcto! La provincia del Guayas y la totalidad del litoral ecuatoriano se sitúan al oeste del meridiano 78°W, por lo que corresponden rigurosamente a la Zona UTM 17 Sur con el marco oficial WGS84 / SIRGAS-Ecuador (código EPSG: 32717).'
  },
  {
    id: 'q-2',
    question: 'Según la Constitución de 2008 y el Código Orgánico del Ambiente (COA), ¿qué característica jurídica distingue a una "Zona Intangible" dentro de un área protegida como el Parque Nacional Yasuní?',
    context: 'Marco Normativo Ambiental: Delimitación de la Zona Intangible Tagaeri-Taromenane (ZITT).',
    options: [
      'Se permite la tala comercial con planes de manejo aprobados por el GAD provincial.',
      'Existe prohibición absoluta y perpetua de todo tipo de actividad extractiva (petróleo, minería o madera) y obras de infraestructura de penetración.',
      'Permite la minería artesanal siempre que no use mercurio en ríos navegables.',
      'Es un área administrada exclusivamente por empresas privadas ecoturísticas certificadas.'
    ],
    correctIndex: 1,
    feedback: '¡Exacto! El Art. 407 de la Constitución y el COA prohíben de forma absoluta y perpetua cualquier actividad extractiva o de alteración biofísica en las Zonas Intangibles, salvaguardando la vida de pueblos en aislamiento voluntario y la máxima integridad ecológica.'
  },
  {
    id: 'q-3',
    question: 'Al realizar un análisis multitemporal de deforestación en NASA Worldview en la cuenca amazónica, ¿por qué es indispensable filtrar imágenes con menos del 20% de cobertura nubosa?',
    context: 'Teledetección Satelital: Uso de productos reflectivos True Color de sensores ópticos MODIS y VIIRS.',
    options: [
      'Porque las nubes reducen la velocidad de descarga en internet del navegador.',
      'Porque la alta reflectancia espectral de las nubes en el espectro visible satura los píxeles y oculta la superficie terrestre, pudiendo falsear cambios de cobertura.',
      'Porque los sensores infrarrojos térmicos solo funcionan con temperatura bajo cero.',
      'Porque la NASA bloquea el acceso a imágenes nubladas por normativas de seguridad militar.'
    ],
    correctIndex: 1,
    feedback: '¡Excelente! Los sensores ópticos pasivos no pueden penetrar la cubierta de nubes densas; una nube puede ocultar tanto bosque primario como áreas taladas o incendios activos, introduciendo sesgos severos en el análisis temporal.'
  },
  {
    id: 'q-4',
    question: '¿Qué operación de geoprocesamiento SIG utilizarías para cuantificar exactamente cuántas hectáreas de un ecosistema en peligro quedan dentro de concesiones mineras activas?',
    context: 'Análisis de Superposición Espacial (Overlay Analysis) en el Sistema Único de Información Ambiental.',
    options: [
      'Disolución (Dissolve) con campo de provincia.',
      'Intersección (Intersect) entre la capa vectorial de ecosistemas y la capa de catastros mineros.',
      'Buffer concéntrico de 50 km sin cálculo de áreas.',
      'Exportación a formato KML sin atributos alfanuméricos.'
    ],
    correctIndex: 1,
    feedback: '¡Respuesta correcta! La operación de Intersección (Intersect) genera un nuevo polígono que representa únicamente la coincidencia geométrica espacial entre ambas capas, uniendo sus atributos para permitir el recálculo exacto del área en hectáreas.'
  }
];
