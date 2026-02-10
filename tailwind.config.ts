import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        pitch: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        accent: {
          DEFAULT: '#eab308',
          dark: '#ca8a04',
          light: '#facc15',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0f172a',
          muted: '#f4f7f2',
          'muted-dark': '#1e293b',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(20, 83, 45, 0.08), 0 1px 2px -1px rgba(20, 83, 45, 0.08)',
        'card-hover': '0 10px 25px -5px rgba(20, 83, 45, 0.12), 0 8px 10px -6px rgba(20, 83, 45, 0.06)',
        editorial: '0 20px 40px -12px rgba(5, 46, 22, 0.2)',
      },
    },
  },
} satisfies Config
