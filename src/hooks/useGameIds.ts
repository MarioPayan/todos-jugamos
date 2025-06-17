import { useState, useEffect } from 'react';

interface UseGameIdsReturn {
  gameIds: string[];
  loading: boolean;
  error: string | null;
}

export const useGameIds = (): UseGameIdsReturn => {
  const [gameIds, setGameIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGameIds = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch game IDs from the JSON file
        const response = await fetch('/data/gameIds.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch game IDs: ${response.statusText}`);
        }
        
        const gameIdsData = await response.json();
        
        if (gameIdsData && gameIdsData.gameIds && Array.isArray(gameIdsData.gameIds)) {
          setGameIds(gameIdsData.gameIds);
        } else {
          throw new Error('Invalid game IDs data format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load game IDs');
        setGameIds([]);
      } finally {
        setLoading(false);
      }
    };

    loadGameIds();
  }, []);

  return { gameIds, loading, error };
};
