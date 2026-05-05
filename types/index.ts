export interface WisdomCard {
  id: string;
  latin: string;
  source: string;
  french: string;
  philosophy: string;
  philosophyAuthor: string;
  theme: Theme;
  sourceType: SourceType;
  backgroundImage: string;
  premium: boolean;
}

export type Theme =
  | 'Patience'
  | 'Amour'
  | 'Sagesse'
  | 'Gratitude'
  | 'Dieu'
  | 'Espoir'
  | 'Force'
  | 'Foi'
  | 'Paix'
  | 'Beauté'
  | 'Générosité'
  | 'Humilité'
  | 'Pardon'
  | 'Lumière'
  | 'Grâce'
  | 'Modération'
  | 'Tempérance';

export type SourceType =
  | 'Bible'
  | 'Évangiles'
  | 'Épîtres de Paul'
  | 'Psaumes'
  | "Augustin d'Hippone"
  | 'Saint Augustin'
  | "Thomas d'Aquin"
  | 'Jean de la Croix'
  | "Thérèse d'Avila"
  | 'Thérèse de Lisieux'
  | "François d'Assise"
  | 'Pascal'
  | 'Meister Eckhart'
  | 'Bernanos'
  | 'Charles de Foucauld'
  | 'Ignace de Loyola'
  | 'Saint Anselme de Cantorbéry'
  | 'Hymne liturgique'
  | 'Jean Chrysostome'
  | 'Grégoire le Grand'
  | 'Ambroise de Milan'
  | 'Saint Jérôme'
  | 'Origène'
  | 'Newman'
  | 'Romano Guardini'
  | 'Hans Urs von Balthasar'
  | 'Bonaventure'
  | 'Teilhard de Chardin';

// ── Education system ─────────────────────────────────────────

export type GradeLevel =
  | 'Néophyte'
  | 'Catéchumène'
  | 'Fidèle'
  | 'Lecteur'
  | 'Acolyte'
  | 'Diacre'
  | 'Prédicateur'
  | 'Prêtre'
  | 'Théologien'
  | 'Docteur';

export interface Lesson {
  id: string;
  moduleId: number;
  order: number;
  title: string;
  subtitle: string;
  content: string;
  keyPoints: string[];
  sacredQuote?: string;
  sacredSource?: string;
  duration: number;
}

export interface EducationModule {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export type QuizDifficulty = 'facile' | 'moyen' | 'difficile';

export interface QuizQuestion {
  id: string;
  moduleId: number;
  difficulty: QuizDifficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source?: string;
}

export interface ModuleProgress {
  moduleId: number;
  lessonsCompleted: string[];
  quizScores: number[];
  bestScore: number;
  unlocked: boolean;
}

export interface EducationProgress {
  modules: Record<number, ModuleProgress>;
  totalQuizAnswered: number;
  totalCorrect: number;
  grade: GradeLevel;
  gradeScore: number;
  lastActivity: string;
}
