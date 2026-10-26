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
    "criterion": "Comprensión de procesos químicos y biológicos",
    "weight": "30%",
    "description": "Explica relaciones entre los seres vivos y factores como agua, suelo, luz o temperatura. Utiliza conceptos de Química y Biología pertinentes al caso.",
    "example": "Explica cómo un cambio en la calidad del agua podría afectar a los organismos, sin afirmar que existe contaminación solo por observar el mapa.",
    "levels": {
      "inicial": "Menciona seres vivos o factores ambientales sin explicar cómo se relacionan.",
      "enDesarrollo": "Propone relaciones sencillas, aunque confunde algunos conceptos o necesita apoyo para explicarlos.",
      "competente": "Explica relaciones entre factores ambientales y organismos con conceptos científicos pertinentes y comprensibles.",
      "avanzado": "Relaciona procesos químicos y biológicos, considera distintas explicaciones y señala qué datos permitirían contrastarlas."
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
