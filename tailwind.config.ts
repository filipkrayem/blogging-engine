import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLight: "#F8F9FA",
      },
      spacing: {
        pageGutter: "225px",
      },
    },
  },
  plugins: [],
} satisfies Config;
