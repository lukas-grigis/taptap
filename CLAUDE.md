# CLAUDE.md — TapTap Development Guide

## What is this?
TapTap is a fullscreen toddler learning toy. Kids smash keys / tap the screen and get big, colorful, educational responses with sound.

## Tech Stack
- Vanilla TypeScript + Vite (no framework)
- Web Speech API for spoken words
- Web Audio API for sound effects (synth pops, chimes, whooshes)
- CSS animations + canvas particles for visuals
- localStorage for preferences
- Zero runtime dependencies
- Nunito font (Google Fonts CDN)

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (must stay error-free)
- `npm run preview` — preview production build

## Architecture
- `src/main.ts` — entry point, event listeners, fullscreen management, cursor auto-hide, mode badge
- `src/modes/*.ts` — each mode exports a handler: `(key?: string) => ModeResponse`
- `src/audio.ts` — speech synthesis + Web Audio sound effects
- `src/visuals.ts` — animations, particles (circles/stars/rounded squares), glow effects
- `src/parent-menu.ts` — slide-in parent menu (2s hold top-left), theme/sound/language/mode controls
- `src/state.ts` — localStorage preferences (mode, sound, language, theme)
- `src/types.ts` — shared types (Mode, Theme, ModeResponse, AppState)
- `styles/main.css` — design system with CSS custom properties, themes, animations

## Design System
- **Font**: Nunito (700, 800, 900 weights)
- **Themes**: dark (default), light, high-contrast — applied via `data-theme` on `<html>`
- **CSS Variables**: `--bg`, `--bg-elevated`, `--bg-glass`, `--text-primary`, `--text-secondary`, `--accent`, radius/shadow/transition tokens
- **Animations**: spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for entrances, ease-out for exits
- **Particles**: mix of circles (60%), stars (30%), rounded squares (10%); 40 per burst, 80 on first tap (rainbow confetti)
- **Glow**: text-shadow `0 0 60px {color}88, 0 0 120px {color}44` on display element
- **Float**: `char-float` class adds gentle 2.5s floating animation to display
- **Reduced motion**: all animations disabled via `prefers-reduced-motion: reduce`
- **Parent menu**: slide-in panel from right with backdrop blur, card grid mode selector, CSS toggle switch, theme selector

## Adding a New Mode
1. Create `src/modes/<name>.ts` exporting a handler function matching signature `(key?: string) => ModeResponse`
2. Add the mode name to the `Mode` type union in `src/types.ts`
3. Register it in `src/main.ts` mode dispatch + add to `MODE_LABELS`
4. Add a mode card button in `index.html` parent menu markup
5. If the mode is included in Free Play, add it to `src/modes/freeplay.ts`

## Current Modes
- **Alphabet** — letter keys → big letter + speech. Touch cycles A-Z.
- **Numbers** — 0-9 → number + counting objects. Touch counts 1-10.
- **Animals** — random animal emoji + name + sound. 20 animals.
- **Colors** — screen floods with color, name shown + spoken.
- **Shapes** — geometric shapes via CSS clip-path, name spoken, random color.
- **Music** — keys map to musical notes (C major scale), plays tone via oscillator.
- **Vehicles** — random vehicle emoji + name + engine sound.
- **Food** — random food emoji + name, matching background color.
- **Weather** — weather emoji + name, dark themed backgrounds with saturated foreground colors.
- **Emotions** — emotion emoji + name, dark themed backgrounds.
- **Body Parts** — sequential cycling through body part emojis + names, dark themed backgrounds.
- **Free Play** — random mix of all modes above.

## Languages
- English (en-US) and German (de-DE) via Web Speech API
- Language stored in localStorage, switchable via parent menu

## Conventions
- No external dependencies (keep bundle tiny)
- All sounds synthesized (no audio files)
- Touch index tracking per mode for sequential cycling
- `ModeResponse` is the universal return type from all mode handlers
- Cursor auto-hides after 3s of inactivity
- Mode badge shows in top-right on mode change, fades after 3s
