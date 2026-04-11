import { ModeResponse } from '../types';
import { getState } from '../state';

const COLORS: Array<{ hex: string; en: string; de: string; text: string }> = [
  { hex: '#FF0000', en: 'Red', de: 'Rot', text: '#FFFFFF' },
  { hex: '#FF8C00', en: 'Orange', de: 'Orange', text: '#FFFFFF' },
  { hex: '#FFD700', en: 'Yellow', de: 'Gelb', text: '#333333' },
  { hex: '#00CC00', en: 'Green', de: 'Grün', text: '#FFFFFF' },
  { hex: '#0088FF', en: 'Blue', de: 'Blau', text: '#FFFFFF' },
  { hex: '#8B00FF', en: 'Purple', de: 'Lila', text: '#FFFFFF' },
  { hex: '#FF69B4', en: 'Pink', de: 'Rosa', text: '#FFFFFF' },
  { hex: '#FFFFFF', en: 'White', de: 'Weiss', text: '#333333' },
  { hex: '#8B4513', en: 'Brown', de: 'Braun', text: '#FFFFFF' },
  { hex: '#00CED1', en: 'Turquoise', de: 'Türkis', text: '#FFFFFF' },
];

export function handleColors(): ModeResponse {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? color.de : color.en;

  return {
    display: name,
    color: color.text,
    speak: name,
    screenColor: color.hex,
  };
}
