// App messages and texts
export const MESSAGES = {
  LOADING: 'Cargando juegos...',
  ERROR_PREFIX: 'Error: ',
  NO_GAMES_FOUND: 'No se encontraron juegos',
  ADJUST_FILTERS: 'Prueba ajustando los filtros para ver más opciones.',
  GAMES_COUNTER: (filtered: number, total: number) => 
    `${filtered} de ${total} juegos`,
  OPEN_STEAM: (gameName: string) => `Abrir ${gameName} en Steam`,
} as const;

export const LABELS = {
  PRICE: 'Precio',
  DIFFICULTY: 'Dificultad',
  PC_REQUIREMENTS: 'PC',
  LANGUAGE: 'Idioma',
  OPERATING_SYSTEM: 'OS',
  SPANISH_AVAILABLE: 'Disponible en español',
  ICON_GUIDE: 'Guía de Íconos',
  DECODE_SYMBOLS: 'Descifra los símbolos de cada juego',
  REQUIREMENTS: 'Requisitos',
  IN_SPANISH: 'En Español',
  NOT_APPLICABLE_LANGUAGE: 'No require saber algún lenguaje en particular',
  ENGLISH_ONLY: 'Solo Inglés',
} as const;

export const ERROR_MESSAGES = {
  CONFIG_ERROR: (error: string) => `Config error: ${error}`,
  FETCH_FAILED: (status: string) => `Failed to fetch games data: ${status}`,
  INVALID_FORMAT: 'Invalid games data format',
  LOAD_FAILED: 'Failed to load games',
} as const;
