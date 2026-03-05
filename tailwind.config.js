/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EB4C4C', //D977A8
          dark: '#FF7070', //C45E8F
          light: '#FFA6A6' // F0A8CC
        },
        secondary: {
          DEFAULT: '#B8A9E0',
          dark: '#9B8DC8',
          light: '#D4CCF0'
        },
        accent: {
          DEFAULT: '#F5C842',
          dark: '#D4A825',
          light: '#FAE08A'
        },
        beige: {
          DEFAULT: '#FDF6F0',
          dark: '#F5E8D8',
          card: '#FEFAF7'
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          800: '#2D2D2D',
          900: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'soft-hover': '0 12px 50px rgba(217, 119, 168, 0.2)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #FDF6F0 0%, #F7E8F3 50%, #EDE4F4 100%)',
        'card-gradient': 'linear-gradient(180deg, #FEFAF7 0%, #FDF6F0 100%)'
      }
    }
  },
  plugins: []
}
