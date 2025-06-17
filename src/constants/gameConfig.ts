import { GameDifficulty, GameSpecsCategory, GamePlatform } from '../types/game';

// Game categories and their display information
export const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Principiante',
    className: 'difficulty-easy',
  },
  casual: {
    label: 'Casual',
    className: 'difficulty-casual',
  },
  hardcore: {
    label: 'Experimentado',
    className: 'difficulty-hardcore',
  },
} as const satisfies Record<GameDifficulty, { label: string; className: string }>;

export const SPECS_CONFIG = {
  any: {
    label: 'Cualquier PC',
    className: 'specs-any',
  },
  decent: {
    label: 'PC Decente',
    className: 'specs-decent',
  },
  powerful: {
    label: 'PC Potente',
    className: 'specs-powerful',
  },
} as const satisfies Record<GameSpecsCategory, { label: string; className: string }>;

export const PLATFORM_CONFIG = {
  windows: {
    label: 'Windows',
    className: 'platform-windows',
  },
  mac: {
    label: 'macOS',
    className: 'platform-mac',
  },
  linux: {
    label: 'Linux',
    className: 'platform-linux',
  },
} as const satisfies Record<GamePlatform, { label: string; className: string }>;

export const PRICE_CONFIG = {
  free: {
    label: 'Gratis',
    className: 'price-free',
  },
  cheap: {
    label: 'Barato',
    className: 'price-cheap',
  },
  normal: {
    label: 'Normal',
    className: 'price-normal',
  },
  expensive: {
    label: 'Caro',
    className: 'price-expensive',
  },
} as const;

export const LANGUAGE_CONFIG = {
  spanish: {
    label: 'Disponible en español',
    className: 'language-spanish',
  },
  'not-applicable': {
    label: 'No require saber algún lenguaje en particular',
    className: 'language-not-applicable',
  },
  english: {
    label: 'Sin español',
    className: 'language-english-only',
  },
} as const;
