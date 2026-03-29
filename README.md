# TapTap

**A free, fullscreen learning toy for toddlers.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://lukas-grigis.github.io/taptap/)

Kids smash keys, tap the screen, or click — and get big, colorful, educational responses with voice and sound effects. No ads, no tracking, no sign-up. Just learning through play.

<!-- screenshot -->

## Learning Modes

| Emoji | Mode | Description |
|-------|------|-------------|
| 🔤 | **Alphabet** | Letter keys show big letters + spoken name. Touch cycles A–Z. |
| 🔢 | **Numbers** | 0–9 keys show numbers + counting objects. Touch counts 1–10. |
| 🐾 | **Animals** | Random animal emoji + name + animal sound. 20 animals. |
| 🎨 | **Colors** | Screen floods with color, name shown + spoken. |
| 🔷 | **Shapes** | Geometric shapes via CSS, name spoken, random color. |
| 🎵 | **Music** | Keys map to musical notes (C major scale), plays tones. |
| 🚗 | **Vehicles** | Random vehicle emoji + name + engine sound. |
| 🍎 | **Food** | Random food emoji + name, matching background color. |
| 🌤️ | **Weather** | Weather emoji + name on themed backgrounds. |
| 😊 | **Emotions** | Emotion emoji + name on themed backgrounds. |
| 🤚 | **Body Parts** | Sequential body part emojis + names. |
| 🎲 | **Free Play** | Random mix of all modes above. |

## Features

- **Multi-input** — keyboard, touch, and mouse all work
- **Voice + sound** — letters, numbers, and names spoken aloud (Web Speech API); fun synth effects (Web Audio API)
- **Particle effects** — colorful canvas-based bursts on every interaction
- **3 themes** — dark (default), light, and high-contrast
- **2 languages** — English and German via Web Speech API
- **Toddler-safe** — fullscreen mode, blocked navigation keys, no ads, no tracking
- **Offline-capable** — works without an internet connection after first load
- **PWA-ready** — installable on mobile home screens
- **Zero dependencies** — no runtime deps, tiny bundle

## Tech Stack

- **Vanilla TypeScript** — no frameworks
- **Vite** — build tool
- **Web Speech API** — text-to-speech
- **Web Audio API** — synthesized sound effects
- **CSS animations + Canvas** — particles, transitions, glow effects
- **Zero runtime dependencies**

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
```

## Deployment

**GitHub Pages** — deployed automatically via the included GitHub Actions workflow on push to `main`.

Or deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

## How It Works

1. **Landing screen** — tap anywhere to enter fullscreen and start playing
2. **Input** — press keys, tap the screen, or click to trigger the current mode
3. **Parent menu** — press and hold the top-left corner for 2 seconds to open settings (mode, sound, theme, language)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
