import { PRICE_MULTIPLIER } from '../constants';

/**
 * Formats a price for display, converting "Free" to Spanish
 */
export const formatPrice = (price: string): string => {
  return price === 'Free' ? 'Gratis' : price;
};

/**
 * Formats a price value to Colombian Pesos for display
 */
export const formatPriceInCOP = (priceInUSD: number): string => {
  return (priceInUSD * PRICE_MULTIPLIER).toLocaleString('es-CO');
};

/**
 * Validates if a string is a valid URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Creates a Steam store URL for a given app ID
 */
export const createSteamUrl = (appId: string): string => {
  return `https://store.steampowered.com/app/${appId}/`;
};

/**
 * Creates a Steam header image URL for a given app ID
 */
export const createSteamImageUrl = (appId: string): string => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
};
