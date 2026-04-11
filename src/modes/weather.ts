import { ModeResponse } from '../types';
import { getState } from '../state';

const WEATHER = [
  { emoji: '☀️', en: 'Sun', de: 'Sonne', bg: '#1a1200', color: '#FFD93D' },
  { emoji: '🌧️', en: 'Rain', de: 'Regen', bg: '#0a1628', color: '#74B9FF' },
  { emoji: '⛈️', en: 'Storm', de: 'Gewitter', bg: '#0f0f1a', color: '#A29BFE' },
  { emoji: '❄️', en: 'Snow', de: 'Schnee', bg: '#0d1f2d', color: '#D6EAF8' },
  { emoji: '🌈', en: 'Rainbow', de: 'Regenbogen', bg: '#0a0a0a', color: '#FF9FF3' },
  { emoji: '🌪️', en: 'Tornado', de: 'Tornado', bg: '#1a1000', color: '#FECA57' },
  { emoji: '☁️', en: 'Cloud', de: 'Wolke', bg: '#131318', color: '#AEB6BF' },
  { emoji: '🌤️', en: 'Sunny', de: 'Sonnig', bg: '#100d00', color: '#F9E79F' },
  { emoji: '🌊', en: 'Wave', de: 'Welle', bg: '#001a1a', color: '#1ABC9C' },
  { emoji: '🌫️', en: 'Fog', de: 'Nebel', bg: '#111113', color: '#b0b0b8' },
  { emoji: '🌙', en: 'Moon', de: 'Mond', bg: '#0a0a1a', color: '#F5E6CA' },
  { emoji: '⚡', en: 'Lightning', de: 'Blitz', bg: '#0d0d1a', color: '#F9E71C' },
  { emoji: '🌦️', en: 'Drizzle', de: 'Nieselregen', bg: '#0d1520', color: '#87CEEB' },
  { emoji: '🌬️', en: 'Wind', de: 'Wind', bg: '#101418', color: '#B0C4DE' },
  { emoji: '☃️', en: 'Snowman', de: 'Schneemann', bg: '#0d1a2a', color: '#E8F0FE' },
  { emoji: '🌅', en: 'Sunset', de: 'Sonnenuntergang', bg: '#1a0d00', color: '#FF8C42' },
];

export function handleWeather(): ModeResponse {
  const weather = WEATHER[Math.floor(Math.random() * WEATHER.length)];
  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? weather.de : weather.en;

  return {
    display: weather.emoji,
    subDisplay: name,
    color: weather.color,
    speak: name,
    screenColor: weather.bg,
  };
}
