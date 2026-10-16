export type LanguageId = 'html' | 'xml' | 'json' | 'markdown' | 'latex' | 'css' | 'yaml';

export interface ConceptItem {
  term: string;
  definition: string;
  codeSnippet?: string;
  tip?: string;
}

export interface ResourceItem {
  title: string;
  url: string;
  description: string;
  category: 'Spécification' | 'Tutoriel' | 'Outil' | 'Communauté';
  isOfficial?: boolean;
}

export interface TrapItem {
  title: string;
  problem: string;
  solution: string;
  badCode?: string;
  goodCode?: string;
}

export interface LanguageData {
  id: LanguageId;
  name: string;
  fullName: string;
  creator: string;
  year: string;
  tagline: string;
  icon: string;
  color: {
    primary: string;
    bgLight: string;
    bgDark: string;
    border: string;
    badge: string;
    accent: string;
  };
  category: 'Web & Balisage' | 'Données & APIs' | 'Documentation' | 'Sciences & Typographie' | 'Style';
  description: string;
  practicalExample: {
    title: string;
    code: string;
    language: string;
    explanation: string;
  };
  alternativeExamples?: {
    title: string;
    code: string;
    language: string;
    explanation?: string;
  }[];
  keyConcepts: ConceptItem[];
  typicalUseCases: {
    title: string;
    description: string;
    iconName?: string;
  }[];
  commonPitfalls: TrapItem[];
  resources: ResourceItem[];
  funFact?: string;
  fileExtensions: string[];
  mimeType: string;
}

export interface QuizQuestion {
  id: string;
  languageId: LanguageId;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
}

export interface Flashcard {
  id: string;
  languageId: LanguageId;
  category: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  hint?: string;
}

export type ActiveTab = 'fiches' | 'sandboxes' | 'compare' | 'quiz' | 'flashcards';
