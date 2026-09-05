/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        defense: {
          950: '#070a0f', // Base background: deep near-black charcoal
          900: '#0b1019', // Primary panel surface
          850: '#0f1623', // Elevated surface / table headers
          800: '#141d2e', // Hover state & active panel fills
          750: '#1a253a', // Secondary surfaces
          700: '#22304b', // Borders & divider lines
          600: '#2d3f62',
          500: '#3d5380',
        },
        cyber: {
          cyan: '#0284c7', // Disciplined defense cyan/sky (not neon)
          cyanMuted: '#0369a1',
          amber: '#d97706', // Restrained amber
          red: '#dc2626', // Restrained alert red
          emerald: '#059669', // Restrained operational green
          blue: '#2563eb',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      }
    },
  },
  plugins: [],
}
