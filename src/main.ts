import { loadState, getState, setStarted } from './state';
import { initParentMenu, isMenuOpen } from './parent-menu';
import { initCanvas, showResponse } from './visuals';
import { speak, playPop, playChime, playWhoosh, unlockAudio } from './audio';
import { handleAlphabet } from './modes/alphabet';
import { handleNumbers } from './modes/numbers';
import { handleAnimals } from './modes/animals';
import { handleColors } from './modes/colors';
import { handleFreePlay } from './modes/freeplay';
import { handleShapes } from './modes/shapes';
import { handleMusic } from './modes/music';
import { handleVehicles } from './modes/vehicles';
import { handleFood } from './modes/food';
import { handleWeather } from './modes/weather';
import { handleEmotions } from './modes/emotions';
import { handleBodyParts } from './modes/bodyparts';
import { ModeResponse } from './types';

loadState();

const landing = document.getElementById('landing')!;
const stage = document.getElementById('stage')!;
const modeBadge = document.getElementById('mode-badge')!;

const soundEffects = [playPop, playChime, playWhoosh];

const MODE_LABELS: Record<string, string> = {
  alphabet: 'Alphabet',
  numbers: 'Numbers',
  animals: 'Animals',
  colors: 'Colors',
  shapes: 'Shapes',
  music: 'Music',
  vehicles: 'Vehicles',
  food: 'Food',
  weather: 'Weather',
  emotions: 'Emotions',
  bodyparts: 'Body Parts',
  freeplay: 'Free Play',
};

let lastMode = '';
let badgeTimeout: ReturnType<typeof setTimeout> | null = null;
let cursorTimeout: ReturnType<typeof setTimeout> | null = null;
let wakeLock: WakeLockSentinel | null = null;

function vibrate(pattern: number | number[]): void {
  if (!getState().vibrationEnabled) return;
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

async function requestWakeLock(): Promise<void> {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await (navigator as any).wakeLock.request('screen');
      wakeLock!.addEventListener('release', () => { wakeLock = null; });
    } catch { /* ignore */ }
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') requestWakeLock();
});

function showModeBadge(): void {
  const state = getState();
  if (state.mode !== lastMode) {
    lastMode = state.mode;
    vibrate([50, 30, 50]);
    modeBadge.textContent = MODE_LABELS[state.mode] || state.mode;
    modeBadge.classList.remove('visible');
    void modeBadge.offsetWidth;
    modeBadge.classList.add('visible');
    if (badgeTimeout) clearTimeout(badgeTimeout);
    badgeTimeout = setTimeout(() => {
      modeBadge.classList.remove('visible');
    }, 3000);
  }
}

function randomSoundEffect(): void {
  soundEffects[Math.floor(Math.random() * soundEffects.length)]();
}

function enterFullscreen(): void {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen().catch(() => {});
  }
}

function start(): void {
  if (getState().started) return;
  setStarted(true);
  landing.classList.add('hidden');
  stage.classList.remove('hidden');
  initCanvas();
  requestWakeLock();
  enterFullscreen();
  showModeBadge();
}

function dispatch(key?: string): void {
  if (!getState().started) {
    start();
    return;
  }
  if (isMenuOpen()) return;

  const state = getState();
  let response: ModeResponse;

  switch (state.mode) {
    case 'alphabet':
      response = handleAlphabet(key);
      break;
    case 'numbers':
      response = handleNumbers(key);
      break;
    case 'animals':
      response = handleAnimals();
      break;
    case 'colors':
      response = handleColors();
      break;
    case 'shapes':
      response = handleShapes(key);
      break;
    case 'music':
      response = handleMusic(key);
      break;
    case 'vehicles':
      response = handleVehicles();
      break;
    case 'food':
      response = handleFood();
      break;
    case 'weather':
      response = handleWeather();
      break;
    case 'emotions':
      response = handleEmotions();
      break;
    case 'bodyparts':
      response = handleBodyParts(key);
      break;
    case 'freeplay':
      response = handleFreePlay(key);
      break;
  }

  showModeBadge();
  showResponse(response);
  vibrate(30);
  randomSoundEffect();
  if (response.speak) {
    speak(response.speak);
  }
}

// Keyboard input
document.addEventListener('keydown', (e) => {
  // Block navigation keys
  if (e.key === 'Backspace' || (e.ctrlKey && e.key === 'w')) {
    e.preventDefault();
  }

  // Escape handled by parent-menu
  if (e.key === 'Escape') return;

  // Don't repeat on key hold
  if (e.repeat) return;

  e.preventDefault();
  dispatch(e.key);
});

// Touch input
document.addEventListener('touchstart', (e) => {
  unlockAudio();
  // Don't intercept parent zone touches
  const target = e.target as HTMLElement;
  if (target.closest('#parent-zone') || target.closest('#parent-menu')) return;

  e.preventDefault();
  dispatch();
}, { passive: false });

// Mouse input
document.addEventListener('click', (e) => {
  unlockAudio();
  const target = e.target as HTMLElement;
  if (target.closest('#parent-zone') || target.closest('#parent-menu')) return;

  dispatch();
});

// Disable context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Auto-hide cursor after 3s of inactivity
function resetCursorTimer(): void {
  document.body.classList.remove('cursor-hidden');
  if (cursorTimeout) clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(() => {
    document.body.classList.add('cursor-hidden');
  }, 3000);
}

document.addEventListener('mousemove', resetCursorTimer);
resetCursorTimer();

// Init parent menu
initParentMenu();
