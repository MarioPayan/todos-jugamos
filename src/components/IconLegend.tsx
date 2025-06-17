import { useState } from 'react';
import { GameControllerIcon, SwordIcon, DesktopIcon, TranslateIcon, CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';

import { getDifficultyIcon, getSpecsIcon, getLanguageIcon } from '../utils/iconUtils';
import { DIFFICULTY_CONFIG, SPECS_CONFIG, LANGUAGE_CONFIG } from '../constants/gameConfig';
import { ICON_SIZES } from '../constants';
import { GameDifficulty, GameSpecsCategory } from '../types/game';

interface LegendItemProps {
  icon: React.ReactNode;
  label: string;
  className: string;
}

const LegendItem = ({ icon, label, className }: LegendItemProps) => (
  <div className="legend-row">
    <div className={`mini-tag ${className}`}>{icon}</div>
    <span>{label}</span>
  </div>
);

interface LegendCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const LegendCard = ({ title, icon, children }: LegendCardProps) => (
  <div className="legend-card">
    <div className="card-header">
      {icon}
      <span>{title}</span>
    </div>
    <div className="card-content">
      {children}
    </div>
  </div>
);

const DifficultyLegend = () => (
  <LegendCard 
    title="Dificultad" 
    icon={<SwordIcon size={ICON_SIZES.MEDIUM} />}
  >
    {(Object.entries(DIFFICULTY_CONFIG) as [GameDifficulty, typeof DIFFICULTY_CONFIG[GameDifficulty]][]).map(([difficulty, config]) => (
      <LegendItem
        key={difficulty}
        icon={getDifficultyIcon(difficulty)}
        label={config.label}
        className={config.className}
      />
    ))}
  </LegendCard>
);

const SpecsLegend = () => (
  <LegendCard 
    title="Requisitos" 
    icon={<DesktopIcon size={ICON_SIZES.MEDIUM} />}
  >
    {(Object.entries(SPECS_CONFIG) as [GameSpecsCategory, typeof SPECS_CONFIG[GameSpecsCategory]][]).map(([category, config]) => (
      <LegendItem
        key={category}
        icon={getSpecsIcon(category)}
        label={config.label}
        className={config.className}
      />
    ))}
  </LegendCard>
);

const LanguageLegend = () => (
  <LegendCard 
    title="Idioma" 
    icon={<TranslateIcon size={ICON_SIZES.MEDIUM} />}
  >
    <LegendItem
      icon={getLanguageIcon(true)}
      label="Disponible en español"
      className={LANGUAGE_CONFIG.spanish.className}
    />
    <LegendItem
      icon={getLanguageIcon(true)}
      label="No require saber algún lenguaje en particular"
      className={LANGUAGE_CONFIG['not-applicable'].className}
    />
    <LegendItem
      icon={getLanguageIcon(false)}
      label="Sin español"
      className={LANGUAGE_CONFIG.english.className}
    />
  </LegendCard>
);

export const IconLegend = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="icon-legend-dropdown">
      <button 
        className="legend-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <GameControllerIcon size={ICON_SIZES.MEDIUM} />
        <span>Guía de Íconos</span>
        {isOpen ? <CaretUpIcon size={ICON_SIZES.SMALL} /> : <CaretDownIcon size={ICON_SIZES.SMALL} />}
      </button>
      
      {isOpen && (
        <div className="legend-dropdown-content">
          <div className="legend-grid">
            <DifficultyLegend />
            <SpecsLegend />
            <LanguageLegend />
          </div>
        </div>
      )}
    </div>
  );
};
