import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // actualiza automáticamente el SW
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Gestión de Entregas",
        short_name: "RINPA",
        description: "Sistema de gestión de entregas",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      crypto: "node:crypto", // fuerza a Vite a usar el crypto nativo
    },
  },
  optimizeDeps: {
    force: true,
  },
});
