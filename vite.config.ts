import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  base: "/sagar-portfolio/",
  build: {
    outDir: "dist",
  },
  server: {
    fs: {
      strict: true,
    },
  },
  css: {
    postcss: {
      // @ts-ignore
      plugins: [tailwindcss()],
    },
  },
});
