import { AppState, Mode, Theme } from './types';

const STORAGE_KEY = 'taptap-prefs';

const defaults: AppState = {
  mode: 'alphabet',
  soundEnabled: true,
  language: 'en-US',
  theme: 'dark',
  vibrationEnabled: true,
  started: false,
};

let state: AppState = { ...defaults };

export function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...defaults, ...parsed, started: false };
    }
  } catch {
    // ignore
  }
  document.documentElement.dataset.theme = state.theme;
  return state;
}

function persist(): void {
  try {
    const { started: _, ...rest } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch {
    // ignore
  }
}

export function getState(): AppState {
  return state;
}

export function setMode(mode: Mode): void {
  state.mode = mode;
  persist();
}

export function setSound(enabled: boolean): void {
  state.soundEnabled = enabled;
  persist();
}

export function setLanguage(lang: string): void {
  state.language = lang;
  persist();
}

export function setVibration(enabled: boolean): void {
  state.vibrationEnabled = enabled;
  persist();
}

export function setTheme(theme: Theme): void {
  state.theme = theme;
  persist();
}

export function setStarted(started: boolean): void {
  state.started = started;
}
