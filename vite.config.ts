import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3333,

    // 👇 Add this line to allow external host access
    allowedHosts: ['y4gfpc-3333.csb.app'] // or 'all' to allow any host
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/font-reset.css";`
      }
    }
  }
});
