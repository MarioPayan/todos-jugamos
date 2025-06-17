import { useState, useMemo } from 'react';

import { Game, GameDifficulty, GameFilters, GameSpecsCategory, GamePlatform } from '../types/game';
import { DEFAULT_MAX_PRICE } from '../constants';
import {
  matchesPriceFilter,
  matchesDifficultyFilter,
  matchesSpecsFilter,
  matchesLanguageFilter,
  matchesPlatformFilter,
} from '../utils/filterUtils';

const createDefaultFilters = (): GameFilters => ({
  maxPrice: DEFAULT_MAX_PRICE,
  difficulties: ['easy', 'casual', 'hardcore'],
  specsCategory: 'powerful',
  availableInSpanish: false,
  platforms: ['windows', 'mac', 'linux'],
});

const filterGames = (games: Game[], filters: GameFilters): Game[] => {
  return games.filter(game => 
    matchesPriceFilter(game, filters.maxPrice) &&
    matchesDifficultyFilter(game, filters.difficulties) &&
    matchesSpecsFilter(game, filters.specsCategory) &&
    matchesLanguageFilter(game, filters.availableInSpanish) &&
    matchesPlatformFilter(game, filters.platforms)
  );
};

export const useGameFilters = (games: Game[]) => {
  const [filters, setFilters] = useState<GameFilters>(createDefaultFilters);

  const filteredGames = useMemo(() => filterGames(games, filters), [games, filters]);

  const updateMaxPrice = (price: number) => {
    setFilters(prev => ({ ...prev, maxPrice: price }));
  };

  const toggleDifficulty = (difficulty: GameDifficulty) => {
    setFilters(prev => ({
      ...prev,
      difficulties: prev.difficulties.includes(difficulty)
        ? prev.difficulties.filter(d => d !== difficulty)
        : [...prev.difficulties, difficulty]
    }));
  };

  const updateSpecsCategory = (category: GameSpecsCategory) => {
    setFilters(prev => ({ ...prev, specsCategory: category }));
  };

  const toggleAvailableInSpanish = () => {
    setFilters(prev => ({ ...prev, availableInSpanish: !prev.availableInSpanish }));
  };

  const togglePlatform = (platform: GamePlatform) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  return {
    filters,
    filteredGames,
    updateMaxPrice,
    toggleDifficulty,
    updateSpecsCategory,
    toggleAvailableInSpanish,
    togglePlatform,
  };
};
