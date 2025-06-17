import { Header } from './components/Header';
import { GameFiltersComponent } from './components/GameFilters';
import { GamesGrid } from './components/GamesGrid';
import { IconLegend } from './components/IconLegend';
import { useGames } from './hooks/useGames';
import { useGameFilters } from './hooks/useGameFilters';
import './App.css';

function App() {
  const { games, loading, error } = useGames();
  const {
    filters,
    filteredGames,
    updateMaxPrice,
    toggleDifficulty,
    updateSpecsCategory,
    toggleAvailableInSpanish,
    togglePlatform
  } = useGameFilters(games);

  return (
    <div className="container">
      <Header />
      
      <section className="games-section">

        <GameFiltersComponent
          filters={filters}
          filteredGamesCount={filteredGames.length}
          totalGamesCount={games.length}
          onMaxPriceChange={updateMaxPrice}
          onDifficultyToggle={toggleDifficulty}
          onSpecsCategoryChange={updateSpecsCategory}
          onAvailableInSpanishToggle={toggleAvailableInSpanish}
          onPlatformToggle={togglePlatform}
        />

        <IconLegend />

        <GamesGrid
          games={filteredGames}
          loading={loading}
          error={error}
        />
      </section>
    </div>
  );
}

export default App;
