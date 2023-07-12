import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLight: "#F8F9FA",
        secondary: "#6C757D",
        body: "#212529",
      },
      spacing: {
        pageGutter: "225px",
      },
    },
  },
  plugins: [],
} satisfies Config;
