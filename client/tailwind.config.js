/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        platinum: '#E5E4E2',
        background: {
          light: '#FFFFFF', // Beyaz
          dark: '#000000',  // Tam Siyah
        },
        text: {
          light: '#1f2937',
          dark: '#f3f4f6',
        },
        primary: {
          light: '#fbbf24',
          dark: '#E5E4E2',
        },
        card: {
          light: '#f3f4f6', // Zarif ve açık Gri (gray-100)
          dark: '#2a2a2a',  // Koyu Gri
        }
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}