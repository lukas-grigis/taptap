import { ModeResponse } from '../types';
import { randomColor } from '../visuals';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let touchIndex = 0;

export function handleAlphabet(key?: string): ModeResponse {
  let letter: string;

  if (key && /^[a-zA-Z]$/.test(key)) {
    letter = key.toUpperCase();
  } else {
    letter = LETTERS[touchIndex % LETTERS.length];
    touchIndex++;
  }

  return {
    display: letter,
    color: randomColor(),
    speak: letter,
  };
}
