# Rediseño de BIOSIG Ecuador

## Alcance
Rediseño de Tesis-2: portada como atlas, navegación adaptable, mapa integrado, búsqueda por provincia o área, filtros por región, fichas junto al mapa y bitácora por área con descarga Markdown. Se mantienen los contenidos, las guías, las rúbricas y los servicios del proyecto.

La bitácora se guarda exclusivamente en localStorage. No se envía a docentes ni acredita aprendizaje; los apartados escritos no equivalen a una calificación. El progreso de usuarios nuevos comienza en cero. Los avances previamente guardados se conservan, aunque la versión anterior podía crear automáticamente la primera guía como completada.

## Criterio pedagógico
Observar → formular una explicación → documentar la evidencia → proponer una acción. La interfaz facilita la indagación; no demuestra por sí misma una mejora de aprendizaje.

## Referencias de diseño consultadas
- ArcGIS StoryMaps: relación entre narrativa, mapas y medios; diseño móvil. https://doc.esri.com/en/arcgis-storymaps/latest/get-started/what-is-arcgis-storymaps.html
- MapBiomas Ecuador: exploración territorial y consulta de metodología y fuentes. https://ecuador.mapbiomas.org/
- NASA Worldview: exploración de imágenes de observación de la Tierra. https://worldview.earthdata.nasa.gov/

Se adoptan principios de interacción; no se copian marcas, contenidos o diseños.

## Cartografía
- Mapas base: CARTO / OpenStreetMap y Esri World Imagery, con atribución visible.
- Los puntos proceden del catálogo existente. Son ubicaciones orientativas, no presencias de especies.
- Los polígonos existentes no cuentan con procedencia cartográfica verificable por entidad. Se ocultan inicialmente y se ofrecen únicamente como esquemas educativos, nunca como límites oficiales.
- Web Mercator en pantalla; coordenadas geográficas WGS84 en grados.
- El modelo 3D es conceptual, no un modelo digital de elevación.
- Errores de carga de teselas se muestran con opción de reintento. Las fichas y notas siguen disponibles.
- Antes de usar las fichas como evidencia científica, contrastar datos y fuentes fechadas. No se ha auditado todo el contenido académico heredado.

## Pendiente de contraste con el perfil
El entorno de ejecución no estuvo disponible durante la preparación inicial y no permitió abrir el DOCX adjunto. Este rediseño se basa en el proyecto existente. El contraste específico con el perfil debe realizarse cuando el archivo pueda leerse; no se declara completado.

## Verificación
El flujo de GitHub Actions comprueba tipos, compilación y recorridos de navegador. Las pruebas usan teselas de prueba para verificar la interfaz de forma reproducible; no certifican disponibilidad de los proveedores de mapas. Los resultados se deben consultar en cada ejecución, no asumirlos a partir de este documento.
