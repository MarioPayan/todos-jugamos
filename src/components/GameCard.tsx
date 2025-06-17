import React from 'react';
import { GameControllerIcon } from '@phosphor-icons/react';

import { Game } from '../types/game';
import { formatPrice, createSteamImageUrl } from '../utils/formatUtils';
import { handleKeyboardNavigation, createAccessibilityAttributes } from '../utils/interactionUtils';
import { getDifficultyIcon, getSpecsIcon, getLanguageIcon } from '../utils/iconUtils';
import { DIFFICULTY_CONFIG, SPECS_CONFIG, LANGUAGE_CONFIG, PRICE_CONFIG } from '../constants/gameConfig';
import { ICON_SIZES } from '../constants';
import { MESSAGES } from '../constants/messages';

interface GameCardProps {
  game: Game;
  onGameClick: (url: string) => void;
}

const GameImage = ({ game }: { game: Game }) => {
  const imageUrl = createSteamImageUrl(game.id);
  
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
    const fallback = target.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <div className="game-image">
      <img
        src={imageUrl}
        alt={game.name}
        onError={handleImageError}
      />
      <div className="game-image-fallback">
        <GameControllerIcon size={ICON_SIZES.LARGE} />
      </div>
    </div>
  );
};

const GameTags = ({ game }: { game: Game }) => (
  <div className="game-tags-mini">
    <div className="game-tags-icons">
      <div 
        className={`mini-tag ${DIFFICULTY_CONFIG[game.difficultyCategory].className}`} 
        title={game.difficulty}
      >
        {getDifficultyIcon(game.difficultyCategory)}
      </div>
      <div 
        className={`mini-tag ${SPECS_CONFIG[game.specsCategory].className}`} 
        title={game.specs}
      >
        {getSpecsIcon(game.specsCategory)}
      </div>
      <div 
        className={`mini-tag ${LANGUAGE_CONFIG[game.languageCategory].className}`} 
        title={game.language}
      >
        {getLanguageIcon(game.hasSpanish)}
      </div>
    </div>
    <div className={`game-price-display ${PRICE_CONFIG[game.priceCategory].className}`}>
      {formatPrice(game.price)}
    </div>
  </div>
);

const GenreChips = ({ genres }: { genres?: string[] }) => {
  if (!genres || genres.length === 0) return null;
  
  return (
    <div className="genre-chips">
      {genres.map((genre, index) => (
        <span key={index} className="genre-chip">
          {genre}
        </span>
      ))}
    </div>
  );
};

export const GameCard = ({ game, onGameClick }: GameCardProps) => {
  const handleClick = () => onGameClick(game.steamUrl);
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    handleKeyboardNavigation(event, handleClick);
  };

  const accessibilityProps = createAccessibilityAttributes(MESSAGES.OPEN_STEAM(game.name));

  return (
    <div
      className="game-card"
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      {...accessibilityProps}
    >
      <div className="game-card-inner">
        <GameImage game={game} />
        
        <div className="game-content">
          <div className="game-header">
            <h3 className="game-title">{game.name}</h3>
          </div>
          
          <div className="game-info-bar">
            <GameTags game={game} />
          </div>
          
          <p className="game-description">{game.description}</p>
          
          <GenreChips genres={game.genres} />
        </div>
      </div>
    </div>
  );
};
