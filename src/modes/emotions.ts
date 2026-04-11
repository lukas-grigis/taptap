import { ModeResponse } from '../types';
import { getState } from '../state';

const EMOTIONS = [
  { emoji: '😊', en: 'Happy', de: 'Glücklich', bg: '#1a1200', color: '#FFEAA7' },
  { emoji: '😢', en: 'Sad', de: 'Traurig', bg: '#001428', color: '#74B9FF' },
  { emoji: '😡', en: 'Angry', de: 'Wütend', bg: '#1a0000', color: '#FF7675' },
  { emoji: '😮', en: 'Surprised', de: 'Überrascht', bg: '#1a0e00', color: '#FDCB6E' },
  { emoji: '🥰', en: 'Love', de: 'Verliebt', bg: '#1a0014', color: '#FD79A8' },
  { emoji: '😴', en: 'Sleepy', de: 'Müde', bg: '#0d0028', color: '#A29BFE' },
  { emoji: '🤩', en: 'Excited', de: 'Begeistert', bg: '#1a0e00', color: '#FDCB6E' },
  { emoji: '😋', en: 'Yummy', de: 'Lecker', bg: '#001a0e', color: '#55EFC4' },
  { emoji: '🤗', en: 'Hug', de: 'Umarmung', bg: '#1a0800', color: '#FAB1A0' },
  { emoji: '😎', en: 'Cool', de: 'Cool', bg: '#0d0d0d', color: '#636E72' },
  { emoji: '😤', en: 'Frustrated', de: 'Frustriert', bg: '#1a0800', color: '#E17055' },
  { emoji: '🤪', en: 'Silly', de: 'Albern', bg: '#0f001a', color: '#6C5CE7' },
  { emoji: '🥳', en: 'Party', de: 'Feiern', bg: '#1a0a1a', color: '#E84393' },
  { emoji: '🤔', en: 'Thinking', de: 'Nachdenken', bg: '#0d1a14', color: '#00B894' },
  { emoji: '🥺', en: 'Pleading', de: 'Bittend', bg: '#141428', color: '#81ECEC' },
  { emoji: '😇', en: 'Angelic', de: 'Engelhaft', bg: '#0d0d1a', color: '#DFE6E9' },
  { emoji: '🤭', en: 'Giggly', de: 'Kichernd', bg: '#1a0d14', color: '#FD79A8' },
  { emoji: '😱', en: 'Shocked', de: 'Schockiert', bg: '#001a1a', color: '#00CEC9' },
  { emoji: '🥱', en: 'Bored', de: 'Gelangweilt', bg: '#141410', color: '#B2BEC3' },
  { emoji: '🤫', en: 'Quiet', de: 'Leise', bg: '#0a1a0a', color: '#55EFC4' },
];

export function handleEmotions(): ModeResponse {
  const emotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? emotion.de : emotion.en;

  return {
    display: emotion.emoji,
    subDisplay: name,
    color: emotion.color,
    speak: name,
    screenColor: emotion.bg,
  };
}
