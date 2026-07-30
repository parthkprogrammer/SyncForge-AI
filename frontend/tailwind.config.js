/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#edd8ff',
          200: '#d5b3ff',
          300: '#bd8eff',
          400: '#a569ff',
          500: '#8c44ff', // Central Brand Primary (Deep Violet)
          600: '#7333d9',
          700: '#5a22b3',
          800: '#41128c',
          900: '#280566',
        },
        accent: {
          50: '#fdf2ff',
          100: '#fbcfe8',
          200: '#f472b6',
          300: '#db2777',
          400: '#9d174d',
          500: '#c084fc', // AI Accent
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981', // emerald-500
          600: '#059669',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b', // amber-500
          600: '#d97706',
        },
        error: {
          50: '#fff1f2',
          500: '#f43f5e', // rose-500
          600: '#e11d48',
        },
        info: {
          50: '#f0f9ff',
          500: '#0ea5e9', // sky-500
          600: '#0284c7',
        },
      },
    },
  },
  plugins: [],
}
