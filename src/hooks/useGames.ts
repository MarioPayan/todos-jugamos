import { useState, useEffect } from 'react';
import { Game } from '../types/game';
import { ERROR_MESSAGES } from '../constants/messages';

interface UseGamesReturn {
  games: Game[];
  loading: boolean;
  error: string | null;
}

interface GamesDataResponse {
  games: Game[];
  [key: string]: unknown;
}

const DATA_FILE_PATH = '/todos-jugamos/data/gamesData.json';

const fetchGamesData = async (): Promise<GamesDataResponse> => {
  const response = await fetch(DATA_FILE_PATH);
  
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_FAILED(response.statusText));
  }
  
  return response.json();
};

const validateGamesData = (gamesData: unknown): Game[] => {
  if (!gamesData || typeof gamesData !== 'object' || gamesData === null) {
    throw new Error(ERROR_MESSAGES.INVALID_FORMAT);
  }
  
  const data = gamesData as GamesDataResponse;
  
  if (!data.games || !Array.isArray(data.games)) {
    throw new Error(ERROR_MESSAGES.INVALID_FORMAT);
  }
  
  return data.games;
};

export const useGames = (): UseGamesReturn => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const gamesData = await fetchGamesData();
        const validatedGames = validateGamesData(gamesData);
        
        setGames(validatedGames);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.LOAD_FAILED;
        setError(errorMessage);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return { 
    games, 
    loading, 
    error 
  };
};
