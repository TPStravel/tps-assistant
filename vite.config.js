import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
=======

export default defineConfig({
  plugins: [react()],
>>>>>>> recuperar-ajustes
})