/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Linear-inspired dark theme
        'surface': {
          DEFAULT: '#0d0d0d',
          'raised': '#1a1a1a',
          'overlay': '#262626',
        },
        'border': {
          DEFAULT: '#333333',
          'subtle': '#262626',
        },
        'text': {
          'primary': '#ffffff',
          'secondary': '#a3a3a3',
          'tertiary': '#737373',
        },
        'accent': {
          DEFAULT: '#5e6ad2',
          'hover': '#7b83eb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
