import { useState, useEffect } from 'react';
import { GameDifficulty, GamePlatform } from '../types/game';

interface GameConfig {
  gameDifficulties: Record<string, GameDifficulty>;
  gameSpanishSupport: Record<string, boolean>;
  gamePlatforms: Record<string, GamePlatform[]>;
}

interface RawGameConfigItem {
  id: string;
  name: string;
  spanishSupport: boolean;
  difficulty: GameDifficulty;
}

type RawGameConfig = RawGameConfigItem[];

export const useGameConfig = () => {
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/todos-jugamos/data/gameConfig.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData: RawGameConfig = await response.json();
        
        // Transform the array format to the expected object structure
        const transformedConfig: GameConfig = {
          gameDifficulties: {},
          gameSpanishSupport: {},
          gamePlatforms: {}
        };

        rawData.forEach(game => {
          transformedConfig.gameDifficulties[game.id] = game.difficulty;
          transformedConfig.gameSpanishSupport[game.id] = game.spanishSupport;
          // Default to Windows for all games since platform info isn't in the config
          transformedConfig.gamePlatforms[game.id] = ['windows'];
        });

        setConfig(transformedConfig);
        setError(null);
      } catch (err) {
        console.error('Error fetching game config:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
};
