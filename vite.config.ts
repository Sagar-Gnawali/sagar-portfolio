import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      // @ts-ignore
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/apps/components"),
      "@constants": path.resolve(__dirname, "src/apps/constants"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@pages": path.resolve(__dirname, "src/apps/pages"),
    },
  },
});
