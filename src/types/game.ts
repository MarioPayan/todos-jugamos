
export type GameDifficulty = 'easy' | 'casual' | 'hardcore';
export type GameSpecsCategory = 'any' | 'decent' | 'powerful';
export type GameLanguage = 'spanish' | 'english' | 'not-applicable';
export type GamePlatform = 'windows' | 'mac' | 'linux';
export type PriceCategory = 'free' | 'cheap' | 'normal' | 'expensive';

export interface Game {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  priceCategory: PriceCategory;
  difficulty: string;
  difficultyCategory: GameDifficulty;
  specs: string;
  specsCategory: GameSpecsCategory;
  language: string;
  languageCategory: GameLanguage;
  platforms: GamePlatform[];
  hasSpanish: boolean;
  icon?: string;
  priceIcon?: string;
  difficultyIcon?: string;
  specsIcon?: string;
  languageIcon?: string;
  description: string;
  steamUrl: string;
  genres?: string[];
}



export interface GameFilters {
  maxPrice: number;
  difficulties: GameDifficulty[];
  specsCategory: GameSpecsCategory;
  availableInSpanish: boolean;
  platforms: GamePlatform[];
}

export interface SteamDBResponse {
  games: Game[];
}
