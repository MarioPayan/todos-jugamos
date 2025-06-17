import { MagnifyingGlass } from '@phosphor-icons/react';

import { Game } from '../types/game';
import { GameCard } from './GameCard';
import { ICON_SIZES } from '../constants';
import { MESSAGES } from '../constants/messages';

interface GamesGridProps {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const LoadingState = () => (
  <div className="games-grid-loading">
    <div className="loading-spinner" />
    <p>{MESSAGES.LOADING}</p>
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="games-grid-error">
    <p>{MESSAGES.ERROR_PREFIX}{error}</p>
  </div>
);

const EmptyState = () => (
  <div className="games-grid-empty">
    <MagnifyingGlass size={ICON_SIZES.LARGE} />
    <h3>{MESSAGES.NO_GAMES_FOUND}</h3>
    <p>{MESSAGES.ADJUST_FILTERS}</p>
  </div>
);

const openSteamPage = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const GamesGrid = ({ games, loading, error }: GamesGridProps) => {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (games.length === 0) return <EmptyState />;

  return (
    <div className="games-grid">
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onGameClick={openSteamPage}
        />
      ))}
    </div>
  );
};
