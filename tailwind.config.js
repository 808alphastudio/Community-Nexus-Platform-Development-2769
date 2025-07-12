/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1a365d',
        },
        secondary: {
          500: '#ff8c00',
          600: '#e67e00',
        },
        accent: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
        },
        success: '#38a169',
        danger: '#e53e3e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}