/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: '#F2245F',       // Main primary color
        secondary: '#FBB03B',     // Secondary accent
        accent: '#F52B62',        // Accent color
        navy: '#01576E',          // Navigation/header color
        white: '#FFFFFF',         // Pure white

        // Extended palette variants
        'primary-dark': '#D11A4F',
        'primary-light': '#FF3A75',
        'secondary-dark': '#E89E2A',
        'secondary-light': '#FFC966',
        'navy-dark': '#013A47',
        'navy-light': '#017489',
        'accent-dark': '#E01850', // <-- Added for hover:bg-accent-dark

        // Neutrals
        neutral: {
          DEFAULT: '#FAF9F6',     // Soft Off-White
          dark: '#333333',        // Dark Gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      // Optional gradient configurations
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #F2245F 0%, #F52B62 100%)',
        'navy-gradient': 'linear-gradient(to right, #01576E 0%, #013A47 100%)',
      },
    },
  },
  plugins: [],
};
