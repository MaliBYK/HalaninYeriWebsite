/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wood: '#2C1A0E',
        gold: '#D4870A',
        cream: '#F5ECD7',
        forest: '#5A7A3A',
        'wood-light': '#4A2E1A',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        heroShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        vignetteBreath: {
          '0%, 100%': { opacity: '0.88' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'hero-shift': 'heroShift 18s ease-in-out infinite',
        'vignette-breath': 'vignetteBreath 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
