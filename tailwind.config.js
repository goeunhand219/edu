/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        magic: {
          'bg-deep': '#1E1B4B',
          'bg-mid': '#312E81',
          'bg-light': '#4C1D95',
          gold: '#FBBF24',
          cyan: '#22D3EE',
          magenta: '#EC4899',
          'magenta-deep': '#DB2777',
          water: '#38BDF8',
          fire: '#F97316',
          electric: '#FACC15',
          earth: '#84CC16',
          wind: '#C084FC',
          cream: '#FEF3C7',
        },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '"Nanum Gothic"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        label: ['14px', { lineHeight: '1.4' }],
        body: ['16px', { lineHeight: '1.6' }],
        heading: ['24px', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        display: ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      borderRadius: { card: '16px', button: '24px' },
      boxShadow: {
        'coin-selected': '0 0 0 3px #FBBF24, 0 0 24px rgba(251, 191, 36, 0.6)',
        'cta-hover': '0 8px 24px rgba(236, 72, 153, 0.5)',
        'focus-ring': '0 0 0 3px #22D3EE',
      },
      backgroundImage: {
        'magic-bg': 'linear-gradient(180deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%)',
        'coin-gold': 'linear-gradient(135deg, #FCD34D 0%, #FBBF24 50%, #B45309 100%)',
        'cta-magenta': 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
      },
      animation: {
        float: 'float 2s ease-in-out infinite alternate',
        'coin-spin': 'coinSpin 1.5s linear infinite',
        'sparkle-up': 'sparkleUp 10s linear infinite',
        'fade-in': 'fadeIn 300ms ease-out',
      },
      keyframes: {
        float: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-2px)' } },
        coinSpin: { '0%': { transform: 'rotateY(0deg)' }, '100%': { transform: 'rotateY(360deg)' } },
        sparkleUp: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
