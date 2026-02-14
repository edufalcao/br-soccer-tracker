import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core backgrounds
        void: { DEFAULT: '#020a06', light: '#f7faf8' },
        surface: {
          DEFAULT: '#0a1a10',
          raised: '#122a1a',
          light: '#ffffff',
          'light-muted': '#f0f5f2',
        },
        // Text
        ink: {
          DEFAULT: '#e8f5ee',
          muted: '#7a9b88',
          dark: '#0a1a10',
          'dark-muted': '#5a7a68',
        },
        // Accents
        neon: {
          DEFAULT: '#00ff87',
          dim: '#00cc6a',
        },
        gold: {
          DEFAULT: '#ffd060',
          dim: '#e8b840',
        },
        live: {
          DEFAULT: '#ff3b3b',
        },
        // Borders & dividers
        line: {
          DEFAULT: '#1a3024',
          light: '#d4e0d8',
        },
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,255,135,0.12), 0 0 3px rgba(0,255,135,0.08)',
        'glow-gold': '0 0 20px rgba(255,208,96,0.12)',
        'glow-live': '0 0 20px rgba(255,59,59,0.15)',
        glass: '0 8px 32px rgba(0,0,0,0.3)',
        'glass-light': '0 4px 24px rgba(0,0,0,0.06)',
        float: '0 12px 40px -8px rgba(0,10,6,0.4)',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
} satisfies Config
