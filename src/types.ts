export type Mode = 'alphabet' | 'numbers' | 'animals' | 'colors' | 'shapes' | 'music' | 'vehicles' | 'food' | 'weather' | 'emotions' | 'bodyparts' | 'freeplay';

export type Theme = 'dark' | 'light' | 'high-contrast';

export interface AppState {
  mode: Mode;
  soundEnabled: boolean;
  language: string;
  theme: Theme;
  started: boolean;
}

export interface ModeResponse {
  display: string;
  subDisplay?: string;
  color: string;
  speak?: string;
  screenColor?: string;
  isHTML?: boolean;
}
