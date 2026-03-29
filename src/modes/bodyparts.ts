import { ModeResponse } from '../types';
import { getState } from '../state';

const BODYPARTS = [
  { emoji: '👁️', en: 'Eye', de: 'Auge', bg: '#001a14', color: '#00CEC9' },
  { emoji: '👃', en: 'Nose', de: 'Nase', bg: '#1a1200', color: '#FFEAA7' },
  { emoji: '👂', en: 'Ear', de: 'Ohr', bg: '#0d0028', color: '#A29BFE' },
  { emoji: '👄', en: 'Mouth', de: 'Mund', bg: '#1a0014', color: '#FD79A8' },
  { emoji: '🤚', en: 'Hand', de: 'Hand', bg: '#001428', color: '#74B9FF' },
  { emoji: '🦶', en: 'Foot', de: 'Fuß', bg: '#1a0a00', color: '#FAB1A0' },
  { emoji: '🦷', en: 'Tooth', de: 'Zahn', bg: '#0d0d0d', color: '#DFE6E9' },
  { emoji: '💪', en: 'Arm', de: 'Arm', bg: '#0a1a00', color: '#55EFC4' },
  { emoji: '🫀', en: 'Heart', de: 'Herz', bg: '#1a0000', color: '#FF7675' },
  { emoji: '🧠', en: 'Brain', de: 'Gehirn', bg: '#120028', color: '#6C5CE7' },
];

let touchIndex = 0;

export function handleBodyParts(key?: string): ModeResponse {
  let part: typeof BODYPARTS[number];

  if (key) {
    part = BODYPARTS[Math.floor(Math.random() * BODYPARTS.length)];
  } else {
    part = BODYPARTS[touchIndex % BODYPARTS.length];
    touchIndex++;
  }

  const isGerman = getState().language === 'de-DE';
  const name = isGerman ? part.de : part.en;

  return {
    display: part.emoji,
    subDisplay: name,
    color: part.color,
    speak: name,
    screenColor: part.bg,
  };
}
