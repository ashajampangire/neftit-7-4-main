import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3333,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    // Ensure the font-reset.css is loaded first
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/font-reset.css";`
      }
    }
  }
});
