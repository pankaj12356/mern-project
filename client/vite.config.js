import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api/auth':'http://localhost:5100',
      '/auth':'http://localhost:5100',
      '/api':'http://localhost:5100'
      
    }
  },
  plugins: [react()],
})
