import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ command }) => {
  const config = {
    server: {
      port:5160
    },
    plugins: [react()],
    base: '/',
    build: {
      target: ["es2019","chrome70"]
    }
  }

  if (command !== 'serve') {
    config.base = 'https://toops61.github.io/planets/'
  }

  return config
})
