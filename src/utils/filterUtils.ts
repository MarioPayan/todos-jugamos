import { Game, GameDifficulty, GameSpecsCategory, GamePlatform } from '../types/game';

/**
 * Checks if a game matches the price filter
 */
export const matchesPriceFilter = (game: Game, maxPrice: number): boolean => {
  return game.priceValue <= maxPrice;
};

/**
 * Checks if a game matches the difficulty filter
 */
export const matchesDifficultyFilter = (game: Game, allowedDifficulties: GameDifficulty[]): boolean => {
  return allowedDifficulties.includes(game.difficultyCategory);
};

/**
 * Checks if a game matches the specs filter using hierarchical matching
 * Each tier includes lower requirement tiers
 */
export const matchesSpecsFilter = (game: Game, requiredSpecs: GameSpecsCategory): boolean => {
  const specsHierarchy: Record<GameSpecsCategory, GameSpecsCategory[]> = {
    any: ['any'],
    decent: ['any', 'decent'],
    powerful: ['any', 'decent', 'powerful'],
  };

  return specsHierarchy[requiredSpecs].includes(game.specsCategory);
};

/**
 * Checks if a game matches the language filter
 */
export const matchesLanguageFilter = (game: Game, availableInSpanish: boolean): boolean => {
  return !availableInSpanish || game.hasSpanish;
};

/**
 * Checks if a game matches the platform filter
 * Game must support at least one selected platform
 */
export const matchesPlatformFilter = (game: Game, selectedPlatforms: GamePlatform[]): boolean => {
  return selectedPlatforms.some(platform => game.platforms.includes(platform));
};
