/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        green: "#008462",
        purple: "#421CEE",
        gray: "#637571",
      },
      fontFamily: {
        sans: ['"area-normal"', "Arial", "sans-serif"],
        display: ["Gelica", "Times New Roman", "serif"],
        plot: ["system-ui", "sans-serif"],
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
  plugins: [],
};
