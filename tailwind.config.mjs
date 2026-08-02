/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A192F',
          dark: '#07101E',
          light: '#172A45',
        },
        flame: {
          DEFAULT: '#E53E3E',
          hover: '#C53030',
          bright: '#F56565',
        },
        clean: {
          DEFAULT: '#F7FAFC',
          dark: '#EDF2F7',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
