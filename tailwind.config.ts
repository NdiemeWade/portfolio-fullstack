import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chic: {
          50: '#FAF9F6',
          100: '#F5F3EF',
          200: '#E6E2D8',
          300: '#D1C9B8',
          400: '#B8A990',
          500: '#9E8B70',
          600: '#7A6B52',
          700: '#524837',
          800: '#2C271E',
          900: '#1A1712',
        },
      },
    },
  },
  plugins: [],
}

export default config