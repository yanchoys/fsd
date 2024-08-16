import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      fontSize: {
        heading: ["2rem", "2.343rem"],
        title: ["1.5rem", "1.75rem"],
        subtitle: ["1.125rem", "1.318rem"],
      },
      boxShadow: {
        header: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        paper: " 0px 0px 12px rgba(0, 0, 0, 0.1)",
        activeButton: "inset 0px 0px 4px rgba(0, 0, 0, 0.5)",
        button: "0 4px 10px rgba(0, 0, 0, 0.25)",
        dropdown: "0px 0px 12px rgba(0, 0, 0, 0.16)",
        faded: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        cardShadow: "0px 0px 6px 2px rgba(24, 26, 32, 0.05)",
      },
      colors: {
        primary: {
          DEFAULT: "#29ABE2",
          background: "#06336C",
          border: "#084298",
          text: "#6EA8FE",
          primary100: "#D4FCFC",
          primary200: "#A9F3FC",
          primary300: "#7DE2F6",
          primary400: "#5BCCEE",
          primary500: "#29AAE1",
          primary600: "#1D85C2",
          primary700: "#0D4882",
          primary800: "#052C65",
          primary900: "#06336C",
          grey100: "#EAEAEF",
          grey200: "F7F7F7",
          grey300: "#858C93",
          grey400: "#676D73",
        },
      },
      gridTemplateColumns: {
        "24": "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-16": "span 16 / span 16",
        "span-20": "span 20 / span 20",
        "span-22": "span 22 / span 22",
        "span-24": "span 24 / span 24",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
} satisfies Config;
