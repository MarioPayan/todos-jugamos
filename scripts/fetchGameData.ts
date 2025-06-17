import fs from 'fs/promises';

// Configuration interface
interface GameConfigItem {
  id: string;
  name: string;
  difficulty: 1 | 2 | 3;
  pcRequirements: 1 | 2 | 3;
  languageNotRequired?: boolean;
}

type GameConfig = GameConfigItem[];

// Types
interface SteamGameResponse {
  success: boolean;
  data?: {
    name: string;
    short_description?: string;
    detailed_description?: string;
    price_overview?: {
      final: number;
      initial: number;
      final_formatted: string;
      initial_formatted: string;
    };
    is_free?: boolean;
    platforms?: {
      windows?: boolean;
      mac?: boolean;
      linux?: boolean;
    };
    supported_languages?: string;
    genres?: Array<{
      id: string;
      description: string;
    }>;
  };
}

interface Game {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  priceCategory: 'free' | 'cheap' | 'normal' | 'expensive';
  difficulty: string;
  difficultyCategory: 'easy' | 'casual' | 'hardcore';
  specs: string;
  specsCategory: 'any' | 'decent' | 'powerful';
  language: string;
  languageCategory: 'spanish' | 'english' | 'not-applicable';
  platforms: ('windows' | 'mac' | 'linux')[];
  hasSpanish: boolean;
  description: string;
  steamUrl: string;
  genres?: string[];
}

interface GamesData {
  games: Game[];
  metadata: {
    totalGames: number;
    fetchedAt: string;
    source: string;
  };
}

// Configuration
const STEAM_API_BASE = 'https://store.steampowered.com/api';
const DELAY_BETWEEN_REQUESTS = 100;

// Helper function to delay execution
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to categorize price
function categorizePriceValue(price: number): 'free' | 'cheap' | 'normal' | 'expensive' {
  if (price === 0) return 'free';
  if (price < 10) return 'cheap';
  if (price < 30) return 'normal';
  return 'expensive';
}

// Helper function to convert difficulty number to category
function getDifficultyCategory(difficulty: 1 | 2 | 3): 'easy' | 'casual' | 'hardcore' {
  switch (difficulty) {
    case 1: return 'easy';
    case 2: return 'casual';
    case 3: return 'hardcore';
    default: return 'casual';
  }
}

// Helper function to convert pcRequirements number to category
function getSpecsCategory(pcRequirements: 1 | 2 | 3): 'any' | 'decent' | 'powerful' {
  switch (pcRequirements) {
    case 1: return 'any';
    case 2: return 'decent';
    case 3: return 'powerful';
    default: return 'any';
  }
}

// Helper function to get language category based on supported languages and config
function getLanguageCategory(supported_languages?: string, languageNotRequired?: boolean): 'spanish' | 'english' | 'not-applicable' {
  // If language is not required for the game, mark as not-applicable
  if (languageNotRequired) {
    return 'not-applicable';
  }
  
  if (!supported_languages) {
    return 'english';
  }
  
  const languages = supported_languages.toLowerCase();
  const hasSpanish = languages.includes('spanish') || languages.includes('español');
  
  return hasSpanish ? 'spanish' : 'english';
}

// Helper function to get platforms from Steam API data
function getPlatforms(platforms?: { windows?: boolean; mac?: boolean; linux?: boolean }): ('windows' | 'mac' | 'linux')[] {
  const availablePlatforms: ('windows' | 'mac' | 'linux')[] = [];
  
  if (platforms?.windows) availablePlatforms.push('windows');
  if (platforms?.mac) availablePlatforms.push('mac');
  if (platforms?.linux) availablePlatforms.push('linux');
  
  // Default to windows if no platform information available
  return availablePlatforms.length > 0 ? availablePlatforms : ['windows'];
}

