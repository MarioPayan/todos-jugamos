// API and URL constants
export const STEAM_IMAGE_BASE_URL = 'https://cdn.akamai.steamstatic.com/steam/apps';
export const STEAM_STORE_BASE_URL = 'https://store.steampowered.com/app';

// Price configuration
export const PRICE_THRESHOLDS = {
  FREE: 0,
  CHEAP_MAX: 10,
  NORMAL_MAX: 30,
} as const;

export const PRICE_MULTIPLIER = 4000; // COP conversion multiplier

// Filter defaults
export const DEFAULT_MAX_PRICE = 90;
export const PRICE_STEP = 5;
export const PRICE_MIN = 0;
export const PRICE_MAX = 90;

// Icon sizes
export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 48,
} as const;

// Animation and transition values
export const ANIMATION_DURATION = {
  FAST: '0.2s',
  NORMAL: '0.3s',
} as const;

// Keyboard navigation
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
} as const;

// CSS class prefixes for consistency
export const CSS_PREFIXES = {
  PRICE: 'price',
  DIFFICULTY: 'difficulty',
  SPECS: 'specs',
  LANGUAGE: 'language',
  PLATFORM: 'platform',
} as const;

// Re-export all constants for easy importing
export * from './gameConfig';
export * from './messages';
