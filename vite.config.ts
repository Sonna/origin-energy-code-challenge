import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    // outDir: "dist/client",
    rollupOptions: {
      input: {
        client: "/src/client.tsx",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
