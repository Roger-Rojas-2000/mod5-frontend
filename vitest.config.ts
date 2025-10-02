import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  test: {
    globals: true, // para usar describe, it, expect sin importar
    environment: "jsdom", // necesario para testear React (DOM virtual)
    setupFiles: "./src/setupTests.ts", // archivo para configurar jest-dom o msw
    css: true, // permite importar CSS en tests
  },
});
