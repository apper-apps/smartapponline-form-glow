/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#5856eb',
          700: '#4f46e5',
          800: '#4338ca',
          900: '#3730a3',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: {
          500: '#ec4899',
          600: '#db2777',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
        'gradient-card': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}