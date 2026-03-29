import { ModeResponse } from '../types';
import { getState } from '../state';

const FOODS: Array<{ emoji: string; en: string; de: string; bgColor: string; textColor: string }> = [
  { emoji: '🍎', en: 'Apple', de: 'Apfel', bgColor: '#CC0000', textColor: '#FFFFFF' },
  { emoji: '🍌', en: 'Banana', de: 'Banane', bgColor: '#FFD700', textColor: '#333333' },
  { emoji: '🍕', en: 'Pizza', de: 'Pizza', bgColor: '#E8A317', textColor: '#FFFFFF' },
  { emoji: '🍦', en: 'Ice Cream', de: 'Eis', bgColor: '#FFB6C1', textColor: '#333333' },
  { emoji: '🧁', en: 'Cupcake', de: 'Cupcake', bgColor: '#FF69B4', textColor: '#FFFFFF' },
  { emoji: '🍩', en: 'Donut', de: 'Donut', bgColor: '#D2691E', textColor: '#FFFFFF' },
  { emoji: '🥕', en: 'Carrot', de: 'Karotte', bgColor: '#FF8C00', textColor: '#FFFFFF' },
  { emoji: '🍓', en: 'Strawberry', de: 'Erdbeere', bgColor: '#DC143C', textColor: '#FFFFFF' },
  { emoji: '🍉', en: 'Watermelon', de: 'Wassermelone', bgColor: '#2E8B57', textColor: '#FFFFFF' },
  { emoji: '🥑', en: 'Avocado', de: 'Avocado', bgColor: '#556B2F', textColor: '#FFFFFF' },
  { emoji: '🍇', en: 'Grapes', de: 'Trauben', bgColor: '#6B2FA0', textColor: '#FFFFFF' },
  { emoji: '🍊', en: 'Orange', de: 'Orange', bgColor: '#FF6600', textColor: '#FFFFFF' },
  { emoji: '🌽', en: 'Corn', de: 'Mais', bgColor: '#DAA520', textColor: '#333333' },
  { emoji: '🥦', en: 'Broccoli', de: 'Brokkoli', bgColor: '#228B22', textColor: '#FFFFFF' },
  { emoji: '🍔', en: 'Hamburger', de: 'Hamburger', bgColor: '#8B4513', textColor: '#FFFFFF' },
];

export function handleFood(): ModeResponse {
  const food = FOODS[Math.floor(Math.random() * FOODS.length)];
  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? food.de : food.en;

  return {
    display: food.emoji,
    subDisplay: name,
    color: food.textColor,
    speak: name,
    screenColor: food.bgColor,
  };
}
