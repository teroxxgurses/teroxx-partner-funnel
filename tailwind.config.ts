import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#02051A",
        indigo: "#07143A",
        electric: "#0EA5C6",
        sand: "#D8D0BE",
        ember: "#E46F45",
        gold: "#D8D0BE"
      }
    }
  },
  plugins: []
};

export default config;
