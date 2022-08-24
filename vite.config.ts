import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import webExtension from "vite-plugin-web-extension";

function root(...paths: string[]): string {
  return path.resolve(__dirname, ...paths);
}

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  build: {
    outDir: root("dist"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    webExtension({
      manifest: path.resolve(__dirname, "src/manifest.json"),
      assets: "assets",
    }),
  ]
})
