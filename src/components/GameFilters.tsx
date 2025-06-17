import { 
  FunnelIcon,
  CurrencyDollarIcon,
  TranslateIcon,
  MonitorIcon,
} from '@phosphor-icons/react';

import { GameDifficulty, GameFilters, GameSpecsCategory, GamePlatform } from '../types/game';
import { formatPriceInCOP } from '../utils/formatUtils';
import { getDifficultyIcon, getSpecsIcon, getPlatformIcon } from '../utils/iconUtils';
import { DIFFICULTY_CONFIG, SPECS_CONFIG, PLATFORM_CONFIG } from '../constants/gameConfig';
import { ICON_SIZES, PRICE_MIN, PRICE_MAX, PRICE_STEP } from '../constants';

interface GameFiltersProps {
  filters: GameFilters;
  filteredGamesCount: number;
  totalGamesCount: number;
  onMaxPriceChange: (price: number) => void;
  onDifficultyToggle: (difficulty: GameDifficulty) => void;
  onSpecsCategoryChange: (category: GameSpecsCategory) => void;
  onAvailableInSpanishToggle: () => void;
  onPlatformToggle: (platform: GamePlatform) => void;
}

const GamesCounter = ({ filteredCount, totalCount }: { filteredCount: number; totalCount: number }) => (
  <div className="games-counter-compact">
    <span className="counter-text">
      <strong>{filteredCount}</strong> de <strong>{totalCount}</strong> juegos
    </span>
  </div>
);

const PriceFilter = ({ maxPrice, onMaxPriceChange }: { maxPrice: number; onMaxPriceChange: (price: number) => void }) => (
  <div className="filter-compact price-filter">
    <label className="filter-label-compact">
      <CurrencyDollarIcon size={ICON_SIZES.SMALL} />
      Precio: ${formatPriceInCOP(maxPrice)}
    </label>
    <input
      type="range"
      className="price-slider-compact"
      min={PRICE_MIN}
      max={PRICE_MAX}
      value={maxPrice}
      step={PRICE_STEP}
      onChange={(e) => onMaxPriceChange(Number(e.target.value))}
    />
  </div>
);

const DifficultyFilter = ({ 
  difficulties, 
  onDifficultyToggle 
}: { 
  difficulties: GameDifficulty[]; 
  onDifficultyToggle: (difficulty: GameDifficulty) => void;
}) => (
  <div className="filter-compact difficulty-filter">
    <label className="filter-label-compact">
      <FunnelIcon size={ICON_SIZES.SMALL} />
      Dificultad
    </label>
    <div className="toggle-group">
      {(Object.keys(DIFFICULTY_CONFIG) as GameDifficulty[]).map((difficulty) => (
        <button
          key={difficulty}
          className={`toggle-btn ${difficulties.includes(difficulty) ? 'active' : ''}`}
          onClick={() => onDifficultyToggle(difficulty)}
          title={DIFFICULTY_CONFIG[difficulty].label}
        >
          {getDifficultyIcon(difficulty)}
        </button>
      ))}
    </div>
  </div>
);

const SpecsFilter = ({ 
  specsCategory, 
  onSpecsCategoryChange 
}: { 
  specsCategory: GameSpecsCategory; 
  onSpecsCategoryChange: (category: GameSpecsCategory) => void;
}) => (
  <div className="filter-compact specs-filter">
    <label className="filter-label-compact">
      <MonitorIcon size={ICON_SIZES.SMALL} />
      PC
    </label>
    <div className="toggle-group">
      {(Object.keys(SPECS_CONFIG) as GameSpecsCategory[]).map((category) => (
        <button
          key={category}
          className={`toggle-btn ${specsCategory === category ? 'active' : ''}`}
          onClick={() => onSpecsCategoryChange(category)}
          title={SPECS_CONFIG[category].label}
        >
          {getSpecsIcon(category)}
        </button>
      ))}
    </div>
  </div>
);

const LanguageFilter = ({ 
  availableInSpanish, 
  onAvailableInSpanishToggle 
}: { 
  availableInSpanish: boolean; 
  onAvailableInSpanishToggle: () => void;
}) => (
  <div className="filter-compact language-filter">
    <label className="filter-label-compact">
      <TranslateIcon size={ICON_SIZES.SMALL} />
      Idioma
    </label>
    <button
      className={`toggle-btn single ${availableInSpanish ? 'active' : ''}`}
      onClick={onAvailableInSpanishToggle}
      title="Disponible en español / No require saber algún lenguaje en particular"
    >
      <TranslateIcon size={ICON_SIZES.SMALL} />
    </button>
  </div>
);

const PlatformFilter = ({ 
  platforms, 
  onPlatformToggle 
}: { 
  platforms: GamePlatform[]; 
  onPlatformToggle: (platform: GamePlatform) => void;
}) => (
  <div className="filter-compact platform-filter">
    <label className="filter-label-compact">
      <MonitorIcon size={ICON_SIZES.SMALL} />
      OS
    </label>
    <div className="toggle-group">
      {(Object.keys(PLATFORM_CONFIG) as GamePlatform[]).map((platform) => (
        <button
          key={platform}
          className={`toggle-btn ${platforms.includes(platform) ? 'active' : ''}`}
          onClick={() => onPlatformToggle(platform)}
          title={PLATFORM_CONFIG[platform].label}
        >
          {getPlatformIcon(platform)}
        </button>
      ))}
    </div>
  </div>
);

export const GameFiltersComponent = ({
  filters,
  filteredGamesCount,
  totalGamesCount,
  onMaxPriceChange,
  onDifficultyToggle,
  onSpecsCategoryChange,
  onAvailableInSpanishToggle,
  onPlatformToggle
}: GameFiltersProps) => {
  return (
    <div className="filters-compact">
      <GamesCounter 
        filteredCount={filteredGamesCount} 
        totalCount={totalGamesCount} 
      />

      <div className="filters-row">
        <PriceFilter
          maxPrice={filters.maxPrice}
          onMaxPriceChange={onMaxPriceChange}
        />

        <DifficultyFilter
          difficulties={filters.difficulties}
          onDifficultyToggle={onDifficultyToggle}
        />

        <SpecsFilter
          specsCategory={filters.specsCategory}
          onSpecsCategoryChange={onSpecsCategoryChange}
        />

        <LanguageFilter
          availableInSpanish={filters.availableInSpanish}
          onAvailableInSpanishToggle={onAvailableInSpanishToggle}
        />

        <PlatformFilter
          platforms={filters.platforms}
          onPlatformToggle={onPlatformToggle}
        />
      </div>
    </div>
  );
};
