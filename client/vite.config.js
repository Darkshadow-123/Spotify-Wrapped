import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // existing api proxy
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // proxy auth endpoints to backend so client can call /refresh_token, /login, /callback
      '^/refresh_token': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/refresh_token/, '/refresh_token'),
      },
      '^/login': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, '/login'),
      },
      '^/callback': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/callback/, '/callback'),
      },
    }
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'esbuild'
  },
  define: {
    'process.env': JSON.stringify(process.env)
  }
})
