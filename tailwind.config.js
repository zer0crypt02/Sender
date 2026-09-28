/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,vue,svelte,ts,tsx}'
  ],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effaf7',
          100: '#d7f0ea',
          200: '#aee0d5',
          300: '#78c9ba',
          400: '#45ae9d',
          500: '#21927f',
          600: '#0d9488',
          700: '#0c756c',
          800: '#0f5d57',
          900: '#124d48'
        },
        // Neutrals tinted toward the brand hue (teal), not gray/slate.
        // Pure white/black never used; every surface carries a hint of brand.
        ink: {
          50: '#f4f9f8',
          100: '#e7f0ee',
          200: '#d3e3e0',
          400: '#789c96',
          500: '#5d7d77',
          700: '#334f4a',
          900: '#122622'
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false // disables browser-specific resets
  }
}
