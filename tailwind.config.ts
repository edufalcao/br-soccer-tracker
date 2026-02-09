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
          muted: '#f8fafc',
          'muted-dark': '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
} satisfies Config
