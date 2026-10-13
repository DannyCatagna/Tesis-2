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
    estimatedTime: '3 Horas pedagógicas',
    theoreticalFoundation: 'El modelamiento de nicho ecológico y la cartografía biogeográfica correlacionan los registros puntuales de presencia biológica con variables bioclimáticas (temperatura media anual, isotermalidad, precipitación) y topográficas (elevación, pendiente, orientación de laderas generada a partir de Modelos Digitales de Elevación - DEM). En el Ecuador, la compleja orografía andina fragmenta los ecosistemas en microcuencas aisladas, originando islas biogeográficas donde especies endémicas como el colibrí Estrella de Garganta Azul (*Oreotrochilus cyanolaemus*) o anfibios del género *Pristimantis* evolucionaron con rangos de distribución extremadamente restringidos.',
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Exploración del Relieve y Reconocimiento de Pisos Zoogeográficos',
        instruction: 'Inicie Google Earth Web en el navegador. Active la capa de relieve 3D en la configuración de capas. Localice el gradiente altitudinal entre la cuenca amazónica (Pastaza/Napo) y el callejón interandino a través de la falla del Pastaza.',
        technicalTip: 'Mantenga presionada la tecla Shift y arrastre con el botón izquierdo del ratón para inclinar la vista cenital a 45° y apreciar la rugosidad topográfica que condiciona la barrera andina.',
        toolsUsed: ['Google Earth Web 3D', 'Herramienta Medir Distancia y Elevación']
      },
      {
        stepNumber: 2,
        title: 'Delimitación del Área de Estudio (Cuenca Hídrica de Alta Montaña)',
        instruction: 'Dibuje un polígono vectorial que encierre la zona de páramo y bosque nublado (entre 2.800 y 4.200 msnm) en el sur del Ecuador (ej. Macizo del Cajas o Cordillera de Chilla). Guarde el polígono en un nuevo proyecto KML.',
        technicalTip: 'Nombre la capa con la convención estándar SIG: `POL_AreaEstudio_Paux_WGS84`. Esto asegura trazabilidad en la gestión de metadatos espaciales.',
        toolsUsed: ['Añadir polígono vectorial', 'Panel de Proyectos KML']
      },
      {
        stepNumber: 3,
        title: 'Carga de Coordenadas de Muestreo de Especies Endémicas',
        instruction: 'Importe las coordenadas geográficas de avistamiento de especies endémicas (ej. *Oreotrochilus chimborazo* o *Tremarctos ornatus*) obtenidas desde repositorios abiertos como GBIF o BioWeb.',
        technicalTip: 'Compruebe que las coordenadas estén expresadas en Grados Decimales (Latitud negativa para el hemisferio sur, Longitud negativa para el hemisferio occidental, ej. Lat: -2.833, Long: -79.233).',
        toolsUsed: ['Importación de Marcadores KML/CSV', 'Tabla de Atributos']
      },
      {
        stepNumber: 4,
        title: 'Análisis de Perfil de Elevación y Gradiente Térmico',
        instruction: 'Trace una línea transecto transversal de 30 km que cruce los puntos de presencia biológica. Active la herramienta de "Perfil de Elevación" para inspeccionar la cota mínima, cota máxima y pendiente media en porcentaje.',
        technicalTip: 'Observe cómo la tasa de gradiente adiabático seco disminuye aproximadamente 0.65 °C por cada 100 metros de elevación, lo cual delimita el nicho fisiológico térmico de la especie.',
        toolsUsed: ['Perfil de Elevación', 'Medición de Pendientes']
      },
      {
        stepNumber: 5,
        title: 'Evaluación de Barreras Antrópicas y Fragmentación',
        instruction: 'Inspeccione visualmente si entre las poblaciones existen parches de deforestación, vías de comunicación pavimentadas o pastizales que interrumpan los corredores continuos de bosque nativo.',
        technicalTip: 'Utilice el zoom satelital de alta resolución para identificar los bordes de bosque (Efecto de Borde) y mida el ancho del corredor biológico más estrecho.',
        toolsUsed: ['Análisis de Cobertura Visual', 'Medidor de Áreas']
      },
      {
        stepNumber: 6,
        title: 'Exportación de la Cartografía y Síntesis Analítica',
        instruction: 'Exporte el mapa final en formato KML/KMZ y capture una composición cartográfica orientada al norte con escala gráfica, leyenda de especies y ficha analítica.',
        technicalTip: 'Verifique que la exportación contenga la simbología cromática diferenciada: rojo para áreas amenazadas y verde esmeralda para núcleos de hábitat óptimo.',
        toolsUsed: ['Exportación KML/KMZ', 'Compositor de Impresión / Captura Geo-referenciada']
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
    rubrics: [
      {
        criterion: 'Rigor Cartográfico y Proyección',
        weight: '25%',
        levels: {
          inicial: 'Presenta errores en las coordenadas o deformaciones por falta de referencia geodésica.',
          enDesarrollo: 'Georreferenciación adecuada pero omite escala gráfica, norte o nomenclatura estándar.',
          competente: 'Cartografía completa con atributos vectoriales limpios y coordenadas correctas.',
          avanzado: 'Excelencia técnica: metadatos ISO, simbología contrastada y jerarquía visual impecable.'
        }
      },
      {
        criterion: 'Interpretación Ecológica del Relieve',
        weight: '30%',
        levels: {
          inicial: 'Menciona elevaciones sin vincularlas a las adaptaciones fisiológicas de la especie.',
          enDesarrollo: 'Identifica los pisos térmicos pero no explica las barreras orográficas que aíslan a la población.',
          competente: 'Analiza el gradiente altitudinal y relaciona la pendiente con la distribución del ecosistema.',
          avanzado: 'Articula con rigor bioclimático el nicho fundamental y efectivo frente a la geomorfología andina.'
        }
      },
      {
        criterion: 'Análisis Espacial de la Fragmentación',
        weight: '25%',
        levels: {
          inicial: 'No identifica parches deforestados ni calcula distancias de aislamiento.',
          enDesarrollo: 'Señala deforestación visible pero omite el cálculo del ancho del corredor.',
          competente: 'Mide parches y evalúa cuantitativamente la pérdida de conectividad ecológica.',
          avanzado: 'Modela el efecto de borde y propone trazados de conectividad paisajística viables.'
        }
      },
      {
        criterion: 'Propuesta de Conservación Territorial',
        weight: '20%',
        levels: {
          inicial: 'Propuestas genéricas sin sustento en los mapas analizados.',
          enDesarrollo: 'Propuestas pertinentes pero sin coordenadas ni delimitación poligonal concreta.',
          competente: 'Propone zonas prioritarias de restauración con ubicación geográfica justificada.',
          avanzado: 'Diseña una propuesta de zonificación espacial aplicable a los planes de manejo del SNAP.'
        }
      }
    ]
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
    estimatedTime: '3.5 Horas pedagógicas',
    theoreticalFoundation: 'La teledetección o percepción remota satelital es la disciplina que adquiere información sobre la superficie terrestre sin contacto físico directo, registrando la radiancia electromagnética reflejada o emitida. Sensores multiespectrales como MODIS (satélites Terra y Aqua) y VIIRS (satélite Suomi NPP) registran diariamente anomalías térmicas infrarrojas (incendios forestales activos) y firmas espectrales de vegetación (NDVI). En la Amazonía y Costa ecuatoriana, el análisis multitemporal revela los patrones espaciales de deforestación en "espina de pescado" asociados a carreteras petroleras y expansión de monocultivos.',
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Acceso a la Plataforma y Configuración del Canvas Satelital',
        instruction: 'Ingrese al visor NASA Worldview. En el panel izquierdo de capas, agregue la capa base "Corrected Reflectance (True Color)" de los sensores MODIS Terra y VIIRS.',
        technicalTip: 'El producto True Color combina las bandas espectrales de luz roja, verde y azul para recrear la apariencia visual natural del terreno tal como la vería el ojo humano desde la órbita.',
        toolsUsed: ['NASA Worldview UI', 'Selector de Capas Espectrales']
      },
      {
        stepNumber: 2,
        title: 'Localización del Frente de Deforestación en el Territorio Ecuatoriano',
        instruction: 'Navegue hacia la provincia de Orellana (vía Auca / Bloque petrolero 16) o hacia la frontera de Esmeraldas (palma aceitera en Quinindé/San Lorenzo). Establezca un zoom adecuado a escala regional.',
        technicalTip: 'Utilice las coordenadas geográficas de referencia para fijar la ventana territorial de monitoreo constante durante la serie de tiempo.',
        toolsUsed: ['Buscador de Topónimos', 'Navegación Pan y Zoom']
      },
      {
        stepNumber: 3,
        title: 'Incorporación de Capas de Anomalías Térmicas e Incendios Activos',
        instruction: 'Active en el panel de eventos la capa "Fires and Thermal Anomalies (Day and Night)" de VIIRS y MODIS. Ajuste la paleta para identificar focos de calor activos.',
        technicalTip: 'Los sensores infrarrojos de onda media (3.9 μm) detectan temperaturas superiores a 300 Kelvin causadas por la quema deliberada de biomasa para cambio de uso del suelo.',
        toolsUsed: ['Thermal Anomalies Layer', 'Detección de Focos de Calor']
      },
      {
        stepNumber: 4,
        title: 'Construcción de la Serie Temporal Interanual (Timelapse)',
        instruction: 'Despliegue la barra temporal inferior. Seleccione un intervalo comparativo de 10 años (ej. meses secos de agosto de 2014 versus agosto de 2024). Active el comparador de cortina deslizante ("Comparison Tool").',
        technicalTip: 'Filtre imágenes con un porcentaje de nubosidad inferior al 20% para evitar confundir niebla orográfica con pérdida real de cobertura forestal.',
        toolsUsed: ['Línea de Tiempo Multianual', 'Herramienta Cortina de Comparación (Swipe)']
      },
      {
        stepNumber: 5,
        title: 'Identificación de Patrones Espaciales de Degradación',
        instruction: 'Analice la geometría del avance de la deforestación: distinga entre deforestación difusa campesina, avance en espina de pescado a lo largo de ejes viales, y clareos masivos para pastizales o piscinas mineras.',
        technicalTip: 'Tome capturas con las marcas de fecha y compare la distancia métrica del frente de deforestación con respecto al límite de las áreas protegidas cercanas.',
        toolsUsed: ['Herramienta Medir Distancias en km', 'Captura de Evidencias']
      },
      {
        stepNumber: 6,
        title: 'Generación de Video Animado GIF y Reporte de Monitoreo',
        instruction: 'Utilice la herramienta nativa de animación de NASA Worldview para generar un bucle animado GIF que documente el proceso de fragmentación y redacte las alertas tempranas correspondientes.',
        technicalTip: 'Configure la animación a una velocidad de 1 fotograma por segundo para que la secuencia de degradación sea nítidamente comprensible en presentaciones académicas.',
        toolsUsed: ['Creador de Animación GIF', 'Exportador GeoTIFF/PNG']
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
    rubrics: [
      {
        criterion: 'Configuración Espectral y Selección de Imágenes',
        weight: '25%',
        levels: {
          inicial: 'Usa imágenes con nubosidad severa que ocultan el terreno o bandas inadecuadas.',
          enDesarrollo: 'Selecciona fechas correctas pero confunde nubes con reflectancia del suelo desnudo.',
          competente: 'Configuración correcta de productos True Color y anomalías térmicas en época seca.',
          avanzado: 'Dominio de sensores: complementa MODIS con VIIRS justificando resoluciones espacial y temporal.'
        }
      },
      {
        criterion: 'Identificación de Patrones Geográficos',
        weight: '30%',
        levels: {
          inicial: 'Señala cambios sin clasificar el tipo de intervención o dinámica espacial.',
          enDesarrollo: 'Identifica deforestación pero no la vincula con ejes viales ni actividades humanas.',
          competente: 'Distingue con claridad patrones en espina de pescado e impactos en zonas limítrofes.',
          avanzado: 'Diagnóstico causal profundo: analiza la sinergia entre colonización, quemas y drenaje de cuencas.'
        }
      },
      {
        criterion: 'Rigor Cuantitativo y Medición Temporal',
        weight: '25%',
        levels: {
          inicial: 'No presenta estimaciones numéricas ni fechas exactas de las anomalías.',
          enDesarrollo: 'Presenta fechas pero las estimaciones de distancia carecen de escala consistente.',
          competente: 'Mide con precisión el avance anual del frente de degradación en kilómetros.',
          avanzado: 'Calcula tasas de avance interanual y estima la probabilidad de impacto en reservas protegidas.'
        }
      },
      {
        criterion: 'Calidad del Boletín y Recomendaciones Técnicas',
        weight: '20%',
        levels: {
          inicial: 'Reporte incompleto o sin animación visual legible.',
          enDesarrollo: 'Animación adecuada pero recomendaciones declarativas sin viabilidad legal.',
          competente: 'Boletín estructurado profesionalmente con recomendaciones técnicas viables.',
          avanzado: 'Producto con estándar de fiscalización ambiental: cita normativa del COA y protocolos de alerta temprana.'
        }
      }
    ]
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
    estimatedTime: '3.5 Horas pedagógicas',
    theoreticalFoundation: 'La Infraestructura de Datos Espaciales (IDE) del Ministerio del Ambiente, Agua y Transición Ecológica articula los servicios interoperables WMS (Web Map Service) y WFS (Web Feature Service) que publican las capas oficiales de las áreas protegidas del Ecuador continental e insular. El análisis de cobertura territorial evalúa la representatividad ecosistémica: si el 20.3% protegido contiene muestras biológicas suficientes de los 91 ecosistemas o si existe un sesgo geográfico hacia páramos de alta montaña de difícil colonización en detrimento de los amenazados bosques secos y húmedos del litoral.',
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Exploración del Catálogo de Metadatos de la IDE MAATE',
        instruction: 'Acceda a la Infraestructura de Datos Espaciales ambiental. Navegue por el catálogo de metadatos e identifique la capa oficial del Sistema Nacional de Áreas Protegidas (SNAP).',
        technicalTip: 'Consulte la fecha de publicación del metadato y confirme que se encuentre bajo el sistema de referencia oficial SIRGAS-Ecuador (WGS84 UTM Zona 17S).',
        toolsUsed: ['Catálogo Geonetwork / IDE', 'Visor Web WMS']
      },
      {
        stepNumber: 2,
        title: 'Carga e Interrogación de Atributos Vectoriales del SNAP',
        instruction: 'Despliegue la capa vectorial del SNAP sobre el mapa base topográfico. Haga clic sobre tres áreas protegidas de distintas categorías (Parque Nacional, Reserva Ecológica, Refugio de Vida Silvestre).',
        technicalTip: 'Revise la tabla de atributos: observe los campos `nombre_ap`, `categoria`, `superficie_ha`, `acuerdo_ministerial` y `subsistema`.',
        toolsUsed: ['Herramienta Identificar (Identify)', 'Tabla de Atributos WFS']
      },
      {
        stepNumber: 3,
        title: 'Superposición con la Capa de División Político-Administrativa',
        instruction: 'Superponga la capa de límites provinciales y cantonales (CONALI / IGM). Identifique qué áreas protegidas abarcan múltiples jurisdicciones provinciales.',
        technicalTip: 'Parques extensos como Yasuní (Orellana y Pastaza) o Sangay (4 provincias) exigen modelos de coordinación interinstitucional compleja con múltiples prefecturas.',
        toolsUsed: ['Gestor de Capas Multitemáticas', 'Control de Transparencia/Opacidad']
      },
      {
        stepNumber: 4,
        title: 'Análisis de Representatividad Ecosistémica',
        instruction: 'Active simultáneamente la capa de Cobertura y Uso de la Tierra o Ecosistemas del Ecuador Continental. Examine qué porcentaje de los bosques secos del litoral cuentan con protección efectiva.',
        technicalTip: 'Observe que los bosques secos tropicales del suroccidente (Guayas, Manabí, Loja) están representados en menos del 5% de su superficie histórica original.',
        toolsUsed: ['Capa de Ecosistemas Continentales', 'Medición de Cobertura']
      },
      {
        stepNumber: 5,
        title: 'Detección de Vacíos de Conservación (Gap Analysis Preliminar)',
        instruction: 'Localice fragmentos remanentes de vegetación nativa en buen estado de conservación que se encuentren fuera de los polígonos del SNAP y a menos de 10 km de distancia de un parque existente.',
        technicalTip: 'Estos remanentes son candidatos ideales para declaratorias de Áreas Protegidas Privadas, Comunitarias o Municipales bajo el COA.',
        toolsUsed: ['Herramienta de Medición de Buffers visuales', 'Análisis de Vacíos']
      },
      {
        stepNumber: 6,
        title: 'Descarga de Datos Vectoriales y Documentación Técnica',
        instruction: 'Descargue los datos vectoriales (formato Shapefile o GeoJSON) o copie el enlace al servicio WFS y elabore la matriz diagnóstica de la categoría analizada.',
        technicalTip: 'Recuerde que los servicios WFS permiten consultar geometrías editables, mientras que WMS entrega únicamente imágenes georreferenciadas pre-renderizadas.',
        toolsUsed: ['Exportación WFS/GeoJSON', 'Matriz de Metadatos']
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
    rubrics: [
      {
        criterion: 'Interacción con Servicios OGC (WMS/WFS)',
        weight: '25%',
        levels: {
          inicial: 'Dificultad para conectar o visualizar los servicios web espaciales oficiales.',
          enDesarrollo: 'Visualiza el mapa WMS pero desconoce cómo acceder a los atributos del WFS.',
          competente: 'Consume con fluidez servicios interoperables e interpreta tablas de atributos.',
          avanzado: 'Manejo experto: documenta endpoint URL, capabilities y proyecta capas vectoriales sin fallas.'
        }
      },
      {
        criterion: 'Análisis de Jurisdicción y Gobernanza',
        weight: '25%',
        levels: {
          inicial: 'No relaciona los límites protegidos con las provincias o cantones involucrados.',
          enDesarrollo: 'Enumera provincias pero no identifica desafíos de ordenamiento territorial conjunto.',
          competente: 'Analiza los solapamientos con divisiones político-administrativas y competencias de GAD.',
          avanzado: 'Propone mecanismos de articulación intergubernamental bajo el Código Orgánico del Ambiente.'
        }
      },
      {
        criterion: 'Evaluación de Representatividad Ecosistémica',
        weight: '30%',
        levels: {
          inicial: 'Afirma que todo el país está bien protegido sin examinar tipos de bosques.',
          enDesarrollo: 'Menciona que faltan áreas en la Costa pero sin datos numéricos de cobertura.',
          competente: 'Demuestra el sesgo altitudinal hacia páramos y la vulnerabilidad del bosque seco/chocoano.',
          avanzado: 'Calcula porcentajes de cobertura por ecosistema y formula un Gap Analysis fundamentado.'
        }
      },
      {
        criterion: 'Calidad Gráfica y Síntesis Técnica',
        weight: '20%',
        levels: {
          inicial: 'Entrega capturas borrosas sin rotulación ni leyenda cartográfica formal.',
          enDesarrollo: 'Mapa legible pero con sobrecarga visual o colores poco contrastantes.',
          competente: 'Mapa equilibrado, con diseño institucional, leyenda limpia y atributos claros.',
          avanzado: 'Diseño cartográfico de nivel profesional con reporte ejecutivo listo para toma de decisiones.'
        }
      }
    ]
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
    estimatedTime: '4 Horas pedagógicas',
    theoreticalFoundation: 'El análisis de superposición espacial (Overlay Analysis) mediante operadores booleanos geométricos (Intersección, Unión, Diferencia y Buffer) es la técnica reina de los SIG para desentrañar conflictos de uso del suelo. En el Ecuador, la superposición cartográfica entre áreas del SNAP, concesiones mineras o bloques petroleros asignados por ministerios sectoriales, y los territorios colectivos de pueblos y nacionalidades indígenas reconocidos constitucionalmente genera tensiones territoriales complejas. El diseño de zonas de amortiguamiento (Buffer Zones) perimetrales actúa como membrana de transición ecológica mitigadora.',
    sequentialSteps: [
      {
        stepNumber: 1,
        title: 'Exploración de la Cartografía Colaborativa en OpenStreetMap',
        instruction: 'Acceda a OpenStreetMap.org. Localice una zona de frontera ecológica en el Ecuador continental (ej. flanco occidental del P.N. Cotopaxi o zona norte de la R.P.F. Cuyabeno).',
        technicalTip: 'Active las capas Standard, Cycle Map y Transport para visualizar con detalle la toponimia de caseríos rurales, senderos comunales y fuentes de agua.',
        toolsUsed: ['Visor OSM', 'Capas Cartográficas Temáticas OSM']
      },
      {
        stepNumber: 2,
        title: 'Identificación de Infraestructura Humana en el Perímetro',
        instruction: 'Localice caminos vecinales, asentamientos agrícolas, canales de riego y escuelas rurales ubicados a menos de 5 kilómetros del límite oficial del área protegida.',
        technicalTip: 'Utilice la herramienta de consulta de objetos ("Query features") de OSM para inspeccionar las etiquetas de uso del suelo (`landuse=farmland`, `highway=track`).',
        toolsUsed: ['Inspección de Etiquetas OSM', 'Herramienta de Medición']
      },
      {
        stepNumber: 3,
        title: 'Diseño Metodológico de la Zona de Amortiguamiento (Buffer)',
        instruction: 'Defina conceptual y espacialmente una zona de amortiguamiento concéntrica de 2 km (anillo exterior) y una zona de amortiguamiento ampliada de 5 km alrededor de la reserva.',
        technicalTip: 'El cálculo del área del Buffer $A = \pi(R_2^2 - R_1^2)$ permite cuantificar cuántas hectáreas deben entrar bajo esquemas de incentivos como Socio Bosque.',
        toolsUsed: ['Geoprocesamiento Buffer', 'Cálculo Geométrico de Áreas']
      },
      {
        stepNumber: 4,
        title: 'Mapeo de Conflictos Socioambientales y Superposiciones',
        instruction: 'Marque y categorice los puntos de conflicto detectados: cruce de ganado hacia el páramo, extracción de material pétreo en cauces de ríos o parcelación irregular en zonas intangibles.',
        technicalTip: 'Asigne una matriz de criticidad cromática: Rojo (conflicto activo severo), Amarillo (riesgo moderado por expansión de frontera agrícola), Verde (acuerdo comunitario de conservación).',
        toolsUsed: ['Digitalización de Puntos de Conflicto', 'Semáforo de Criticidad Territorial']
      },
      {
        stepNumber: 5,
        title: 'Propuesta de Corredores de Conectividad y Uso Sostenible',
        instruction: 'Trace polígonos que conecten parches boscosos adyacentes a través de fincas comunitarias, definiendo franjas de servidumbre ecológica y sistemas agroforestales.',
        technicalTip: 'Incorpore las normas del Código Orgánico del Ambiente respecto a planes de vida y consulta previa, libre e informada con las comunidades locales.',
        toolsUsed: ['Diseño Vectorial de Corredores', 'Zonificación Participativa']
      },
      {
        stepNumber: 6,
        title: 'Exportación de Datos OSM (Overpass Turbo / GeoJSON)',
        instruction: 'Descargue los elementos vectoriales en formato GeoJSON mediante el botón de exportación o una consulta rápida en Overpass Turbo, y elabore el dictamen técnico territorial.',
        technicalTip: 'Valide la estructura del archivo GeoJSON en un validador abierto para asegurar que no existan topologías rotas ni polígonos auto-intersecantes.',
        toolsUsed: ['Exportador GeoJSON', 'Overpass Turbo API']
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
    rubrics: [
      {
        criterion: 'Metodología del Geoprocesamiento Buffer',
        weight: '25%',
        levels: {
          inicial: 'Traza zonas al tanteo sin dimensiones métricas definidas ni escala.',
          enDesarrollo: 'Aplica distancias fijas pero no diferencia zonas de alta y moderada amortiguación.',
          competente: 'Calcula con precisión las áreas de los anillos concéntricos y verifica su topología.',
          avanzado: 'Diseña buffers variables en función de la pendiente y la presión de deforestación adyacente.'
        }
      },
      {
        criterion: 'Identificación y Diagnóstico de Conflictos',
        weight: '30%',
        levels: {
          inicial: 'No reconoce las tensiones entre actividades productivas y la conservación.',
          enDesarrollo: 'Enumera actividades humanas pero sin georreferenciarlas ni evaluar su criticidad.',
          competente: 'Localiza con precisión los puntos de fricción espacial y categoriza sus impactos.',
          avanzado: 'Diagnóstico integral que cruza variables biofísicas con tenencia de la tierra y derechos colectivos.'
        }
      },
      {
        criterion: 'Uso de Datos Colaborativos (OSM / VGI)',
        weight: '20%',
        levels: {
          inicial: 'No logra extraer información de capas colaborativas.',
          enDesarrollo: 'Visualiza OSM como mapa base pero no extrae ni etiqueta datos temáticos.',
          competente: 'Aprovecha las etiquetas de OpenStreetMap para tipificar infraestructura y caminos vecinales.',
          avanzado: 'Exporta y procesa datos vectoriales GeoJSON demostrando dominio de plataformas colaborativas.'
        }
      },
      {
        criterion: 'Viabilidad de la Propuesta Socioambiental',
        weight: '25%',
        levels: {
          inicial: 'Propone soluciones prohibitivas inviables que ignoran a las comunidades residentes.',
          enDesarrollo: 'Propone acuerdos comunitarios pero sin mecanismos de incentivo ni marco legal.',
          competente: 'Articula la propuesta con el Código Orgánico del Ambiente y programas como Socio Bosque.',
          avanzado: 'Estrategia de geogobernanza integral con monitoreo participativo y zonificación consensuada.'
        }
      }
    ]
  }
];
