import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLight: "#F8F9FA",
        secondary: "#6C757D",
        secondaryDarker: "#5F666D",
        primary: "#007BFF",
        primaryDarker: "#0063CC",
        body: "#212529",
        borderLight: "#DFDFDF",
        muted: "#6C757D",
      },
      spacing: {
        pageGutter: "225px",
        navbarHeight: "56px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