// Function to fetch game details from Steam API
async function fetchGameDetails(gameId: string): Promise<Game | null> {
  try {
    console.log(`Fetching details for game ID: ${gameId}`);
    
    // Load configuration for difficulty and PC requirements
    let config: GameConfig | null = null;
    const gameConfigMap: Map<string, GameConfigItem> = new Map();
    try {
      const configData = await fs.readFile('public/data/gameConfig.json', 'utf8');
      config = JSON.parse(configData);
      if (config) {
        config.forEach(item => {
          gameConfigMap.set(item.id, item);
        });
      }
    } catch (error) {
      console.warn(`Could not load config file: ${(error as Error).message}`);
    }
    
    // Fetch game details from Steam Store API
    const response = await fetch(`${STEAM_API_BASE}/appdetails?appids=${gameId}&l=spanish`);

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Record<string, SteamGameResponse> = await response.json();
    const gameData = data[gameId];
    
    if (!gameData || !gameData.success || !gameData.data) {
      console.warn(`No data found for game ID: ${gameId}`);
      return null;
    }
    
    const game = gameData.data;
    
    // Extract price information
    let price = 'Free';
    let priceValue = 0;
    
    if (game.price_overview) {
      price = game.price_overview.final_formatted || game.price_overview.initial_formatted || 'N/A';
      const rawPrice = (game.price_overview.final || game.price_overview.initial || 0) / 100;
      
      // Convert Colombian pesos to USD approximation for filtering
      // 1 USD ≈ 4000 COP (approximate conversion rate)
      if (price.includes('COL$')) {
        priceValue = rawPrice / 4000;
      } else {
        priceValue = rawPrice;
      }
    } else if (game.is_free) {
      price = 'Free';
      priceValue = 0;
    }
    
    // Use configuration data for difficulty and PC requirements
    const gameConfigItem = gameConfigMap.get(gameId);
    const difficultyCategory = gameConfigItem ? getDifficultyCategory(gameConfigItem.difficulty) : 'casual';
    const specsCategory = gameConfigItem ? getSpecsCategory(gameConfigItem.pcRequirements) : 'any';
    const languageCategory = getLanguageCategory(game.supported_languages, gameConfigItem?.languageNotRequired);
    const hasSpanish = languageCategory === 'spanish' || languageCategory === 'not-applicable';
    const platforms = getPlatforms(game.platforms);
    
    // Categorize game
    const priceCategory = categorizePriceValue(priceValue);
    
    // Get difficulty and specs descriptions
    const difficultyDescriptions = {
      'easy': 'Principiante - Fácil de aprender',
      'casual': 'Casual - Moderadamente desafiante',
      'hardcore': 'Experimentado - Muy desafiante'
    };
    
    const specsDescriptions = {
      'any': 'Cualquier computador',
      'decent': 'Computador decente',
      'powerful': 'Computador potente'
    };

    const languageDescriptions = {
      'spanish': 'Disponible en español',
      'english': 'Disponible en inglés'
    };
    
    
    // Extract genres
    const genres = game.genres?.map(genre => genre.description) || [];
    
    // Format the game object according to the expected structure
    const formattedGame: Game = {
      id: gameId.toString(),
      name: game.name || 'Unknown Game',
      price: price,
      priceValue: priceValue,
      priceCategory: priceCategory,
      difficulty: difficultyDescriptions[difficultyCategory],
      difficultyCategory: difficultyCategory,
      specs: specsDescriptions[specsCategory],
      specsCategory: specsCategory,
      language: languageDescriptions[languageCategory],
      languageCategory: languageCategory,
      platforms: platforms,
      hasSpanish: hasSpanish,
      description: game.short_description || (game.detailed_description?.substring(0, 150) + '...') || 'Sin descripción disponible',
      steamUrl: `https://store.steampowered.com/app/${gameId}/`,
      genres: genres.length > 0 ? genres : undefined
    };
    
    console.log(`✓ Successfully processed: ${formattedGame.name}`);
    return formattedGame;
    
  } catch (error) {
    console.error(`Error fetching game ${gameId}:`, (error as Error).message);
    return null;
  }
}

// Main function to process all games
async function fetchAllGames(gameIds: string[]): Promise<Game[]> {
  const games: Game[] = [];
  
  console.log(`Starting to fetch ${gameIds.length} games...`);
  
  for (let i = 0; i < gameIds.length; i++) {
    const gameId = gameIds[i];
    const game = await fetchGameDetails(gameId);
    
    if (game) {
      games.push(game);
    }
    
    // Add delay between requests to be respectful to the API
    if (i < gameIds.length - 1) {
      console.log(`Waiting ${DELAY_BETWEEN_REQUESTS}ms before next request...`);
      await delay(DELAY_BETWEEN_REQUESTS);
    }
  }
  
  console.log(`\nCompleted! Successfully fetched ${games.length} out of ${gameIds.length} games.`);
  return games;
}

// Function to load game IDs from file
async function loadGameIds(filePath: string): Promise<string[]> {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    
    // Handle the new config format with id, name, difficulty, pcRequirements
    if (Array.isArray(json) && json.length > 0 && 'id' in json[0]) {
      return json.map((item: GameConfigItem) => item.id.toString());
    }
    // Handle legacy formats for backward compatibility
    else if (Array.isArray(json)) {
      return json.map(id => id.toString());
    } else if (json.gameIds && Array.isArray(json.gameIds)) {
      return json.gameIds.map((id: string | number) => id.toString());
    } else {
      throw new Error('Invalid format. Expected array of game config objects with id, name, difficulty, and pcRequirements properties.');
    }
  } catch (error) {
    throw new Error(`Error loading game IDs from ${filePath}: ${(error as Error).message}`);
  }
}

// Function to save games data to file
async function saveGamesData(games: Game[], outputPath: string): Promise<void> {
  const outputData: GamesData = {
    games: games,
    metadata: {
      totalGames: games.length,
      fetchedAt: new Date().toISOString(),
      source: 'Steam Store API'
    }
  };
  
  await fs.writeFile(outputPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`Games data saved to: ${outputPath}`);
}

// Main execution
async function main(): Promise<void> {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const gameIdsFile = args[0] || 'public/data/gameConfig.json';
    const outputFile = args[1] || 'public/data/gamesData.json';
    
    console.log('Steam Game Data Fetcher');
    console.log('======================');
    console.log(`Input file: ${gameIdsFile}`);
    console.log(`Output file: ${outputFile}`);
    console.log('');
    
    // Load game IDs
    const gameIds = await loadGameIds(gameIdsFile);
    console.log(`Loaded ${gameIds.length} game IDs`);
    
    // Fetch all games
    const games = await fetchAllGames(gameIds);
    
    // Save results
    await saveGamesData(games, outputFile);
    
    console.log('\n✅ Process completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
    process.exit(1);
  }
}

// Run the script if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fetchAllGames, fetchGameDetails };
