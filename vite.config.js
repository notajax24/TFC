import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // <-- THIS IS THE FIX
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})