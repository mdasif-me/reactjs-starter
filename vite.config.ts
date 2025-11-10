import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), 
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@utils": path.resolve(__dirname, "./src/lib/utils"),
    },
  },
})
