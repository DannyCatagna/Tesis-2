import type { RubricCriterion } from '../types';
export const LEARNING_RUBRIC_TITLE = 'Rúbrica de aprendizaje para docentes de Química y Biología';
export const LEARNING_RUBRIC_SCOPE = 'El mapa es un recurso para observar, comprender y enseñar sobre la biodiversidad. Se valora la interpretación científica y su aplicación educativa; no se exige cartografía especializada, manejo de proyecciones, cálculo de polígonos ni operaciones SIG avanzadas.';
export const LEARNING_RUBRIC: (RubricCriterion & { description: string; example: string })[] = [
  {
    "criterion": "Lectura básica del mapa y reconocimiento del entorno",
    "weight": "25%",
    "description": "Ubica el área de estudio y reconoce elementos como ríos, vegetación y actividades humanas. Usa el mapa para describir el contexto del ecosistema.",
    "example": "Señala un río y una zona de vegetación y explica qué información aportan para estudiar el lugar.",
    "levels": {
      "inicial": "Necesita acompañamiento para ubicar el lugar y reconocer elementos del mapa.",
      "enDesarrollo": "Ubica el lugar e identifica algunos elementos, pero su descripción aún es poco clara.",
      "competente": "Ubica el área, describe elementos relevantes y distingue lo observado de lo que necesita comprobar.",
      "avanzado": "Compara elementos del entorno y plantea una pregunta científica clara, reconociendo los límites de la información del mapa."
    }
  },
  {
    "criterion": "Comprensión de la biodiversidad y su conservación",
    "weight": "30%",
    "description": "Explica la relación entre los seres vivos y su ambiente, reconoce amenazas a la biodiversidad y justifica por qué es importante proteger el ecosistema estudiado.",
    "example": "Describe cómo la pérdida de vegetación podría afectar el refugio y alimento de las especies, y explica por qué conservar ese hábitat. Distingue las amenazas documentadas de las que necesitan comprobarse.",
    "levels": {
      "inicial": "Menciona especies o elementos del ambiente sin explicar sus relaciones ni la importancia de conservarlos.",
      "enDesarrollo": "Reconoce algunas relaciones o amenazas, pero necesita apoyo para explicar cómo afectan a la biodiversidad.",
      "competente": "Explica relaciones entre los seres vivos y su ambiente, identifica amenazas con apoyo de fuentes y justifica la conservación del ecosistema.",
      "avanzado": "Relaciona las amenazas con sus posibles efectos sobre especies y hábitats, compara acciones de conservación y justifica sus propuestas reconociendo la información que falta."
    }
  },
  {
    "criterion": "Observación, evidencias y uso de fuentes",
    "weight": "25%",
    "description": "Registra observaciones claras, consulta fuentes confiables y las cita. Diferencia los datos consultados, las observaciones y las hipótesis.",
    "example": "Presenta una captura con una explicación breve y una fuente fechada; indica qué información falta para sostener su conclusión.",
    "levels": {
      "inicial": "Presenta afirmaciones sin observaciones ni fuentes que permitan revisarlas.",
      "enDesarrollo": "Registra algunas observaciones o fuentes, pero no siempre las relaciona con sus conclusiones.",
      "competente": "Sustenta sus explicaciones con observaciones y fuentes identificables; diferencia evidencia e interpretación.",
      "avanzado": "Contrasta fuentes, reconoce limitaciones y propone cómo obtener la información que falta sin inventar resultados."
    }
  },
  {
    "criterion": "Propuesta educativa y cuidado de la biodiversidad",
    "weight": "20%",
    "description": "Diseña una actividad de aula o una acción de educación ambiental vinculada al problema estudiado. Explica qué aprenderán los estudiantes y cómo comprobar ese aprendizaje.",
    "example": "Propone comparar dos ambientes, formular una explicación sobre la biodiversidad y valorar las respuestas con preguntas sencillas.",
    "levels": {
      "inicial": "Plantea una idea general sin explicar su relación con el problema o el aprendizaje.",
      "enDesarrollo": "Propone una actividad relacionada con el tema, pero sus pasos o propósito educativo necesitan mayor claridad.",
      "competente": "Presenta una actividad viable, con propósito, pasos y evidencia de aprendizaje, que promueve el cuidado del entorno.",
      "avanzado": "Adapta la actividad al grupo y al contexto, justifica sus decisiones y propone retroalimentación y participación respetuosa de la comunidad."
    }
  }
];
