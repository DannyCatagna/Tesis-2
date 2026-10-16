export type CategoryType = 
  | 'Parque Nacional'
  | 'Reserva Ecológica'
  | 'Reserva Biológica'
  | 'Refugio de Vida Silvestre'
  | 'Reserva de Producción de Fauna'
  | 'Área Nacional de Recreación'
  | 'Reserva Geobotánica';

export type EcuadorianRegion = 'Sierra' | 'Costa' | 'Amazonía' | 'Insular';

export interface ProtectedArea {
  id: string;
  name: string;
  category: CategoryType;
  province: string;
  region: EcuadorianRegion;
  extensionHa: number;
  creationYear: number;
  mainEcosystems: string[];
  keySpecies: {
    commonName: string;
    scientificName: string;
    status: 'En Peligro Crítico' | 'En Peligro' | 'Vulnerable' | 'Casi Amenazado' | 'Preocupación Menor';
  }[];
  coordinates: [number, number]; // [lat, lng]
  zoomLevel: number;
  polygon: [number, number][]; // Coordinates defining the boundary
  description: string;
  threats: string[];
  conservationObjectives: string[];
  snapCode: string;
}

export interface SyllabusSubtopic {
  id: string;
  title: string;
  content: string;
  academicHighlights: string[];
  keyConcepts: string[];
}

export interface SyllabusUnit {
  id: 'unidad-2' | 'unidad-3';
  title: string;
  subtitle: string;
  themeColor: 'jungle' | 'ocean';
  colorHex: string;
  accentBg: string;
  statCallouts: {
    value: string;
    label: string;
    source: string;
  }[];
  subtopics: SyllabusSubtopic[];
  externalResources: {
    title: string;
    description: string;
    url: string;
    badge: string;
  }[];
  guidesAssigned: string[]; // IDs of guides
}

export interface GlossaryItem {
  term: string;
  definition: string;
  practicalApplication: string;
}

export interface ProcedureStep {
  stepNumber: number;
  title: string;
  instruction: string;
  conceptualRationale: string;
  expectedVisualResult: string;
  technicalTip: string;
  toolsUsed: string[];
}

export interface RubricCriterion {
  criterion: string;
  weight: string;
  levels: {
    inicial: string;
    enDesarrollo: string;
    competente: string;
    avanzado: string;
  };
}

export interface DidacticGuide {
  id: string;
  number: number;
  title: string;
  unitId: 'unidad-2' | 'unidad-3';
  unitTitle: string;
  platform: 'Google Earth Web' | 'NASA Worldview' | 'Visor Geográfico MAATE' | 'OpenStreetMap';
  platformUrl: string;
  themeColor: 'paramo' | 'jungle' | 'ocean';
  estimatedTime: string;
  didacticAnalogy?: {
    analogyTitle: string;
    analogyStory: string;
    whyItMatters: string;
  };
  quimicaBiologiaConnection?: {
    biologyConcepts: string[];
    chemistryConcepts: string[];
    classroomActivity: string;
  };
  theoreticalFoundation: string;
  methodologicalPrinciples: {
    title: string;
    explanation: string;
    scientificCitation: string;
  }[];
  spatialEquations: {
    name: string;
    formula: string;
    description: string;
    variables: string;
  }[];
  reflectionQuestions: {
    question: string;
    pedagogicalGuidance: string;
  }[];
  commonPitfalls: {
    pitfall: string;
    consequence: string;
    howToAvoid: string;
  }[];
  sequentialSteps: ProcedureStep[];
  glossaryTerms: GlossaryItem[];
  expectedProduct: {
    type: string;
    description: string;
    deliverables: string[];
  };
  rubrics: RubricCriterion[];
}

export interface APAcitation {
  id: string;
  category: 'Normativa y Políticas' | 'Biodiversidad y Ecología' | 'Sistemas de Información Geográfica' | 'Cartografía Oficial';
  authors: string;
  year: number;
  title: string;
  source: string;
  doiOrUrl?: string;
  abstract: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}
