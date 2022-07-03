import { defineConfig } from "vite";
import { join } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/healthcode-joiner/",
  build: {
    outDir: "docs",
  },
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "@border-radius-base": "6px"
        },
        javascriptEnabled: true
      }
    }
  },
});
