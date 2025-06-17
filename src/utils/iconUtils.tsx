import {
  CoinIcon,
  CurrencyDollarIcon,
  CurrencyDollarSimpleIcon,
  SwordIcon,
  DesktopIcon,
  TranslateIcon,
  GiftIcon,
  LinuxLogoIcon,
  AppleLogoIcon,
  WindowsLogoIcon,
} from '@phosphor-icons/react';
import { GameDifficulty, GameSpecsCategory, GamePlatform, PriceCategory } from '../types/game';

const ICON_SIZE = 18;


// Color mapping for barriers and platforms
const COLOR_MAP = {
  // Barrier colors
  easy: '#2ecc71',    // Green for easy/good
  medium: '#f39c12',  // Orange for medium
  hard: '#e74c3c',    // Red for hard/bad
  neutral: '#95a5a6', // Gray for neutral
  
  // Platform colors (different from barriers)
  windows: '#0078d4', // Microsoft blue
  mac: '#000000',     // Apple black
  linux: '#fcc624',   // Linux yellow
};

interface IconProps {
  backgroundColor: string;
  children: React.ReactNode;
}

const IconWrapper = ({ backgroundColor, children }: IconProps) => {  
  return (
    <div 
      className="icon-wrapper"
      style={{
        position: 'relative',
        backgroundColor: backgroundColor,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: ICON_SIZE,
        width: '24px',
        height: '24px',
      }}
    >
      {children}
    </div>
  );
};

export const getPriceIcon = (category: PriceCategory) => {
  
  const getBarrierColor = (category: PriceCategory) => {
    switch (category) {
      case 'free': return COLOR_MAP.easy;      // Green - no barrier
      case 'cheap': return COLOR_MAP.easy;     // Green - low barrier  
      case 'normal': return COLOR_MAP.medium;  // Orange - medium barrier
      case 'expensive': return COLOR_MAP.hard; // Red - high barrier
      default: return COLOR_MAP.medium;
    }
  };

  const getIcon = (category: PriceCategory) => {
    switch (category) {
      case 'free': return <GiftIcon size={ICON_SIZE} />;
      case 'cheap': return <CoinIcon size={ICON_SIZE} />;
      case 'normal': return <CurrencyDollarIcon size={ICON_SIZE} />;
      case 'expensive': return <CurrencyDollarSimpleIcon size={ICON_SIZE} />;
      default: return <CurrencyDollarIcon size={ICON_SIZE} />;
    }
  };

  return (
    <IconWrapper backgroundColor={getBarrierColor(category)}>
      {getIcon(category)}
    </IconWrapper>
  );
};

export const getDifficultyIcon = (difficulty: GameDifficulty) => {

  const getBarrierColor = (difficulty: GameDifficulty) => {
    switch (difficulty) {
      case 'easy': return COLOR_MAP.easy;      // Green - low barrier
      case 'casual': return COLOR_MAP.medium;  // Orange - medium barrier
      case 'hardcore': return COLOR_MAP.hard;  // Red - high barrier
      default: return COLOR_MAP.medium;
    }
  };

  const getIcon = () => {
    // All difficulty levels use the sword icon
    return <SwordIcon size={ICON_SIZE} />;
  };

  return (
    <IconWrapper backgroundColor={getBarrierColor(difficulty)}>
      {getIcon()}
    </IconWrapper>
  );
};

export const getSpecsIcon = (specs: GameSpecsCategory) => {
  
  const getBarrierColor = (specs: GameSpecsCategory) => {
    switch (specs) {
      case 'any': return COLOR_MAP.easy;       // Green - low barrier
      case 'decent': return COLOR_MAP.medium;  // Orange - medium barrier  
      case 'powerful': return COLOR_MAP.hard;  // Red - high barrier
      default: return COLOR_MAP.medium;
    }
  };

  const getIcon = () => {
    // All specs levels use the desktop icon
    return <DesktopIcon size={ICON_SIZE} />;
  };

  return (
    <IconWrapper backgroundColor={getBarrierColor(specs)}>
      {getIcon()}
    </IconWrapper>
  );
};

export const getLanguageIcon = (hasSpanish: boolean) => {
 
  const barrierColor = hasSpanish ? COLOR_MAP.easy : COLOR_MAP.neutral; // Green for Spanish/Not-applicable, Gray for English only
  const icon = hasSpanish ? <TranslateIcon size={ICON_SIZE} /> : <TranslateIcon size={ICON_SIZE} />;

  return (
    <IconWrapper backgroundColor={barrierColor}>
      {icon}
    </IconWrapper>
  );
};

export const getPlatformIcon = (platform: GamePlatform) => {
  const getIcon = (platform: GamePlatform) => {
    switch (platform) {
      case 'windows':
        return <WindowsLogoIcon size={ICON_SIZE} />;
      case 'mac':
        return <AppleLogoIcon size={ICON_SIZE} />;
      case 'linux':
        return <LinuxLogoIcon size={ICON_SIZE} />;
      default:
        return <WindowsLogoIcon size={ICON_SIZE} />;
    }
  };

  const getPlatformColor = (platform: GamePlatform) => {
    switch (platform) {
      case 'windows':
        return COLOR_MAP.windows;
      case 'mac':
        return COLOR_MAP.mac;
      case 'linux':
        return COLOR_MAP.linux;
      default:
        return COLOR_MAP.windows;
    }
  };

  return (
    <IconWrapper backgroundColor={getPlatformColor(platform)}>
      {getIcon(platform)}
    </IconWrapper>
  );
};
