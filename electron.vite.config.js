import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export default defineConfig({
  publicDir: false,
  main: {},
  preload: {},
  renderer: {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src/renderer/src'),
      }
    }
  }
});
