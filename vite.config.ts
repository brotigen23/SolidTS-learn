import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],

  server: {
    host: true, // or '0.0.0.0'
    port: 5173 // Default Vite port, or your preferred port
  }
})
