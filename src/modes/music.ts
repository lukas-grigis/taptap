import { ModeResponse } from '../types';
import { randomColor } from '../visuals';
import { playNote } from '../audio';

// C major scale across 2 octaves
const NOTES = [
  { name: 'C4', freq: 261.63 },
  { name: 'D4', freq: 293.66 },
  { name: 'E4', freq: 329.63 },
  { name: 'F4', freq: 349.23 },
  { name: 'G4', freq: 392.00 },
  { name: 'A4', freq: 440.00 },
  { name: 'B4', freq: 493.88 },
  { name: 'C5', freq: 523.25 },
  { name: 'D5', freq: 587.33 },
  { name: 'E5', freq: 659.25 },
  { name: 'F5', freq: 698.46 },
  { name: 'G5', freq: 783.99 },
  { name: 'A5', freq: 880.00 },
  { name: 'B5', freq: 987.77 },
];

let touchIndex = 0;

export function handleMusic(key?: string): ModeResponse {
  let note: typeof NOTES[number];

  if (key && /^[a-zA-Z]$/.test(key)) {
    // Map letter keys to notes cycling through the scale
    const idx = key.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, ...
    note = NOTES[idx % NOTES.length];
  } else {
    note = NOTES[touchIndex % NOTES.length];
    touchIndex++;
  }

  playNote(note.freq);

  return {
    display: `🎵 ${note.name}`,
    color: randomColor(),
    speak: note.name,
  };
}
