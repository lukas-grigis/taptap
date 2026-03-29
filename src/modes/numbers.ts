import { ModeResponse } from '../types';
import { randomColor } from '../visuals';

const OBJECTS = ['⭐', '🌟', '✨', '💫', '🔵', '🔴', '🟢', '🟡', '🟣', '🧡'];
let touchCount = 1;

export function handleNumbers(key?: string): ModeResponse {
  let num: number;

  if (key && /^[0-9]$/.test(key)) {
    num = parseInt(key, 10);
  } else {
    num = touchCount;
    touchCount++;
    if (touchCount > 10) touchCount = 1;
  }

  const emoji = OBJECTS[num % OBJECTS.length];
  const objects = num === 0 ? '' : Array(num).fill(emoji).join(' ');

  return {
    display: String(num),
    subDisplay: objects,
    color: randomColor(),
    speak: String(num),
  };
}
