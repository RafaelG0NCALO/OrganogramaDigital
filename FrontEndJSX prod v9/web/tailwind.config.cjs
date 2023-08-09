/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 1.5s ease-in-out",
        slideSide: "slideSide 1s ease-in-out",
        sideBlur: "sideBlur 1s ease-in-out",
        sideBlur2: "sideBlur 3s",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(-100%)" },
          "75%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideSide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        sideBlur: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        sideBlur2: {
          "0%": { transform: "translateX(-10%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      backgroundColor: {
        darkFundo: "#252525",
        ligthFundo: "#f5f5f5",
        DarkCard: "#2a2a2a",
        ligthCard: "#ffffff",
        darkButton: "#3e3e3e",
        ligthButton: "#f2f2f2",
      },
      textColor: {
        darkColor: "#f5f5f5",
        ligthColor: "#252525",
        darkLink: "#4c8bff",
        ligthLink: "#0066cc",
      },
    },
  },
  plugins: [],
  variants: {},
};
