// vite.config.js o vite.config.cjs

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 1. Importar

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. Añadir el plugin con su configuración
    VitePWA({
      registerType: 'autoUpdate', // La PWA se actualizará automáticamente
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Opcional: otros assets a cachear
      manifest: {
        name: 'Futbol Stats Admin',
        short_name: 'FS Admin',
        description: 'App para registrar estadísticas de partidos de fútbol.',
        theme_color: '#2d3748', // Un color gris oscuro para la barra de estado del móvil
        background_color: '#1a202c', // Color de fondo para la pantalla de carga
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png', // La ruta es relativa a la carpeta 'public'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          // Opcional: Un ícono "maskable" para una mejor integración en Android
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})