import { getState, setMode, setSound, setVibration, setLanguage, setTheme } from './state';
import { Mode, Theme } from './types';

const ALL_MODES: Mode[] = ['alphabet', 'numbers', 'animals', 'colors', 'shapes', 'music', 'vehicles', 'food', 'weather', 'emotions', 'bodyparts', 'freeplay'];

let holdTimer: ReturnType<typeof setTimeout> | null = null;
let menuOpen = false;

export function initParentMenu(): void {
  const parentZone = document.getElementById('parent-zone')!;
  const menu = document.getElementById('parent-menu')!;
  const backdrop = menu.querySelector('.menu-backdrop')!;
  const soundToggle = document.getElementById('sound-toggle') as HTMLInputElement;
  const vibrationToggle = document.getElementById('vibration-toggle') as HTMLInputElement;
  const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
  const exitBtn = document.getElementById('exit-fullscreen')!;
  const closeBtn = document.getElementById('menu-close-btn')!;

  // Apply saved theme at startup
  applyTheme(getState().theme);

  // Sync UI with state
  syncMenuUI();

  // Hold detection on parent zone
  const startHold = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    parentZone.classList.add('holding');
    holdTimer = setTimeout(() => {
      parentZone.classList.remove('holding');
      openMenu();
    }, 3000);
  };

  const cancelHold = () => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    parentZone.classList.remove('holding');
  };

  parentZone.addEventListener('mousedown', startHold);
  parentZone.addEventListener('mouseup', cancelHold);
  parentZone.addEventListener('mouseleave', cancelHold);
  parentZone.addEventListener('touchstart', startHold, { passive: false });
  parentZone.addEventListener('touchend', cancelHold);
  parentZone.addEventListener('touchcancel', cancelHold);

  // Mode buttons
  menu.querySelectorAll('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mode = (btn as HTMLElement).dataset.mode as Mode;
      setMode(mode);
      syncMenuUI();
    });
  });

  // Sound toggle (checkbox)
  soundToggle.addEventListener('change', (e) => {
    e.stopPropagation();
    setSound(soundToggle.checked);
    syncMenuUI();
  });

  // Vibration toggle
  vibrationToggle.addEventListener('change', (e) => {
    e.stopPropagation();
    setVibration(vibrationToggle.checked);
    syncMenuUI();
  });

  // Theme buttons
  menu.querySelectorAll('[data-theme]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = (btn as HTMLElement).dataset.theme as Theme;
      setTheme(theme);
      applyTheme(theme);
      syncMenuUI();
    });
  });

  // Language select
  langSelect.addEventListener('change', (e) => {
    e.stopPropagation();
    setLanguage(langSelect.value);
  });

  // Exit fullscreen
  exitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    closeMenu();
  });

  // Close button
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // Close on backdrop click
  backdrop.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    }
  });
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

function syncMenuUI(): void {
  const state = getState();
  const menu = document.getElementById('parent-menu')!;
  const soundToggle = document.getElementById('sound-toggle') as HTMLInputElement;
  const soundLabel = document.getElementById('sound-label')!;
  const vibrationToggle = document.getElementById('vibration-toggle') as HTMLInputElement;
  const vibrationLabel = document.getElementById('vibration-label')!;
  const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
  const modeCounter = document.getElementById('mode-counter')!;

  // Mode buttons
  menu.querySelectorAll('[data-mode]').forEach((btn) => {
    const el = btn as HTMLElement;
    el.classList.toggle('active', el.dataset.mode === state.mode);
  });

  // Sound (checkbox toggle)
  soundToggle.checked = state.soundEnabled;
  soundLabel.textContent = state.soundEnabled ? 'On' : 'Off';

  // Vibration toggle
  vibrationToggle.checked = state.vibrationEnabled;
  vibrationLabel.textContent = state.vibrationEnabled ? 'On' : 'Off';

  // Theme buttons
  menu.querySelectorAll('[data-theme]').forEach((btn) => {
    const el = btn as HTMLElement;
    el.classList.toggle('active', el.dataset.theme === state.theme);
  });

  // Language
  langSelect.value = state.language;

  // Mode counter
  const modeIndex = ALL_MODES.indexOf(state.mode);
  modeCounter.textContent = `${modeIndex + 1} of ${ALL_MODES.length}`;
}

export function openMenu(): void {
  const menu = document.getElementById('parent-menu')!;
  menu.classList.remove('hidden', 'menu-exiting');
  // Force reflow so the entering transition plays from initial state
  void menu.offsetWidth;
  menu.classList.add('menu-entering');
  menuOpen = true;
  syncMenuUI();

  // After entrance animation, switch to stable class
  setTimeout(() => {
    if (menuOpen) {
      menu.classList.remove('menu-entering');
      menu.classList.add('menu-visible');
    }
  }, 450);
}

function closeMenu(): void {
  const menu = document.getElementById('parent-menu')!;
  menu.classList.remove('menu-visible', 'menu-entering');
  menu.classList.add('menu-exiting');
  const onEnd = () => {
    menu.classList.remove('menu-exiting');
    menu.classList.add('hidden');
    menu.removeEventListener('transitionend', onEnd);
  };
  menu.addEventListener('transitionend', onEnd);
  // Fallback timeout
  setTimeout(() => {
    if (menu.classList.contains('menu-exiting')) {
      menu.classList.remove('menu-exiting');
      menu.classList.add('hidden');
    }
  }, 500);
  menuOpen = false;
}

export function isMenuOpen(): boolean {
  return menuOpen;
}
