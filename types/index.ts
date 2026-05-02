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
  | 'Grâce';

export type SourceType =
  | 'Bible'
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
