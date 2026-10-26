import { LEARNING_RUBRIC } from './learningRubric';
import { DidacticGuide } from '../types';

export const DIDACTIC_GUIDES: DidacticGuide[] = [
  {
    id: 'guia-1',
    number: 1,
    title: 'Modelamiento de Nichos y Distribución Espacial de Especies Endémicas en el Ecuador',
    unitId: 'unidad-2',
    unitTitle: 'Unidad 2: Ecuador, País Megadiverso',
    platform: 'Google Earth Web',
    platformUrl: 'https://earth.google.com/web/',
    themeColor: 'jungle',
    estimatedTime: '3.5 Horas pedagógicas',
    didacticAnalogy: {
      analogyTitle: 'El Ascensor Bioclimático de los Andes Ecuatorianos',
      analogyStory: 'Imagina que entras en un ascensor en la Amazonía a 28 °C y subes verticalmente por la cordillera: cada 100 metros que asciendes, la temperatura desciende 0.65 °C. Al llegar al piso 3.000 (3.000 msnm), el termómetro marca 8 °C y los árboles grandes desaparecen, dando paso a los pajonales y frailejones de páramo. Un colibrí adaptado a la alta radiación y frío del páramo no puede bajar a los valles calientes porque su metabolismo se sobrecalentaría.',
      whyItMatters: 'Permite a los alumnos de secundaria comprender la gradiente altitudinal y el nicho ecológico sin memorizar fórmulas complejas.'
    },
    quimicaBiologiaConnection: {
      biologyConcepts: [
        'Nicho fundamental vs realizado (Grinnell y Hutchinson)',
        'Línea de árboles (timberline) y adaptación morfológica de especies andinas',
        'Endemismo restringido en cuencas de alta montaña (Podocarpus sprucei, Oreotrochilus)'
      ],
      chemistryConcepts: [
        'Presión barométrica decreciente y menor solubilidad de oxígeno gaseoso en agua',
        'Gradiente térmico adiabático húmedo (0.65 °C / 100 m)',
        'Acidez natural y retención de carbono orgánico en suelos Andosoles volcánicos'
      ],
      classroomActivity: 'Trazar con Google Earth un perfil transversal desde Loja hasta el Parque Nacional Podocarpus y predecir la temperatura estimada en cada cota usando la fórmula adiabática.'
    },
    theoreticalFoundation: `El modelamiento de nicho ecológico y la cartografía biogeográfica correlacionan los registros de presencia biológica con gradientes abióticos continuos. En el marco conceptual de Joseph Grinnell y George Evelyn Hutchinson, el nicho fundamental representa el hipervolumen n-dimensional de condiciones ambientales donde una especie puede persistir indefinidamente en ausencia de competidores y predadores. En contraste, el nicho efectivo o realizado refleja el espacio geográfico restringido que la especie ocupa tras la interacción con barreras bióticas, fragmentación antrópica y límites orográficos.

En el Ecuador continental, la cordillera andina actúa simultáneamente como una barrera biogeográfica infranqueable para especies de tierras bajas y como una autopista de especiación vertical mediante radiación adaptativa. La abrupta gradiente altitudinal comprime en menos de 100 kilómetros lineales ecosistemas que van desde el nivel del mar hasta nieves perpetuas a 6.263 msnm. Esto da origen a los valles secos interandinos (como el Chota, Guayllabamba o Girón) y a los páramos de alta montaña, verdaderas islas de hábitat donde taxones como el colibrí Estrella de Garganta Azul (Oreotrochilus cyanolaemus), el tapir de montaña (Tapirus pinchaque) o ranas del género Pristimantis presentan distribuciones hiper-restringidas a una única ladera o microcuenca hidrográfica.`,
    methodologicalPrinciples: [
      {
        title: 'Gradiente Adiabático y Cliserie de Vegetación',
        explanation: 'A medida que el aire asciende por la ladera oriental andina, se expande y enfría a razón de ~0.65 °C por cada 100 metros de altitud (gradiente adiabático húmedo). Este gradiente térmico vertical define pisos zoogeográficos continuos: tropical (0-1.000 m), subtropical (1.000-2.000 m), templado (2.000-3.000 m), altoandino (3.000-4.500 m) y gélido/nival (>4.500 m).',
        scientificCitation: 'Sierra, R. (2013). Sistema de Clasificación de Ecosistemas del Ecuador Continental.'
      },
      {
        title: 'Efecto de Sombra de Lluvia (Rain Shadow)',
        explanation: 'Las masas de aire saturadas de humedad provenientes de la cuenca amazónica descargan copiosas precipitaciones en el flanco oriental (3.000 a 5.000 mm anuales). Al superar la cresta de la cordillera real y descender hacia los valles interandinos, el aire se comprime y calienta en un proceso adiabático seco, reduciendo drásticamente la humedad relativa y creando enclaves xerofíticos y valles secos.',
        scientificCitation: 'Jørgensen, P. M., & León-Yánez, S. (1999). Catalogue of the Vascular Plants of Ecuador.'
      },
      {
        title: 'Geometría Fractal del Paisaje y Efecto de Borde',
        explanation: 'Los remanentes de bosque nublado no son círculos homogéneos; su relación perímetro/área determina la vulnerabilidad ante vientos desecantes, incursión de especies oportunistas y parásitos. El microclima del dosel se degrada hasta 100 metros hacia el interior del fragmento boscoso.',
        scientificCitation: 'Forman, R. T. (1995). Land Mosaics: The Ecology of Landscapes and Regions.'
      }
    ],
    spatialEquations: [
      {
        name: 'Gradiente Térmico Adiabático',
        formula: 'T(z) = T_0 - \\Gamma \\cdot (z - z_0)',
        description: 'Calcula la temperatura esperada a una altitud z partiendo de una temperatura base T0 al nivel de referencia.',
        variables: 'Γ = 0.0065 °C/m (gradiente vertical medio), z = altitud en msnm'
      },
      {
        name: 'Pendiente Topográfica Porcentual',
        formula: 'S(\\%) = \\left(\\frac{\\Delta h}{D_h}\\right) \\times 100',
        description: 'Determina la inclinación del terreno que condiciona la escorrentía, la formación de suelos Andosoles y la dificultad de colonización agrícola.',
        variables: 'Δh = desnivel vertical (m), Dh = distancia horizontal (m)'
      },
      {
        name: 'Índice de Forma del Parche de Hábitat (Shape Index)',
        formula: 'SI = \\frac{P}{2\\sqrt{\\pi \\cdot A}}',
        description: 'Mide la circularidad del polígono de hábitat (SI = 1 para un círculo perfecto; valores mayores indican formas alargadas con mayor efecto de borde).',
        variables: 'P = perímetro métrico, A = área en metros cuadrados'
      }
    ],
    reflectionQuestions: [
      {
        question: '¿Por qué dos especies de colibríes endémicos pueden habitar en laderas opuestas de un mismo nudo andino sin que sus rangos geográficos se solapen?',
        pedagogicalGuidance: 'Analiza el papel de las cuencas de captación de vientos húmedos versus valles de sombra pluviométrica, y cómo el costo metabólico del vuelo a bajas presiones de oxígeno restringe el cruce de collados altos.'
      },
      {
        question: '¿De qué manera un cambio en la temperatura media de +1.5 °C desplazaría altitudinalmente los pisos de páramo en el sur del Ecuador?',
        pedagogicalGuidance: 'Aplica el gradiente de 0.65 °C / 100 m: un calentamiento de 1.5 °C obliga a los ecosistemas a ascender aproximadamente 230 metros verticales, reduciendo la superficie disponible de páramo por efecto de cumbre (efecto ascensor hacia la extinción).'
      },
      {
        question: 'Al modelar un corredor biológico entre dos fragmentos protegidos, ¿por qué es preferible un corredor ancho a través de bosques de galería riparios?',
        pedagogicalGuidance: 'Las riberas fluviales mantienen gradientes de humedad constantes, amortiguan el estrés térmico diurno y proveen frutos y néctar continuos durante todo el año para la fauna dispersora.'
      }
    ],
    commonPitfalls: [
      {
        pitfall: 'Asumir que la elevación de un marcador representa un clima idéntico en laderas opuestas',
        consequence: 'Confundir un bosque nublado hiperhúmedo oriental con un matorral seco interandino a la misma cota de 2.200 msnm.',
        howToAvoid: 'Inspeccionar siempre la orientación de la ladera (aspect) y la fisonomía de la cobertura vegetal satelital visible.'
      },
      {
        pitfall: 'Invertir el orden de las coordenadas en formatos KML / CSV',
        consequence: 'Los puntos de muestreo aparecen proyectados en el Océano Índico o fuera del territorio continental.',
        howToAvoid: 'En software SIG estándar el orden es [Longitud X, Latitud Y] en grados decimales (ambos negativos para Ecuador continental, ej: -78.5, -0.2).'
      },
      {
        pitfall: 'Trazar líneas de transecto siguiendo caminos pavimentados en lugar de la orografía',
        consequence: 'El perfil de elevación refleja taludes artificiales y bermas en lugar del relieve natural.',
        howToAvoid: 'Trazar el transecto perpendicular a las curvas de nivel o divisorias de aguas geomorfológicas.'
      }
    ],
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Exploración del Relieve 3D y Reconocimiento de Pisos Zoogeográficos',
        instruction: 'Inicie Google Earth Web en el navegador. En el menú de visualización, active el relieve tridimensional (3D Buildings / Terrain). Localice la transición morfológica entre el flanco oriental amazónico (cuenca del Pastaza o Napo) y la hoya interandina a través del cañón del río Pastaza. Incline la vista a 45° para observar cómo las paredes escarpadas encauzan los vientos húmedos.',
        conceptualRationale: 'La orografía andina no es una pendiente lisa, sino un laberinto de cañones profundos que actúan como corredores de niebla o cañones de desecación. Comprender la topografía tridimensional es indispensable para no modelar hábitats basándose únicamente en coordenadas planas bidimensionales.',
        expectedVisualResult: 'Una perspectiva oblicua realista que muestra las estribaciones orientales de la cordillera real emergiendo abruptamente sobre la planicie amazónica, con nubes orográficas retenidas en el flanco este.',
        technicalTip: 'Mantenga presionada la tecla Shift y arrastre con el botón izquierdo del ratón hacia adelante/atrás para calibrar el ángulo de inclinación zenital entre 30° y 60°.',
        toolsUsed: ['Google Earth Web 3D', 'Control de Inclinación y Rotación', 'Vista de Relieve']
      },
      {
        stepNumber: 2,
        title: 'Delimitación del Área de Estudio (Cuenca Hídrica de Alta Montaña)',
        instruction: 'Cree un nuevo proyecto KML local titulado "Proyecto_Nicho_Endemicas_ECU". Utilice la herramienta de polígono para delimitar una cuenca alta de estudio comprendida entre los 2.800 y 4.200 msnm (ej. Parque Nacional Podocarpus o Macizo del Cajas). Digitalice los vértices siguiendo las divisorias de aguas (cumbres de cerros y filos de montaña).',
        conceptualRationale: 'Las cuencas hidrográficas son las unidades ecológicas fundamentales de planificación territorial. Los límites naturales de captación hídrica determinan los flujos biológicos y el aislamiento poblacional mucho mejor que los límites político-administrativos artificiales.',
        expectedVisualResult: 'Un polígono cerrado con contorno visible que encierra la zona de páramo y bosque montano alto, sin invadir valles secos o áreas urbanas.',
        technicalTip: 'Nombre la capa con nomenclatura normalizada: `POL_AreaEstudio_CuencaAlta_WGS84`. Ajuste la opacidad del relleno al 30% para no ocultar el relieve satelital.',
        toolsUsed: ['Herramienta Polígono KML', 'Panel de Proyectos', 'Inspector de Estilo y Opacidad']
      },
      {
        stepNumber: 3,
        title: 'Carga e Inspección de Registros de Presencia Biológica',
        instruction: 'Importe las coordenadas de presencia biológica de taxones endémicos (como Podocarpus sprucei, Oreotrochilus cyanolaemus o Tremarctos ornatus) provenientes de bases abiertas como BioWeb o GBIF. Agregue marcadores individuales y verifique en la tabla de atributos que los metadatos contengan fecha, taxón, colector y precisión de georreferenciación (en metros).',
        conceptualRationale: 'Los registros de presencia puntual (Occurrence Data) son la base de los modelos de nicho ecológico (ENM). Registros con imprecisión espacial >1.000 m distorsionan la extracción de variables bioclimáticas en zonas de montaña con pendientes fuertes.',
        expectedVisualResult: 'Un enjambre de marcadores puntuales georreferenciados superpuestos sobre el polígono de estudio, distribuidos a lo largo de laderas específicas.',
        technicalTip: 'Valide que las coordenadas en grados decimales cumplan con el cuadrante suroccidental: Latitud entre +1.4° y -5.0° (negativa en la mayor parte continental), Longitud entre -75.2° y -81.0°.',
        toolsUsed: ['Importación KML/CSV', 'Marcadores Puntuales', 'Metadatos de Presencia']
      },
      {
        stepNumber: 4,
        title: 'Construcción del Transecto Altitudinal y Perfil de Elevación',
        instruction: 'Utilice la herramienta de medición para trazar una polilínea transversal continua de 25 a 35 km que atraviese los puntos de presencia biológica, desde la cota más baja del valle hasta la cresta más alta. Active la opción "Mostrar perfil de elevación". Analice el desnivel vertical total, las cotas donde se concentran los avistamientos y la pendiente media.',
        conceptualRationale: 'El perfil altimétrico permite contrastar el rango hipotético de una especie con su límite térmico real. Si los registros se interrumpen bruscamente a 3.400 msnm, coincide exactamente con la línea de árboles (timberline) y la transición hacia el páramo de pajonal.',
        expectedVisualResult: 'Un gráfico interactivo de perfil altimétrico en la parte inferior de la pantalla donde, al desplazar el cursor, se sincroniza una flecha roja indicando la posición exacta sobre el mapa 3D.',
        technicalTip: 'Examine la ganancia de elevación acumulada y observe si existen mesetas intermedias que funcionen como refugios ecológicos de menor pendiente.',
        toolsUsed: ['Herramienta Medir Ruta', 'Perfil de Elevación Interactivo', 'Cálculo de Desnivel y Pendiente']
      },
      {
        stepNumber: 5,
        title: 'Evaluación Espacial de Barreras Antrópicas y Cuantificación de Fragmentación',
        instruction: 'Haga zoom de alta resolución a escala 1:10.000 a lo largo del transecto. Identifique y digitalice las discontinuidades del dosel arbóreo causadas por vías carrozables, fincas ganaderas, plantaciones de pino exótico o pastizales quemados. Mida el ancho del corredor natural remanente en su punto más estrecho (cuello de botella ecológico).',
        conceptualRationale: 'Las especies de interior de bosque como el oso de anteojos evitan cruzar claros desprovistos de cobertura mayores a 150 metros. Identificar los cuellos de botella permite focalizar las inversiones de restauración ecológica donde el riesgo de desconexión poblacional es inminente.',
        expectedVisualResult: 'Polígonos delimitados en color ámbar o rojo que señalan cicatrices de deforestación y líneas de fragmentación interrumpiendo la matriz boscosa continua.',
        technicalTip: 'Utilice la herramienta de regla en modo superficie para calcular el área exacta de los claros deforestados en hectáreas (1 hectárea = 10.000 m²).',
        toolsUsed: ['Herramienta de Medición de Áreas', 'Digitalización de Fragmentos', 'Detección Visual de Cambios']
      },
      {
        stepNumber: 6,
        title: 'Diseño de Corredores Biológicos y Exportación Cartográfica',
        instruction: 'Diseñe un polígono de propuesta de corredor biológico que reconecte los parches aislados a través de las microcuencas menos perturbadas. Exporte el proyecto consolidado en formato KML/KMZ y genere una composición cartográfica orientada al norte, con escala gráfica, coordenadas en cuadrícula y leyenda técnica.',
        conceptualRationale: 'El producto cartográfico debe cumplir con los estándares de interoperabilidad del OGC y ser directamente utilizable en los Planes de Desarrollo y Ordenamiento Territorial (PDOT) de los municipios o en los Planes de Manejo del SNAP.',
        expectedVisualResult: 'Un archivo `.kmz` estructurado con capas organizadas por jerarquía (Área de Estudio, Especies, Amenazas, Corredor Propuesto) y un reporte gráfico formal.',
        technicalTip: 'Guarde el archivo KMZ con compresión activada para que incluya todos los estilos de simbología y sea legible en cualquier dispositivo sin pérdida de formatos.',
        toolsUsed: ['Exportación KML/KMZ', 'Composición de Impresión', 'Jerarquía de Capas en Proyectos']
      }
    ],
    glossaryTerms: [
      {
        term: 'Nicho Ecológico Fundamental vs. Efectivo',
        definition: 'El nicho fundamental abarca el hipervolumen de condiciones abióticas teóricas donde una especie puede subsistir; el efectivo considera las restricciones bióticas y barreras geográficas reales.',
        practicalApplication: 'En SIG, el nicho se modela mediante capas raster ambientales (WorldClim) superpuestas con algoritmos como MaxEnt.'
      },
      {
        term: 'DEM (Modelo Digital de Elevación)',
        definition: 'Representación rasterizada continua de los valores de altitud de la superficie terrestre con respecto a un elipsoide de referencia.',
        practicalApplication: 'Permite derivar pendientes, orientación de laderas (aspect) y sombreado del relieve (hillshade).'
      },
      {
        term: 'Formato KML / KMZ',
        definition: 'Keyhole Markup Language: estándar OGC basado en XML para expresar anotaciones geográficas y visualización tridimensional en WebGIS.',
        practicalApplication: 'Facilita la transferencia ligera de puntos, líneas y polígonos entre plataformas sin requerir bases de datos espaciales pesadas.'
      },
      {
        term: 'Especie Endémica',
        definition: 'Taxón biológico cuya distribución espacial está restringida exclusivamente a una demarcación geográfica o cuenca determinada.',
        practicalApplication: 'Prioridad máxima de conservación en la cartografía de vacíos de conservación del SNAP.'
      },
      {
        term: 'Transecto Altitudinal',
        definition: 'Línea de muestreo espacial diseñada a través de un gradiente topográfico para registrar variaciones de composición comunitaria.',
        practicalApplication: 'Se digitaliza como elemento vectorial tipo polilínea para extraer perfiles topográficos multiespectrales.'
      },
      {
        term: 'Efecto de Borde (Edge Effect)',
        definition: 'Alteración de las condiciones microclimáticas y biológicas en la interfase entre un fragmento de vegetación natural y un matriz antropizada.',
        practicalApplication: 'Se modela cartográficamente mediante zonas de influencia (Buffer) internas de 50 a 200 metros en bordes boscosos.'
      }
    ],
    expectedProduct: {
      type: 'Informe Cartográfico de Idoneidad de Hábitat (PDF/KMZ)',
      description: 'El estudiante debe entregar un archivo KMZ georreferenciado junto con una memoria técnica de 4 páginas que contenga el mapa temático de distribución, el perfil de elevación transversal y el cálculo del área de hábitat disponible en hectáreas.',
      deliverables: [
        'Archivo KML/KMZ con capas vectoriales estructuradas (Polígonos de hábitat y puntos de avistamiento)',
        'Perfil altimétrico anotado con cotas críticas y ecosistemas atravesados',
        'Cálculo numérico del área total de idoneidad y porcentaje bajo presión antrópica',
        'Propuesta espacial de dos corredores biológicos para mitigar la fragmentación'
      ]
    },
    rubrics: LEARNING_RUBRIC
  },
  {
    id: 'guia-2',
    number: 2,
    title: 'Análisis Temporal (Timelapse) de las Amenazas a la Biodiversidad y Deforestación',
    unitId: 'unidad-2',
    unitTitle: 'Unidad 2: Ecuador, País Megadiverso',
    platform: 'NASA Worldview',
    platformUrl: 'https://worldview.earthdata.nasa.gov/',
    themeColor: 'jungle',
    estimatedTime: '4 Horas pedagógicas',
    didacticAnalogy: {
      analogyTitle: 'La Espectrofotometría de la Selva desde el Espacio',
      analogyStory: 'En el laboratorio de química escolar usas un espectrofotómetro con cubetas para medir qué color de luz absorbe una solución de clorofila. Los satélites de la NASA hacen exactamente lo mismo desde 800 km de altura: la clorofila de las hojas absorbe luz roja para hacer fotosíntesis y refleja intensamente la luz infrarroja. Si la selva es talada o quemada, la luz infrarroja desaparece y los sensores de calor detectan focos térmicos inmediatamente.',
      whyItMatters: 'Permite a los estudiantes conectar la química fotosintética con las imágenes satelitales sin temor a la teledetección espacial.'
    },
    quimicaBiologiaConnection: {
      biologyConcepts: [
        'Pigmentos fotosintéticos (Clorofila a y b, carotenoides)',
        'Efecto de borde y fragmentación del dosel amazónico en Yasuní',
        'Especies paraguas sensibles a carreteras (Panthera onca, Harpia harpyja)'
      ],
      chemistryConcepts: [
        'Ecuación química de combustión de biomasa ($C_xH_yO_z + O_2 \\to CO_2 + H_2O + \\text{calor}$)',
        'Emisión de gases contaminantes ($CO$, $CO_2$, material particulado PM2.5)',
        'Índice de Vegetación de Diferencia Normalizada (NDVI) basado en espectrometría'
      ],
      classroomActivity: 'Ingresar a NASA Worldview y comparar la Amazonía en 2014 versus 2024 usando la herramienta de cortina deslizante (Swipe) para medir el avance del frente de deforestación.'
    },
    theoreticalFoundation: `La teledetección o percepción remota satelital es la disciplina físico-matemática que adquiere información sobre las propiedades biofísicas de la superficie terrestre sin contacto físico directo. Se fundamenta en la interacción entre la radiación electromagnética (solar reflejada o terrestre emitida) y la materia de la superficie. Sensores multiespectrales a bordo de plataformas heliosincrónicas como MODIS (en satélites Terra y Aqua) y VIIRS (en satélites Suomi NPP y NOAA-20) capturan continuamente la Tierra en bandas del espectro visible, infrarrojo cercano (NIR), infrarrojo de onda corta (SWIR) e infrarrojo térmico (TIR).

En el dosel selvático amazónico y los bosques húmedos del Chocó ecuatoriano, la vegetación densa y fotosintéticamente activa absorbe intensamente la radiación en la banda del rojo (0.64 a 0.67 μm) debido a los pigmentos clorofilianos de los cloroplastos, y refleja de forma masiva en la banda del infrarrojo cercano (0.84 a 0.87 μm) por dispersión en la estructura esponjosa del mesófilo foliar. Cuando se produce tala, quema o degradación del suelo, esta firma espectral colapsa abruptamente: la reflectancia en el rojo se incrementa drásticamente al quedar expuesto el suelo desnudo, y la reflectancia en el infrarrojo térmico revela un aumento térmico inmediato.

El análisis multitemporal (Time Series Analysis) es crucial para documentar los frentes de avance de la deforestación inducida por infraestructuras lineales (como las vías petroleras de los bloques 16, 31 e ITT en Orellana y Pastaza, o los monocultivos de palma aceitera en Quinindé y San Lorenzo). En el Ecuador, la apertura de una carretera primaria desencadena el típico "patrón en espina de pescado" (fishbone pattern), donde caminos secundarios perpendiculares colonizan la selva virgen a razón de cientos de hectáreas por año, fragmentando irreversiblemente el territorio ancestral y los corredores del jaguar (Panthera onca) y águila harpía (Harpia harpyja).`,
    methodologicalPrinciples: [
      {
        title: 'Física de la Reflectancia Espectral y Clorofila',
        explanation: 'Las hojas verdes sanas tienen una fuerte absorción en las bandas azul (0.45 μm) y roja (0.65 μm) para la fotosíntesis, y un pico de reflectancia en el infrarrojo cercano (>50% de la energía incidente reflejada). Esta disparidad espectral permite calcular índices normalizados de vegetación (NDVI) con alta sensibilidad a la biomasa.',
        scientificCitation: 'Chuvieco, E. (2020). Teledetección Ambiental: La observación de la Tierra desde el espacio.'
      },
      {
        title: 'Detección Infrarroja de Incendios en 3.9 μm (Ley de Wien)',
        explanation: 'De acuerdo con la ley de desplazamiento de Wien, a medida que la temperatura de un cuerpo emisor aumenta de 300 K (temperatura ambiente terrestre) a 800-1200 K (fuego de combustión de biomasa), el pico de emisión de radiación térmica se desplaza desde las 10 μm hacia el infrarrojo de onda media (3.7 a 4.0 μm). Sensores como VIIRS detectan incendios de tan solo unos pocos metros cuadrados gracias a este canal.',
        scientificCitation: 'Giglio, L., et al. (2016). The Collection 6 MODIS active fire detection algorithm and fire products.'
      },
      {
        title: 'Ventanas Fenológicas y Filtrado de Nubosidad Tropical',
        explanation: 'En regiones ecuatoriales hiperhúmedas, la nubosidad orográfica y convectiva cubre el territorio más del 70% del año. Para evaluar tendencias multianuales fiables, es indispensable contrastar imágenes adquiridas en la misma ventana fenológica seca (ej. meses de agosto y septiembre) para minimizar falsos positivos por estrés hídrico natural o camuflaje por nubes.',
        scientificCitation: 'Asner, G. P. (2001). Cloud cover in landsat observations of the Brazilian Amazon.'
      }
    ],
    spatialEquations: [
      {
        name: 'Índice de Vegetación de Diferencia Normalizada (NDVI)',
        formula: 'NDVI = \\frac{NIR - RED}{NIR + RED}',
        description: 'Varía de -1 a +1. Valores superiores a 0.6 indican bosque primario denso; valores entre 0.1 y 0.3 representan pastizales degradados o suelo desnudo.',
        variables: 'NIR = reflectancia en infrarrojo cercano, RED = reflectancia en rojo visible'
      },
      {
        name: 'Tasa Anual de Deforestación (Ecuación FAO / Puyravaud)',
        formula: 'r = \\left(\\frac{1}{t_2 - t_1}\\right) \\ln\\left(\\frac{A_2}{A_1}\\right) \\times 100',
        description: 'Calcula la tasa porcentual anual de cambio compuesto de cobertura forestal entre dos fechas de observación.',
        variables: 'A1 = área forestal inicial en t1, A2 = área forestal final en t2 (ha)'
      },
      {
        name: 'Potencia Radiativa del Fuego (FRP - Fire Radiative Power)',
        formula: 'FRP = \\frac{\\sigma}{\\tau} \\cdot S_{pixel} \\cdot (T_{fire}^4 - T_{bg}^4)',
        description: 'Mide la energía térmica radiada por un incendio activo en Megawatts (MW), directamente proporcional a la tasa de biomasa consumida.',
        variables: 'σ = constante de Stefan-Boltzmann, Tfire = temperatura del fuego, Tbg = temperatura de fondo'
      }
    ],
    reflectionQuestions: [
      {
        question: '¿Por qué un sensor con resolución espacial gruesa (como MODIS a 250m) es a menudo más útil para alertar incendios que un satélite de alta resolución como Sentinel-2 a 10m?',
        pedagogicalGuidance: 'Considera la compensación entre resolución espacial y resolución temporal: MODIS revisita el Ecuador dos veces por día (Terra por la mañana, Aqua por la tarde), permitiendo detectar incendios en tiempo real antes de que se propaguen, mientras Sentinel-2 tarda 5 días en reobservar la misma escena.'
      },
      {
        question: 'Al observar un frente de deforestación en la Amazonía ecuatoriana, ¿cómo puedes distinguir visualmente una tala para pastos ganaderos de una piscina de lodos de perforación petrolera?',
        pedagogicalGuidance: 'Los pastizales presentan geometrías rectangulares extensas con bordes limpios y tonalidad verdosa clara o amarillenta; las plataformas petroleras y piscinas son áreas cuadradas compactas con carreteras de acceso rectas y presencia de anomalías térmicas continuas (mecheros de gas).'
      },
      {
        question: '¿Qué implicaciones ecológicas tiene la penetración de una carretera en la cuenca del Yasuní para las especies de mamíferos que no son cazadas directamente?',
        pedagogicalGuidance: 'La vía genera contaminación acústica por tráfico pesado, efecto barrera que disuade a primates arborícolas de cruzar el suelo, desecación del microclima por insolación directa y facilita la entrada no regulada de especies invasoras y enfermedades.'
      }
    ],
    commonPitfalls: [
      {
        pitfall: 'Comparar una imagen de época lluviosa (abril) con una de época seca (agosto)',
        consequence: 'Confundir la senescencia estacional o variaciones en el caudal de ríos con pérdida antrópica de vegetación.',
        howToAvoid: 'Emparejar siempre fechas correspondientes al mismo mes calendario en la serie temporal interanual.'
      },
      {
        pitfall: 'Asumir que un píxel con anomalía térmica es siempre un incendio forestal descontrolado',
        consequence: 'Reportar mecheros de gas natural en estaciones de bombeo o techos metálicos sobrecalentados como quemas ilegales.',
        howToAvoid: 'Verificar la persistencia temporal del punto caliente: si la anomalía aparece en el mismo píxel los 365 días del año, se trata de una fuente industrial permanente.'
      },
      {
        pitfall: 'Ignorar el ángulo zenital de adquisición y la presencia de nubes finas (cirros)',
        consequence: 'Subestimar la densidad del dosel arbóreo por atenuación atmosférica no corregida.',
        howToAvoid: 'Activar siempre el canal True Color de alta reflectancia corregida atmosféricamente y revisar el producto Cloud Mask.'
      }
    ],
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Acceso a NASA Worldview y Configuración Espectral Inicial',
        instruction: 'Ingrese al portal de NASA Worldview. Despliegue el panel izquierdo "Add Layers". Active en la sección Base Layers el producto "Corrected Reflectance (True Color)" de los sensores MODIS Terra y VIIRS (Suomi NPP). Desactive las etiquetas toponímicas innecesarias para tener una visualización nítida y pura de la superficie.',
        conceptualRationale: 'El producto True Color combina las bandas espectrales roja, verde y azul con corrección de scattering atmosférico de Rayleigh. Permite al ojo humano interpretar de manera intuitiva los contrastes entre selva densa (verde oscuro), sedimentos aluviales en ríos (ocre) y áreas deforestadas (tonos crema o rosados).',
        expectedVisualResult: 'Un lienzo global continuo y fluido donde el territorio ecuatoriano se visualiza en colores naturales de alta nitidez sin interferencias cartográficas artificiales.',
        technicalTip: 'Utilice la barra de búsqueda de capas y escriba "Corrected Reflectance" para localizar rápidamente los productos de 250m de MODIS y 375m de VIIRS.',
        toolsUsed: ['NASA Worldview Catalog', 'Layer Manager', 'Selector de Bandas Espectrales']
      },
      {
        stepNumber: 2,
        title: 'Geolocalización del Frente Crítico de Deforestación',
        instruction: 'Navegue hacia la provincia de Orellana en el nororiente amazónico (eje de la vía Auca o frontera del Parque Nacional Yasuní) o hacia la provincia de Esmeraldas (cantón San Lorenzo / Quinindé). Ajuste el zoom a escala regional (aprox. 5 km por división de escala). Fije las coordenadas geográficas centrales para mantener la misma ventana espacial.',
        conceptualRationale: 'Fijar el marco de observación espacial es un principio metodológico de la percepción remota multitemporal. Si la ventana de visualización se desplaza accidentalmente entre fechas, la comparación espacial pierde validez estadística.',
        expectedVisualResult: 'Una vista detallada donde se aprecia con claridad la interfase entre la masa selvática continua del parque y los frentes de avance agropecuario o vial.',
        technicalTip: 'Anote las coordenadas exactas que aparecen en la barra inferior (Latitud y Longitud en grados decimales) para re-centrar la vista en caso de desvío accidental.',
        toolsUsed: ['Buscador de Topónimos', 'Navegación Pan & Zoom', 'Coordenadas de Ventana']
      },
      {
        stepNumber: 3,
        title: 'Activación de la Capa de Anomalías Térmicas e Incendios Activos',
        instruction: 'En el menú "Add Layers", seleccione la categoría "Fires and Thermal Anomalies". Active simultáneamente los productos de MODIS (Terra/Aqua) y VIIRS (375m I-Band, Day/Night). Ajuste la simbología para que los píxeles calientes se representen con puntos rojos de alta visibilidad con marcas de confianza (>80%).',
        conceptualRationale: 'Las anomalías térmicas son el indicador más temprano de cambio de uso del suelo en el trópico. La tala casi siempre es precedida o seguida por la quema sistemática de biomasa para habilitar pastizales, liberando toneladas de dióxido de carbono a la atmósfera.',
        expectedVisualResult: 'Agrupaciones de puntos rojos brillantes alineados a lo largo de los bordes del bosque y de los caminos de penetración, revelando quemas activas.',
        technicalTip: 'Filtre las anomalías diurnas versus nocturnas: los fuegos provocados por agricultura suelen concentrarse entre las 11:00 y las 15:00 horas locales debido a la menor humedad relativa del aire.',
        toolsUsed: ['Thermal Anomalies Layer', 'Filtro de Detección de Focos de Calor', 'Control de Simbología']
      },
      {
        stepNumber: 4,
        title: 'Construcción de la Serie Temporal Interanual y Comparación con Cortina (Swipe)',
        instruction: 'Despliegue la barra de tiempo en el margen inferior de la pantalla. Seleccione una fecha base histórica de hace 10 años (ej. agosto de 2014) y una fecha actual (agosto de 2024), verificando que ambas tengan <15% de cobertura nubosa. Active la herramienta de comparación de cortina ("Start Comparison / Swipe Tool").',
        conceptualRationale: 'La herramienta Swipe divide la pantalla en dos mitades interactivas mediante una barra vertical deslizable. Permite al ojo humano detectar cambios sutiles de borde que pasarían desapercibidos al alternar ventanas estáticas separadas.',
        expectedVisualResult: 'Una pantalla dividida donde, al arrastrar el divisor hacia la derecha, se observa la selva virgen del 2014 ser reemplazada en tiempo real por carreteras y claros en la imagen del 2024.',
        technicalTip: 'Arrastre lentamente el control deslizante de izquierda a derecha prestando atención a los ríos tributarios: su coloración suele tornarse más marrón por el arrastre de sedimentos producto de la deforestación.',
        toolsUsed: ['Línea de Tiempo Interanual', 'Herramienta Cortina de Comparación (Swipe)', 'Filtro de Nubosidad']
      },
      {
        stepNumber: 5,
        title: 'Tipificación Geométrica de los Patrones de Degradación',
        instruction: 'Examine la morfología espacial del avance del desmonte: clasifique las intervenciones en tres patrones: (1) Deforestación en espina de pescado a lo largo de ejes viales; (2) Clareos geométricos para monocultivos de gran escala; y (3) Deforestación difusa en orillas de ríos navegables. Mida la distancia lineal en kilómetros desde el camino hacia el interior del bosque.',
        conceptualRationale: 'La geometría de la deforestación delata el agente causante: las vías planificadas generan espinas de pescado; la minería genera lagunas de sedimentos a lo largo de cauces aluviales; y la colonización espontánea genera parches amorfos dispersos.',
        expectedVisualResult: 'Mediciones métricas explícitas sobre la pantalla que demuestran que la perturbación penetra entre 2 y 5 km a ambos lados de la vía principal.',
        technicalTip: 'Utilice la herramienta de medición métrica de NASA Worldview para cuantificar la longitud de los ramales secundarios y documentar la tasa de avance en km/año.',
        toolsUsed: ['Herramienta Regla Métrica en km', 'Clasificación Visual de Patrones', 'Inspector de Formas Espaciales']
      },
      {
        stepNumber: 6,
        title: 'Generación de Video Animado GIF y Emisión del Boletín de Alerta',
        instruction: 'Haga clic en el icono de cámara de video para iniciar la herramienta de animación nativa. Configure un fotograma por cada año de la última década en el mes de agosto. Ajuste la velocidad de reproducción a 1 cuadro por segundo (1 fps). Exporte el bucle GIF georreferenciado y capture dos mapas comparativos estáticos con fecha y escala.',
        conceptualRationale: 'Las animaciones multitemporales son herramientas pedagógicas y legales de enorme impacto: sintetizan una década de degradación silenciosa en un video de 10 segundos innegable ante tribunales ambientales o foros comunitarios.',
        expectedVisualResult: 'Un archivo `.gif` animado y fluido que muestra la pérdida progresiva del dosel arbóreo año a año, con las anomalías térmicas pulsando como evidencia de los incendios.',
        technicalTip: 'Asegúrese de activar la marca de agua con fecha y hora UTC en la animación para que el documento posea valor probatorio formal según las directrices del MAATE.',
        toolsUsed: ['Animador GIF Integrado', 'Exportador PNG/GeoTIFF', 'Boletín de Alerta Temprana']
      }
    ],
    glossaryTerms: [
      {
        term: 'Teledetección (Percepción Remota)',
        definition: 'Técnica de medición y adquisición de datos de objetos terrestres mediante radiación electromagnética captada por sensores satelitales o aerotransportados.',
        practicalApplication: 'Monitoreo sinóptico de grandes extensiones selváticas inaccesibles por tierra.'
      },
      {
        term: 'Firma Espectral',
        definition: 'Patrón único de reflectancia y absorción de energía electromagnética que exhibe cada cobertura del suelo en diferentes longitudes de onda.',
        practicalApplication: 'La vegetación sana absorbe fuertemente la luz roja para fotosíntesis y refleja masivamente el infrarrojo cercano (NIR).'
      },
      {
        term: 'Resolución Temporal',
        definition: 'Frecuencia con la que un satélite reobserva exactamente el mismo punto geográfico de la superficie terrestre.',
        practicalApplication: 'MODIS posee resolución diaria (útil para incendios), mientras que Landsat tiene 16 días y Sentinel-2 tiene 5 días.'
      },
      {
        term: 'Anomalía Térmica',
        definition: 'Píxel satelital cuya temperatura de brillo en el infrarrojo térmico supera significativamente el fondo circundante normal.',
        practicalApplication: 'Identifica quemas agrícolas, incendios forestales en páramos o mecheros petroleros en la selva.'
      },
      {
        term: 'Patrón en Espina de Pescado',
        definition: 'Morfología espacial geométrica de deforestación donde caminos secundarios perpendiculares a una vía troncal penetran el bosque primario.',
        practicalApplication: 'Indicador directo de fragmentación antrópica inducida por apertura no controlada de infraestructura vial.'
      },
      {
        term: 'Resolución Espacial',
        definition: 'Dimensión lineal mínima que representa un píxel sobre el terreno (Ground Sampling Distance - GSD).',
        practicalApplication: 'MODIS tiene píxeles de 250m a 1km; Sentinel-2 alcanza 10m y WorldView comercial llega a 30cm.'
      }
    ],
    expectedProduct: {
      type: 'Boletín de Alerta Temprana de Pérdida de Cobertura (PDF/GIF)',
      description: 'Dossier analítico que sintetiza 10 años de monitoreo satelital en un frente de degradación ecuatoriano, demostrando la correlación entre vías de penetración e incendios activos.',
      deliverables: [
        'Animación GIF multitemporal optimizada de la zona crítica seleccionada',
        'Dos mapas comparativos estáticos georreferenciados (Año Base vs. Año Actual)',
        'Cuantificación espacial aproximada del frente de avance en kilómetros lineales',
        'Informe técnico con recomendaciones de fiscalización para el MAATE y fiscalías ambientales'
      ]
    },
    rubrics: LEARNING_RUBRIC
  },
  {
    id: 'guia-3',
    number: 3,
    title: 'Análisis Cartográfico de los Límites y Cobertura del SNAP',
    unitId: 'unidad-3',
    unitTitle: 'Unidad 3: Conservación de la Biodiversidad en el Ecuador',
    platform: 'Visor Geográfico MAATE',
    platformUrl: 'http://ide.ambiente.gob.ec/mapainteractivo/',
    themeColor: 'ocean',
    estimatedTime: '4 Horas pedagógicas',
    didacticAnalogy: {
      analogyTitle: 'La Colección de Muestras Histológicas del Territorio',
      analogyStory: 'En biología clasificas preparados microscópicos por tipos de tejido para saber qué función cumple cada órgano. El Ministerio del Ambiente (MAATE) hace lo mismo con el Ecuador: clasificó oficialmente 91 tipos de ecosistemas. Si solo declaras parques en los páramos altos y no proteges los bosques secos de la Costa, es como si en el cuerpo cuidaras el cerebro pero descuidaras los pulmones. El visor del MAATE te permite ver en qué provincias faltan áreas protegidas.',
      whyItMatters: 'Enseña el concepto de representatividad biológica y vacíos de conservación de forma clara para el aula de secundaria.'
    },
    quimicaBiologiaConnection: {
      biologyConcepts: [
        'Los 91 Ecosistemas del Ecuador Continental (MAATE / Sierra, 2013)',
        'Representatividad ecosistémica y sesgo altitudinal hacia páramos',
        'Vacíos de conservación (Gap Analysis) en bosques secos de la Costa'
      ],
      chemistryConcepts: [
        'Ciclo del carbono y secuestro edáfico en horizontes orgánicos de páramos',
        'Química del suelo (humus coloidal, capacidad de intercambio catiónico)',
        'Papel del páramo y bosque nublado como filtro físico-químico natural del agua potable'
      ],
      classroomActivity: 'Ingresar al visor oficial del MAATE, consultar las áreas protegidas de su propia provincia y comparar cuántas hectáreas pertenecen a páramo versus bosque seco o manglar.'
    },
    theoreticalFoundation: `La Infraestructura de Datos Espaciales (IDE) del Ministerio del Ambiente, Agua y Transición Ecológica del Ecuador constituye la plataforma tecnológica institucional encargada de publicar, armonizar y distribuir la información geográfica oficial del país. Se rige por los estándares internacionales de interoperabilidad del Open Geospatial Consortium (OGC) y de la norma ISO 19115 de metadatos geográficos. A través de geoservicios Web Map Service (WMS) y Web Feature Service (WFS), el Estado ecuatoriano pone a disposición de investigadores y tomadores de decisiones la cartografía oficial del Sistema Nacional de Áreas Protegidas (SNAP).

El análisis cartográfico de cobertura territorial no consiste únicamente en contabilizar hectáreas brutas protegidas, sino en evaluar la representatividad ecosistémica y la complementariedad de la red. Históricamente, las áreas protegidas del Ecuador continental se establecieron en zonas remotas de difícil acceso o con pendientes abruptas no aptas para la agricultura tradicional: páramos de alta montaña de la cordillera andina (como Sangay, Cotopaxi, Cayambe-Coca) o grandes extensiones selváticas amazónicas (como Yasuní y Cuyabeno). Esto generó lo que en biología de la conservación se conoce como "sesgo altitudinal de conservación" (elevation bias).

En contraste, los ecosistemas de tierras bajas costeras —particularmente el bosque seco tropical tumbesino del suroccidente (Guayas, Manabí, Loja) y el bosque húmedo tropical del Chocó biogeográfico en Esmeraldas— han sufrido tasas de conversión agropecuaria superiores al 90%, y albergan una fracción mínima de su superficie original dentro de las categorías estrictas del SNAP estatal. La metodología de Gap Analysis (Análisis de Vacíos de Conservación) superpone las capas vectoriales de distribución de los 91 ecosistemas oficiales con la red de parques para identificar con rigor matemático qué ecosistemas críticos están sub-representados y requieren con urgencia nuevas declaratorias bajo los subsistemas Comunitario, Municipal (GAD) o Privado reconocidos en el Código Orgánico del Ambiente.`,
    methodologicalPrinciples: [
      {
        title: 'Arquitectura de Servicios OGC: WMS vs. WFS',
        explanation: 'Un servicio WMS (Web Map Service) procesa la cartografía en el servidor y envía al cliente imágenes raster pre-renderizadas (PNG/JPEG) de visualización rápida pero con geometría estática. Por el contrario, un servicio WFS (Web Feature Service) transfiere geometrías vectoriales editables (GML/GeoJSON) y tablas de atributos completas, permitiendo consultas SQL espaciales y cálculos de área en el navegador.',
        scientificCitation: 'Open Geospatial Consortium (OGC). (2010). Web Feature Service 2.0 Interface Standard.'
      },
      {
        title: 'Teoría de Representatividad Ecosistémica (Metas Kunming-Montreal)',
        explanation: 'La Meta 3 del Marco Mundial de Biodiversidad de Kunming-Montreal (30x30) estipula conservar al menos el 30% de las zonas terrestres y aguas continentales para 2030, priorizando áreas de particular importancia para la biodiversidad y servicios ecosistémicos, ecológicamente representativas y bien conectadas.',
        scientificCitation: 'CBD. (2022). Kunming-Montreal Global Biodiversity Framework (Decision 15/4).'
      },
      {
        title: 'Topología Espacial y Traslapes Jurisdiccionales',
        explanation: 'En SIG, la integridad topográfica exige que los polígonos no compartan huecos (gaps) ni solapamientos espaciales (overlaps) artificiales. Cuando un Parque Nacional abarca múltiples cantones y provincias, la gestión del uso del suelo colindante exige coordinar competencias entre el MAATE (rector de vida silvestre) y los GAD (rectores de catastro y uso del suelo urbano/rural).',
        scientificCitation: 'Burrough, P. A., & McDonnell, R. A. (2015). Principles of Geographical Information Systems.'
      }
    ],
    spatialEquations: [
      {
        name: 'Índice de Representatividad Ecosistémica (RE)',
        formula: 'RE_i(\\%) = \\left(\\frac{A_{SNAP} \\cap E_i}{A_{Total}(E_i)}\\right) \\times 100',
        description: 'Mide la proporción de la superficie total del ecosistema i que se encuentra resguardada formalmente dentro de los límites del SNAP.',
        variables: 'A_SNAP ∩ Ei = hectáreas del ecosistema i dentro del SNAP, A_Total(Ei) = hectáreas totales del ecosistema i en el país'
      },
      {
        name: 'Fórmula de Intersección Vectorial Booleana',
        formula: 'C = A \\cap B = \\{x \\mid x \\in A \\land x \\in B\\}',
        description: 'Genera un nuevo polígono espacial donde coinciden espacialmente dos coberturas, fusionando sus tablas de atributos alfanuméricas.',
        variables: 'A = polígonos del SNAP, B = división cantonal o mapa de ecosistemas'
      },
      {
        name: 'Índice de Vulnerabilidad por Aislamiento (Proximity Index)',
        formula: 'PX = \\sum_{j=1}^{n} \\frac{A_j}{d_{ij}^2}',
        description: 'Evalúa el grado de cercanía y conectividad funcional entre un parche de vegetación remanente y los parques protegidos más cercanos.',
        variables: 'Aj = área del parche vecino j, dij = distancia métrica euclidiana entre parches'
      }
    ],
    reflectionQuestions: [
      {
        question: '¿Por qué un país puede superar formalmente el 20% de su territorio nacional continental bajo áreas protegidas y, al mismo tiempo, tener especies emblemáticas al borde de la extinción?',
        pedagogicalGuidance: 'Analiza la disparidad entre superficie cuantitativa y representatividad cualitativa: si el 80% de ese 20% corresponde a páramos altos o bosques remotos de la Amazonía profunda, los bosques secos costeros y los bosques nublados fragmentados pueden quedar casi desprotegidos.'
      },
      {
        question: '¿Qué diferencias jurídicas y de gobernanza existen entre declarar un área como Parque Nacional (subsistema estatal) versus Área Protegida Comunitaria bajo el COA?',
        pedagogicalGuidance: 'En el subsistema estatal, la propiedad de la tierra y la administración corresponden exclusivamente al Estado central mediante el MAATE; en el subsistema comunitario, la propiedad colectiva se mantiene en manos de la comuna o nacionalidad indígena, y el plan de manejo se co-gestiona respetando el derecho consuetudinario.'
      },
      {
        question: 'Al interactuar con servicios WMS de una IDE, ¿por qué no es posible calcular de forma fiable el área en hectáreas de un polígono haciendo clic sobre la pantalla?',
        pedagogicalGuidance: 'Los servicios WMS entregan mapas renderizados como imágenes (archivos raster PNG con píxeles de color); carecen de la geometría vectorial matemática y de la tabla de atributos asociada, los cuales solo se transfieren mediante servicios WFS o descargas GeoJSON/Shapefile.'
      }
    ],
    commonPitfalls: [
      {
        pitfall: 'Calcular superficies en hectáreas utilizando coordenadas geográficas en grados decimales (EPSG:4326)',
        consequence: 'Obtener valores de área expresados en "grados cuadrados", los cuales carecen de significado físico y varían según la latitud.',
        howToAvoid: 'Re-proyectar siempre la capa vectorial a una proyección cartográfica métrica conforme como WGS84 UTM Zona 17 Sur (EPSG:32717) antes de ejecutar el cálculo geométrico.'
      },
      {
        pitfall: 'Asumir que las áreas protegidas son islas estáticas sin interacción con la matriz circundante',
        consequence: 'Diseñar planes de conservación que ignoran las concesiones mineras, presas hidroeléctricas o carreteras en el perímetro exterior.',
        howToAvoid: 'Superponer siempre capas de infraestructura humana y concesiones extractivas en un radio mínimo de 10 km alrededor de la reserva.'
      },
      {
        pitfall: 'Confundir un bosque protector con un Parque Nacional del SNAP',
        consequence: 'Aplicar normas de intangibilidad absoluta en zonas donde la ley permite aprovechamiento forestal maderero sostenible con plan de manejo.',
        howToAvoid: 'Verificar el campo "subsistema" y "categoría_manejo" en la tabla oficial de atributos del MAATE.'
      }
    ],
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Exploración del Catálogo de Metadatos y Conexión a la IDE MAATE',
        instruction: 'Ingrese al geoportal de la Infraestructura de Datos Espaciales del MAATE (o servicio interoperable nacional IEDG). En la sección de Catálogo de Metadatos, busque la capa temática oficial "Sistema Nacional de Áreas Protegidas del Ecuador Continental (SNAP)". Verifique el linaje de los datos, la fecha de última actualización del metadato y la resolución cartográfica nominal (1:50.000).',
        conceptualRationale: 'El metadato es la cédula de identidad de la información geográfica. Utilizar capas sin revisar metadatos expone a cometer errores graves, como trabajar con polígonos derogados o límites imprecisos que no coinciden con los decretos de creación publicados en el Registro Oficial.',
        expectedVisualResult: 'Ficha técnica formal en pantalla donde se visualiza el resumen del conjunto de datos, la entidad responsable (Subsecretaría de Patrimonio Natural), el marco geodésico SIRGAS-Ecuador y los enlaces WMS/WFS.',
        technicalTip: 'Copie la URL del servicio WMS oficial del visor y guárdela en sus notas de campo para documentar la procedencia de la fuente según normas APA.',
        toolsUsed: ['Catálogo Geonetwork / IDE', 'Visor Web WMS', 'Inspector de Metadatos ISO 19115']
      },
      {
        stepNumber: 2,
        title: 'Carga e Interrogación de Atributos Vectoriales del SNAP',
        instruction: 'Despliegue la capa vectorial del SNAP sobre el mapa base topográfico nacional. Utilice la herramienta de información puntual ("Identify") y haga clic sobre tres áreas protegidas pertenecientes a categorías de manejo distintas: un Parque Nacional (ej. Yasuní), una Reserva Ecológica (ej. Manglares Churute) y un Refugio de Vida Silvestre (ej. Pasochoa). Inspeccione su tabla de atributos.',
        conceptualRationale: 'Cada categoría de manejo en el SNAP tiene un régimen jurídico diferenciado: los Parques Nacionales priorizan la investigación y preservación estricta; las Reservas Ecológicas protegen muestras biofísicas frágiles; y los Refugios de Vida Silvestre conservan hábitats críticos para especies amenazadas de flora y fauna.',
        expectedVisualResult: 'Una ventana emergente que despliega los campos alfanuméricos oficiales: nombre del área protegida, base legal (Acuerdo Ministerial), fecha de creación, superficie en hectáreas y código SNAP.',
        technicalTip: 'Preste especial atención al campo `subsistema`: constate si pertenece al subsistema estatal (PANE), autónomo descentralizado (GAD), comunitario o privado.',
        toolsUsed: ['Herramienta Identificar Atributos', 'Visor de Tablas de Geodatos', 'Filtro por Categoría de Manejo']
      },
      {
        stepNumber: 3,
        title: 'Superposición con la División Político-Administrativa Provincial y Cantonal',
        instruction: 'Active simultáneamente la capa vectorial de límites cantonales y provinciales provista por el Comité Nacional de Límites Internos (CONALI) y el Instituto Geográfico Militar (IGM). Ajuste la transparencia de la capa del SNAP al 60%. Identifique qué áreas protegidas trascienden las fronteras provinciales y cuáles están contenidas en un solo cantón.',
        conceptualRationale: 'Las áreas protegidas no reconocen límites cantonales o provinciales artificiales. Cuando un parque abarca cuatro provincias (como el Parque Nacional Sangay), el plan de manejo exige articular mesas de trabajo intergubernamentales entre múltiples prefecturas y alcaldías con agendas políticas divergentes.',
        expectedVisualResult: 'Líneas limítrofes provinciales en trazo discontinuo atravesando el polígono verde del parque, evidenciando los solapamientos jurisdiccionales.',
        technicalTip: 'Utilice el selector de opacidad de la capa superior para calibrar el contraste visual y facilitar la identificación de los nombres de los cantones involucrados.',
        toolsUsed: ['Gestor de Capas Multitemáticas', 'Control de Transparencia/Opacidad', 'División Cantonal CONALI/IGM']
      },
      {
        stepNumber: 4,
        title: 'Análisis de Representatividad Ecosistémica Continental',
        instruction: 'Superponga la capa de los 91 Ecosistemas del Ecuador Continental. Realice un barrido visual en la región Costa (bosques secos del Guayas y Manabí) versus la cordillera Sierra (páramos de Cotopaxi y Cayambe). Calcule o estime visualmente qué porcentaje de la superficie total de bosque seco queda amparada bajo polígonos del SNAP frente a la superficie protegida de páramo.',
        conceptualRationale: 'Este paso demuestra empíricamente el sesgo histórico de conservación. Mientras que los páramos altoandinos superan el 40% de cobertura bajo categorías de protección, los bosques secos tropicales costeros no alcanzan el 5% de protección efectiva, haciéndolos críticamente vulnerables al cambio climático.',
        expectedVisualResult: 'Un mapa bitemático contrastado donde los polígonos verdes de protección cubren masivamente las cumbres andinas, mientras que la planicie costera aparece fragmentada en parches diminutos desprovistos de polígonos de reserva.',
        technicalTip: 'Filtre la leyenda de ecosistemas por macro-biomas: "Páramo", "Bosque Húmedo Tropical", "Bosque Seco" y "Manglar" para simplificar la lectura cognitiva.',
        toolsUsed: ['Capa de 91 Ecosistemas Continentales', 'Filtro Temático por Macro-Bioma', 'Medición de Representatividad']
      },
      {
        stepNumber: 5,
        title: 'Detección de Vacíos Críticos de Conservación (Gap Analysis Preliminar)',
        instruction: 'Localice al menos dos fragmentos relictos de vegetación nativa en buen estado de conservación que se encuentren fuera del polígono del SNAP pero a menos de 10 kilómetros de distancia de un parque existente. Evalúe si estos remanentes actúan como "trampolines ecológicos" (stepping stones) para la avifauna o mamíferos terrestres.',
        conceptualRationale: 'El Gap Analysis es la base técnica para priorizar recursos de conservación. Identificar remanentes estratégicos permite al Estado proponer la ampliación de reservas existentes o motivar a comunidades campesinas e indígenas a declararlas como áreas protegidas comunitarias con incentivos de Socio Bosque.',
        expectedVisualResult: 'Dos polígonos señalados en color naranja en zonas desprovistas de protección formal, con rutas hipotéticas de conectividad ecológica hacia los parques más próximos.',
        technicalTip: 'Utilice la herramienta de buffer o regla métrica para verificar que la distancia entre el remanente y el parque no exceda la capacidad de dispersión de especies sombrilla (ej. 10 km).',
        toolsUsed: ['Herramienta de Medición de Distancias', 'Análisis de Vacíos de Conservación', 'Detección de Trampolines Ecológicos']
      },
      {
        stepNumber: 6,
        title: 'Descarga de Geodatos Vectoriales y Estructuración de la Matriz Diagnóstica',
        instruction: 'Utilice el botón de exportación de la plataforma para descargar la geometría vectorial de su área seleccionada en formato GeoJSON o Shapefile (o copie la consulta URL del servicio WFS). Elabore la matriz diagnóstica final completando hectáreas oficiales, representatividad ecosistémica, cantones involucrados y propuesta de mitigación de vacíos.',
        conceptualRationale: 'La autonomía en el manejo de datos geoespaciales radica en saber extraer y migrar capas vectoriales desde visores institucionales hacia herramientas analíticas locales o reportes técnicos ejecutivos conformes con el Código Orgánico del Ambiente.',
        expectedVisualResult: 'Un archivo vectorial estructurado descargado en el equipo y una matriz tabular organizada con métricas numéricas verificables y referencias de acuerdos ministeriales.',
        technicalTip: 'Abra el archivo GeoJSON en un visor de texto para verificar que los atributos alfanuméricos contengan la codificación de caracteres UTF-8 correcta (sin caracteres extraños en tildes o eñes).',
        toolsUsed: ['Exportación WFS/GeoJSON', 'Matriz de Metadatos', 'Verificación de Integridad UTF-8']
      }
    ],
    glossaryTerms: [
      {
        term: 'WMS (Web Map Service)',
        definition: 'Estándar del Open Geospatial Consortium (OGC) para servir mapas digitales renderizados como imágenes (PNG o JPEG) a través de Internet.',
        practicalApplication: 'Permite visualizar capas oficiales pesadas en navegadores ligeros sin consumir memoria local.'
      },
      {
        term: 'WFS (Web Feature Service)',
        definition: 'Estándar OGC que permite consultar, filtrar y recuperar directamente geometrías vectoriales y atributos tabulares en formato GML o GeoJSON.',
        practicalApplication: 'Se usa cuando se requiere realizar análisis espacial computacional o cálculos de área precisos.'
      },
      {
        term: 'IDE (Infraestructura de Datos Espaciales)',
        definition: 'Conjunto coordinado de políticas, estándares, tecnologías y acuerdos institucionales para compartir información geográfica.',
        practicalApplication: 'La IEDG del Ecuador y la IDE-MAATE previenen la duplicidad en el levantamiento de información territorial.'
      },
      {
        term: 'Representatividad Ecosistémica',
        definition: 'Grado en que una red de áreas protegidas incluye muestras viables de toda la variedad de comunidades ecológicas de un país.',
        practicalApplication: 'Guía la prioridad de financiamiento para nuevas áreas protegidas en ecosistemas subrepresentados.'
      },
      {
        term: 'Análisis de Vacíos (Gap Analysis)',
        definition: 'Metodología espacial que superpone la distribución de especies y ecosistemas prioritarios con los límites de las reservas existentes para identificar omisiones.',
        practicalApplication: 'Fundamento técnico para proponer la creación de nuevos parques o reservas privadas.'
      },
      {
        term: 'SIRGAS-Ecuador',
        definition: 'Sistema de Referencia Geocéntrico para las Américas, marco geodésico oficial del Ecuador materializado con estaciones GNSS continuas.',
        practicalApplication: 'Garantiza que las coordenadas levantadas en campo coincidan con la cartografía nacional sin desplazamientos métricos.'
      }
    ],
    expectedProduct: {
      type: 'Matriz Diagnóstica y Mapa de Cobertura SNAP (PDF/Shapefile)',
      description: 'Informe técnico de auditoría espacial sobre la representatividad ecológica del SNAP en una región biogeográfica ecuatoriana, con cartografía temática y análisis de vacíos.',
      deliverables: [
        'Mapa temático formal con simbología oficial por categoría de manejo del SNAP',
        'Tabla analítica con hectáreas, representatividad ecosistémica y traslapes político-administrativos',
        'Identificación geográfica de al menos dos vacíos críticos de conservación (Gaps)',
        'Ficha técnica con enlace validado al servicio WMS/WFS institucional'
      ]
    },
    rubrics: LEARNING_RUBRIC
  },
  {
    id: 'guia-4',
    number: 4,
    title: 'Análisis de Superposición Espacial: Conflictos Territoriales y Zonas de Amortiguamiento Comunitarias',
    unitId: 'unidad-3',
    unitTitle: 'Unidad 3: Conservación de la Biodiversidad en el Ecuador',
    platform: 'OpenStreetMap',
    platformUrl: 'https://www.openstreetmap.org/',
    themeColor: 'ocean',
    estimatedTime: '4.5 Horas pedagógicas',
    didacticAnalogy: {
      analogyTitle: 'El Perímetro de Bioseguridad en el Laboratorio Químico',
      analogyStory: 'Cuando manipulas un reactivo peligroso o corrosivo en el laboratorio de química, estableces una distancia de seguridad con campana extractora para proteger a los alumnos. En la conservación de la naturaleza, el "Buffer" o zona de amortiguamiento es exactamente ese círculo concéntrico de 2 km o 5 km alrededor de la reserva: el núcleo central es intocable (reserva de fauna y flora), pero en el anillo exterior se permite agricultura limpia, turismo científico y apicultura comunitaria.',
      whyItMatters: 'Ayuda a comprender la convivencia entre comunidades campesinas e indígenas y áreas protegidas del SNAP.'
    },
    quimicaBiologiaConnection: {
      biologyConcepts: [
        'Zonificación de Reservas de Biosfera UNESCO (Núcleo, Amortiguamiento, Transición)',
        'Corredores biológicos para dispersión de fauna mayor (Cóndor andino, Puma, Venado)',
        'Efecto amortiguador de la vegetación nativa contra pesticidas y especies invasoras'
      ],
      chemistryConcepts: [
        'Dispersión atmosférica de gases volcánicos ($SO_2$, $CO_2$, ácido sulfhídrico $H_2S$) en Cotopaxi',
        'Formación de lluvia ácida ($SO_2 + H_2O \\to H_2SO_3$) y su efecto en el pH de aguas de páramo',
        'Gradiente de salinidad (haloclina) y oxígeno disuelto en estuarios de manglar (Churute)'
      ],
      classroomActivity: 'Usar el modelo 3D y la herramienta de radios concéntricos para calcular el área en hectáreas de la zona núcleo de 2 km y el buffer ampliado de 5 km alrededor del volcán Cotopaxi o manglar.'
    },
    theoreticalFoundation: `El análisis de superposición espacial (Overlay Analysis) mediante operadores geométricos y álgebra booleana (Intersección, Unión, Diferencia y Zonas de Influencia o Buffer) es la técnica por excelencia de los Sistemas de Información Geográfica para desenmarañar tensiones socioambientales complejas. En el territorio ecuatoriano, la superposición cartográfica entre áreas del Sistema Nacional de Áreas Protegidas (SNAP), catastros mineros y petroleros otorgados por carteras sectoriales, y los territorios ancestrales colectivos de comunas, pueblos y nacionalidades indígenas genera dilemas constitucionales de alta sensibilidad.

La Constitución de la República del Ecuador (Montecrísti, 2008) establece una arquitectura jurídica de avanzada: por un lado, reconoce a la Naturaleza como sujeto de derechos (Arts. 71-74) y prohíbe la actividad extractiva en áreas protegidas e intangibles (Art. 407); por otro lado, consagra en su Art. 57 los derechos colectivos de los pueblos indígenas sobre sus tierras ancestrales, incluyendo el derecho fundamental a la consulta previa, libre e informada sobre planes o programas de prospección o explotación de recursos no renovables en sus territorios.

El diseño cartográfico de Zonas de Amortiguamiento (Buffer Zones) perimetrales actúa como una membrana de transición ecológica entre el núcleo estrictamente protegido (donde no se permite intervención humana) y la matriz productiva circundante (ciudades, haciendas ganaderas y carreteras). Mediante el modelado de buffers concéntricos variables (por ejemplo, una zona de amortiguamiento inmediata de 2 km y una ampliada de 5 km), los SIG permiten calcular cuántas hectáreas de fincas campesinas quedan bajo régimen especial, diseñar acuerdos de conservación voluntaria a través del programa Socio Bosque y zonificar áreas permitidas para agroforestería sostenible y turismo comunitario.`,
    methodologicalPrinciples: [
      {
        title: 'Álgebra Booleana y Geometría Constructiva de Sólidos (CSG)',
        explanation: 'Las operaciones de superposición aplican teoría de conjuntos a geometrías vectoriales cerradas: la Intersección (AND booleano) aísla el territorio compartido; la Diferencia simétrica (XOR) localiza las áreas divergentes; y la Unión (OR) consolida la extensión total de dos figuras.',
        scientificCitation: 'Tomlin, C. D. (1990). Geographic Information Systems and Cartographic Modeling.'
      },
      {
        title: 'Modelo de Membrana Ecológica y Zonificación Concéntrica',
        explanation: 'El concepto de Reserva de la Biosfera de la UNESCO divide el territorio en tres zonas funcionales: Núcleo (estrictamente protegido para monitoreo genético), Amortiguamiento (actividades tradicionales compatibles y educación) y Transición (desarrollo económico sostenible y asentamientos humanos).',
        scientificCitation: 'UNESCO. (1996). Biosphere Reserves: The Seville Strategy and the Statutory Framework.'
      },
      {
        title: 'Información Geográfica Voluntaria (VGI) y Co-Cartografía Comunitaria',
        explanation: 'Plataformas colaborativas abiertas como OpenStreetMap permiten documentar infraestructura informal no registrada en catastros oficiales del Estado: acequias comunales, senderos de pastoreo de páramo, escuelas rurales y toponimia vernácula en lenguas originarias (Kichwa, Shuar, Achuar, Waorani).',
        scientificCitation: 'Goodchild, M. F. (2007). Citizens as sensors: the world of volunteered geography.'
      }
    ],
    spatialEquations: [
      {
        name: 'Área de una Corona Circular (Buffer Concéntrico Exterior)',
        formula: 'A_{buffer} = \\pi \\cdot (R_{ext}^2 - R_{int}^2)',
        description: 'Calcula la superficie teórica de la corona concéntrica comprendida entre el radio interior y el radio exterior del buffer.',
        variables: 'Rext = radio exterior (ej. 5.000 m), Rint = radio interior (ej. 2.000 m)'
      },
      {
        name: 'Coeficiente de Fricción Territorial por Pendiente (Cálculo de Costo)',
        formula: 'C_{friccion} = C_0 \\cdot \\left(1 + k \\cdot \\tan(\\theta)\\right)',
        description: 'Modela la dificultad de penetración humana hacia el área protegida en función de la pendiente topográfica (buffer anisotrópico).',
        variables: 'C0 = fricción base por tipo de vegetación, θ = ángulo de pendiente, k = constante empírica'
      },
      {
        name: 'Índice de Presión Antrópica Perimetral (PAP)',
        formula: 'PAP = \\frac{\\sum (L_{vias} + N_{asentamientos} \\times w)}{P_{reserva}}',
        description: 'Mide la densidad de infraestructura humana que incide directamente sobre el perímetro lineal del parque.',
        variables: 'Lvias = km lineales de vías en el buffer, Nasentamientos = número de caseríos, Preserva = perímetro del parque'
      }
    ],
    reflectionQuestions: [
      {
        question: '¿Qué conflicto jurídico se suscita cuando un polígono de concesión minera legalmente otorgado antes del COA se superpone con la zona de recarga hídrica de una comunidad indígena en amortiguamiento?',
        pedagogicalGuidance: 'Contrasta el principio de seguridad jurídica de las concesiones con el principio constitucional in dubio pro natura (Art. 395 CE) y la supremacía de los Derechos de la Naturaleza (Art. 71 CE) y del derecho humano al agua (Art. 12 CE).'
      },
      {
        question: '¿Por qué un buffer de ancho fijo (ej. 2 km en todas direcciones) puede ser ecológicamente insuficiente en laderas de fuerte pendiente?',
        pedagogicalGuidance: 'En laderas escarpadas, los agroquímicos y sedimentos se escurren ladera abajo hacia los ríos en distancias mucho mayores que en terrenos planos; una zona de amortiguamiento realista debe ser asimétrica y extenderse a lo largo de toda la cuenca alta vertiente arriba.'
      },
      {
        question: '¿Cómo puede la cartografía comunitaria en OpenStreetMap proteger a los pueblos indígenas frente a la tala ilegal o el despojo territorial?',
        pedagogicalGuidance: 'Al georreferenciar y registrar públicamente en servidores globales abiertos los linderos ancestrales, sitios sagrados y fuentes de agua, las comunidades generan evidencia cartográfica inalterable con marcas de tiempo verificables ante litigios nacionales e internacionales.'
      }
    ],
    commonPitfalls: [
      {
        pitfall: 'Trazar buffers sobre capas vectoriales no proyectadas en elipsoides planos (grados geográficos)',
        consequence: 'Generar elipses distorsionadas en lugar de círculos métricos homogéneos debido a la convergencia de meridianos.',
        howToAvoid: 'Asegurar que la capa vectorial se encuentre en WGS84 UTM Zona 17 Sur (EPSG:32717) con unidades de distancia fijadas en metros lineales.'
      },
      {
        pitfall: 'Proponer el desalojo forzoso de comunidades campesinas preexistentes en la zona de amortiguamiento',
        consequence: 'Violar derechos humanos constitucionales, generar conflicto social severo y propiciar sabotajes ambientales.',
        howToAvoid: 'Diseñar planes de co-manejo participativo, servidumbres ecológicas y esquemas de compensación económica ambiental (Socio Bosque).'
      },
      {
        pitfall: 'No disolver (Dissolve) los buffers individuales generados alrededor de múltiples entidades',
        consequence: 'Tener polígonos sobrepuestos duplicados que duplican o triplican artificialmente el cálculo total de hectáreas.',
        howToAvoid: 'Activar siempre la casilla de verificación "Disolver resultado" (Dissolve all) al ejecutar el geoproceso de buffer en SIG.'
      }
    ],
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Exploración de la Cartografía Colaborativa en OpenStreetMap',
        instruction: 'Acceda a OpenStreetMap.org en el navegador. Localice una zona de frontera ecológica crítica del Ecuador continental (ej. flanco occidental del Parque Nacional Cotopaxi en Sigchos/Pasto Calle, o la zona norte de la Reserva Cuyabeno en Tarapoa). Explore los diferentes estilos cartográficos: Standard, Cycle Map y Transport para identificar toponimia rural detallada.',
        conceptualRationale: 'Los mapas oficiales gubernamentales a menudo tardan años en actualizar caminos vecinales, trochas y caseríos rurales. OpenStreetMap es actualizado diariamente por comunidades locales y proyectos humanitarios, revelando la verdadera presión humana en los linderos.',
        expectedVisualResult: 'Un mapa interactivo con riqueza toponímica local que muestra acequias, nombres de caseríos indígenas, senderos de herradura y escuelas comunitarias.',
        technicalTip: 'Active el panel de capas a la derecha y alterne entre el estilo Standard y Cycle Map: este último incluye curvas de nivel del terreno que facilitan entender la accesibilidad física.',
        toolsUsed: ['Visor OSM', 'Capas Temáticas Cartográficas', 'Inspector de Capas OSM']
      },
      {
        stepNumber: 2,
        title: 'Identificación y Filtrado de Infraestructura Humana en el Perímetro',
        instruction: 'Localice vías de penetración secundaria, fincas agropecuarias, canales de riego y puentes situados a menos de 5 kilómetros del límite del parque. Haga clic derecho y utilice la herramienta "Consultar características" (Query Features) de OSM para examinar las etiquetas clave asociadas a los objetos (ej. `highway=track`, `landuse=farmland`, `natural=wood`).',
        conceptualRationale: 'Cada elemento en OpenStreetMap almacena pares clave-valor (Tags) según ontologías abiertas. Comprender las etiquetas permite filtrar programáticamente qué elementos representan actividades de alto impacto antrópico versus coberturas naturales.',
        expectedVisualResult: 'Un panel lateral desplegado con los metadatos y etiquetas del objeto seleccionado, indicando el tipo de superficie vial (asfalto, lastre o tierra) y el uso del suelo.',
        technicalTip: 'Preste especial atención a las etiquetas `access=private` y `surface=unpaved`, las cuales revelan trochas abiertas clandestinamente para extracción de madera o cacería.',
        toolsUsed: ['Consulta de Características OSM', 'Inspector de Etiquetas de Atributos', 'Filtrado de Infraestructura']
      },
      {
        stepNumber: 3,
        title: 'Diseño Metodológico del Buffer Concéntrico de Amortiguamiento',
        instruction: 'Defina espacialmente dos anillos concéntricos perimetrales alrededor del límite oficial de la reserva: (1) Zona de Amortiguamiento Inmediata de 2 km (anillo de máxima restricción ambiental); y (2) Zona de Amortiguamiento Ampliada de 5 km (anillo de desarrollo sostenible y agroforestería). Calcule el área teórica en hectáreas de cada corona concéntrica.',
        conceptualRationale: 'Una gradiente de restricción gradual es mucho más efectiva que una frontera rígida. El anillo de 2 km absorbe el impacto de pesticidas y perros ferales; el anillo de 5 km conecta fincas agroecológicas con mercados campesinos sostenibles.',
        expectedVisualResult: 'Dos bandas perimetrales continuas que envuelven el parque, permitiendo discriminar con precisión qué comunidades y predios caen en cada nivel de regulación.',
        technicalTip: 'Recuerde la fórmula geométrica: el área del anillo exterior es la diferencia entre el círculo ampliado y el círculo interior $A = \\pi(R_2^2 - R_1^2)$.',
        toolsUsed: ['Geoprocesamiento Buffer', 'Cálculo Geométrico de Áreas', 'Zonificación Concéntrica']
      },
      {
        stepNumber: 4,
        title: 'Mapeo de Conflictos Socioambientales y Semáforo de Criticidad',
        instruction: 'Digitalice y georreferencie los puntos de conflicto socioambiental detectados: (1) Ingreso no regulado de ganado vacuno/ovino al páramo; (2) Canteras de áridos en riberas de ríos; (3) Asentamientos irregulares en zonas de recarga hídrica. Aplique una matriz de criticidad cromática: Rojo (conflicto crítico inmediato), Amarillo (amenaza moderada) y Verde (acuerdo comunitario de conservación).',
        conceptualRationale: 'La semaforización espacial prioriza el despliegue del cuerpo de guardaparques y técnicos ambientales del MAATE en el territorio, optimizando recursos presupuestarios limitados hacia los focos de mayor presión ecológica.',
        expectedVisualResult: 'Puntos temáticos diferenciados por color en el mapa que forman un semáforo territorial de riesgos sobre la zona de amortiguamiento.',
        technicalTip: 'Incluya en la descripción de cada punto el sustento fáctico: número aproximado de cabezas de ganado, tipo de maquinaria observada o fecha estimada de apertura de la trocha.',
        toolsUsed: ['Digitalización de Puntos de Conflicto', 'Semáforo de Criticidad Territorial', 'Matriz de Evaluación de Impactos']
      },
      {
        stepNumber: 5,
        title: 'Propuesta de Corredores de Servidumbre Ecológica y Acuerdos Comunitarios',
        instruction: 'Trace polígonos que conecten los parches boscosos adyacentes a través de las fincas comunitarias, definiendo franjas de protección ribereña de 100 metros en márgenes de ríos. Formule una propuesta de inclusión de las parcelas en el programa Socio Bosque del MAATE, citando los artículos del Código Orgánico del Ambiente relativos a incentivos ambientales.',
        conceptualRationale: 'La conservación moderna no prohíbe, sino que crea incentivos económicos tangibles. Las familias campesinas que reciben compensaciones de Socio Bosque por cuidar páramos se convierten en los aliados más eficaces contra incendios y cazadores furtivos.',
        expectedVisualResult: 'Franjas de corredores riparios continuos dibujadas en verde esmeralda que atraviesan la zona de amortiguamiento, conectando el parque con bosques protectores vecinos.',
        technicalTip: 'Verifique que la propuesta cite expresamente el Art. 71 de la Constitución sobre Derechos de la Naturaleza y los Arts. 60 y 61 del COA sobre subsistemas comunitarios del SNAP.',
        toolsUsed: ['Diseño Vectorial de Corredores', 'Zonificación Participativa', 'Marco Normativo COA / Socio Bosque']
      },
      {
        stepNumber: 6,
        title: 'Exportación de Datos Espaciales (GeoJSON / Overpass Turbo) y Dictamen Técnico',
        instruction: 'Exporte los elementos vectoriales diseñados en formato GeoJSON mediante el botón de exportación de OSM o una consulta rápida en Overpass Turbo. Redacte el dictamen técnico territorial consolidado con la cuantificación de hectáreas en el buffer, el inventario de conflictos y el cronograma de consulta previa comunitaria.',
        conceptualRationale: 'El formato GeoJSON es el estándar abierto nativo de la web para el intercambio de datos espaciales. Permite integrar inmediatamente el producto con visores interactivos, bases de datos PostgreSQL/PostGIS o plataformas de monitoreo satelital en la nube.',
        expectedVisualResult: 'Un archivo `.geojson` válido y bien estructurado que contiene todas las propiedades alfanuméricas de los puntos de conflicto y polígonos de amortiguamiento, junto con un informe técnico en PDF.',
        technicalTip: 'Valide la estructura del archivo GeoJSON en la herramienta en línea geojson.io para confirmar que la geometría de los polígonos no contenga errores topográficos de auto-cruzamiento.',
        toolsUsed: ['Exportador GeoJSON', 'Overpass Turbo API', 'Dictamen Técnico Territorial']
      }
    ],
    glossaryTerms: [
      {
        term: 'Análisis de Superposición (Overlay Analysis)',
        definition: 'Operación geoespacial que combina las geometrías y tablas de atributos de dos o más capas temáticas independientes para evaluar coincidencias espaciales.',
        practicalApplication: 'Cruzar la capa de concesiones mineras con la capa de cuencas abastecedoras de agua de consumo humano.'
      },
      {
        term: 'Zona de Amortiguamiento (Buffer Zone)',
        definition: 'Franja de terreno colindante al perímetro de un área protegida regulada para mitigar los impactos negativos de las actividades humanas circundantes.',
        practicalApplication: 'En Ecuador se rigen por los Planes de Manejo del SNAP, permitiendo agroforestería y turismo de bajo impacto.'
      },
      {
        term: 'Geodiseño (Geodesign)',
        definition: 'Marco de trabajo que integra el diseño territorial participativo directamente con herramientas de modelado y simulación SIG en tiempo real.',
        practicalApplication: 'Talleres comunitarios donde comuneros y técnicos dibujan juntos los límites de uso tradicional.'
      },
      {
        term: 'VGI (Información Geográfica Voluntaria)',
        definition: 'Creación y recopilación de datos geoespaciales aportados de forma colaborativa y desinteresada por ciudadanos (crowdsourcing).',
        practicalApplication: 'OpenStreetMap es el mayor proyecto de VGI global, vital para cartografiar caminos y pueblos no registrados en mapas oficiales.'
      },
      {
        term: 'Consulta Previa, Libre e Informada',
        definition: 'Derecho colectivo constitucional de los pueblos indígenas a ser consultados antes de adoptar medidas administrativas o legislativas que afecten sus tierras.',
        practicalApplication: 'Criterio restrictivo determinante en la evaluación de impacto ambiental de obras en zonas limítrofes.'
      },
      {
        term: 'GeoJSON',
        definition: 'Formato estándar abierto basado en JSON para codificar una variedad de estructuras de datos geográficos con propiedades alfanuméricas.',
        practicalApplication: 'Formato nativo para aplicaciones WebGIS modernas por su ligereza y compatibilidad directa con JavaScript/Leaflet.'
      }
    ],
    expectedProduct: {
      type: 'Plan de Zonificación y Mitigación de Conflictos Territoriales (PDF/GeoJSON)',
      description: 'Propuesta técnica que incluye el mapa de la zona de amortiguamiento con semaforización de conflictos de uso del suelo, cálculo de áreas de amortiguamiento y plan de gobernanza comunitaria.',
      deliverables: [
        'Capa GeoJSON con los polígonos de Buffer concéntricos de 2 km y 5 km',
        'Mapa temático de inventario de conflictos territoriales geo-referenciados con simbología de criticidad',
        'Tabla con cálculo de hectáreas bajo uso agrícola, pastizales y cobertura boscosa remanente en el buffer',
        'Plan de acción participativo articulado con el programa Socio Bosque y la normativa del COA'
      ]
    },
    rubrics: LEARNING_RUBRIC
  }
];
