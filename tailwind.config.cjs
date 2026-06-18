/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
  ],
  safelist: [
    {
      pattern: /(bg|text|border|ring)-(amber|red)-(50|100|300|400|500|600|700|900)/,
      variants: ['dark', 'hover', 'focus'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        dark: '#0f172a',
        card: '#1e293b',
      },
    },
  },
  plugins: [],
};
