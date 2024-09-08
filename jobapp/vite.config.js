import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true  // permet à Vite de servir sur toutes les interfaces (0.0.0.0)
  }
})
