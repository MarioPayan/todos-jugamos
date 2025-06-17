import { KEYBOARD_KEYS } from '../constants';

/**
 * Handles keyboard navigation for interactive elements
 */
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  callback: () => void
): void => {
  if (event.key === KEYBOARD_KEYS.ENTER || event.key === KEYBOARD_KEYS.SPACE) {
    event.preventDefault();
    callback();
  }
};

/**
 * Creates a safe onClick handler that prevents event bubbling
 */
export const createSafeClickHandler = (callback: () => void) => {
  return (event: React.MouseEvent) => {
    event.stopPropagation();
    callback();
  };
};

/**
 * Creates accessibility attributes for interactive elements
 */
export const createAccessibilityAttributes = (label: string) => ({
  role: 'button' as const,
  tabIndex: 0,
  'aria-label': label,
});
