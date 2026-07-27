/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './views/**/*.ejs',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#01000F',
          primary: '#01000F',
          secondary: '#303181',
        },
        gold: {
          DEFAULT: '#FACC15',
          primary: '#FACC15',
          secondary: '#FFDB58',
        },
        cream: '#F7F6E4',
        surface: '#FEFEFE',
        muted: '#475467',
        borderSubtle: '#D0D5DD',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        'nav': '88px',
      },
      letterSpacing: {
        widest: '0.25em',
        kicker: '3px',
      },
      keyframes: {
        heroZoom: {
          '0%': { transform: scale(1) },
          '100%': { transform: scale(1.08) },
        },
        heroFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.2)' },
        }
      },
      animation: {
        'hero-zoom': 'heroZoom 8s ease-out forwards',
        'hero-fade-up': 'heroFadeUp 0.8s ease-out forwards',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
