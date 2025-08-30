/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /^(bg|hover:bg|text|font|py|px|rounded|m|mx)-(.*)$/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
