import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve'
  const isProd = mode === 'production'

  return {
    plugins: [react()],

    build: {
      outDir: 'dist',
      sourcemap: false,
      // Terser con compresión agresiva
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,      // elimina console.log en producción
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug', 'console.warn'],
        },
      },
      // Aviso a 1 MB (Spline es grande, lo sabemos)
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Chunks manuales: cada librería pesada va a su propio archivo
          // El navegador puede cachear cada uno de forma independiente
          manualChunks(id) {
            // Spline 3D — chunk propio porque pesa ~2 MB
            if (id.includes('@splinetool')) return 'spline'
            // Recharts + D3 — solo se usan en dashboard admin
            if (id.includes('recharts') || id.includes('d3-') || id.includes('victory')) return 'charts'
            // Framer Motion
            if (id.includes('framer-motion') || id.includes('motion')) return 'motion'
            // GSAP
            if (id.includes('gsap')) return 'gsap'
            // React core
            if (id.includes('react-dom') || id.includes('react/')) return 'react'
            // React Router
            if (id.includes('react-router')) return 'router'
            // Lucide icons
            if (id.includes('lucide-react')) return 'icons'
          },
        },
      },
    },

    // Dev server con proxy al backend local
    server: {
      host: true,
      port: 5173,
      proxy: isDev ? {
        '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/operaciones': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/vocales/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/vocales/gestos_entrenados': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/vocales/eliminar-gesto': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/abecedario/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/abecedario/gestos_entrenados': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/abecedario/eliminar-gesto': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/palabras/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/palabras/gestos_entrenados': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/palabras/eliminar-gesto': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/palabras/guardar-gesto': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/palabras/guardar_gesto': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/register': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/login': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/voz': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      } : undefined,
    },

    define: {
      __DEV__: isDev,
      __PROD__: isProd,
    },
  }
})
