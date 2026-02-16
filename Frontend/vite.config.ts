import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    svgr(),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    target: "esnext",
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  optimizeDeps: {
    include: ["buffer"],
    // Force optimization of certain dependencies
    esbuildOptions: {
      target: "esnext",
    },
  },
  server: {
    port: 3000,
    open: false,
    host: true,
    // Enable CORS for API requests during development
    cors: true,
    // Improve HMR reliability
    hmr: {
      overlay: true, // Show errors as overlay
    },
    // Add custom proxy if needed for API calls
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8000",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  // Enable better error messages
  clearScreen: false,
  // Define environment variable prefix (default is VITE_)
  envPrefix: "VITE_",
  // Preview server config (for production build preview)
  preview: {
    port: 3001,
    open: false,
    host: true,
  },
});
