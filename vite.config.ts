import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/taptap/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      selfDestroying: false,
      manifest: {
        name: 'TapTap — Toddler Learning Toy',
        short_name: 'TapTap',
        description: 'A free, fullscreen learning toy for toddlers. Tap anywhere to learn letters, numbers, animals, and more!',
        theme_color: '#0d0d0f',
        background_color: '#0d0d0f',
        display: 'fullscreen',
        orientation: 'any',
        start_url: '/taptap/',
        scope: '/taptap/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
