/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"Courier New"', "Courier", "monospace"],
      },
      colors: {
        ink: "var(--text)",
        muted: "var(--text-muted)",
      },
    },
  },
  plugins: [],
};
