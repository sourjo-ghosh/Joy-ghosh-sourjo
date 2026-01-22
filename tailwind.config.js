/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#0a0a0a',
        'terminal-card': '#1a1a1a',
        'terminal-text': '#e0e0e0',
        'terminal-text-secondary': '#888888',
        'terminal-green': '#00ff00',
        'terminal-red': '#ff4444',
        'terminal-success': '#00ff88',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#00ff00' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}

