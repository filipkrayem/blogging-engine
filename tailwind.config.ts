import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLight: "#F8F9FA",
        secondary: "#6C757D",
        primary: "#007BFF",
        body: "#212529",
      },
      spacing: {
        pageGutter: "225px",
        navbarHeight: "56px",
      },
    },
  },
  plugins: [],
} satisfies Config;
