import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // FBL brand — from the main flyer
        brand: {
          red: "#ed1d26", // primary action
          redLight: "#ff4d54",
          redDark: "#c8121a",
          blue: "#29689a", // secondary action
          blueLight: "#4a8ec4",
          blueDark: "#1d4d74",
          navy: "#101c2e", // dark authority panels
          navyLight: "#1a2c47",
          steel: "#243a5a",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(135deg, #ed1d26 0%, #ff4d54 100%)",
        "blue-gradient": "linear-gradient(135deg, #1d4d74 0%, #29689a 55%, #4a8ec4 100%)",
        "navy-gradient": "linear-gradient(160deg, #101c2e 0%, #1a2c47 60%, #243a5a 100%)",
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(16, 28, 46, 0.25)",
        "card-red": "0 12px 40px -12px rgba(237, 29, 38, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
