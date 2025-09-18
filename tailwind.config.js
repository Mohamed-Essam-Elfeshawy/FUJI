/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EC2224',
        primaryDark: '#C41E20',
        primaryLight: '#FF4A4C',
        secondary: '#1072B9',
        secondaryDark: '#0E5A8A',
        secondaryLight: '#4A9FE7',
        midnight: '#0F172A',
        // Modern brand colors
        electricBlue: '#00D4FF',
        electricBlueDark: '#00B8E6',
        midnight: '#0F172A',
        charcoal: '#1E293B',
        lightGray: '#94A3B8',
        // Brand accent colors
        brandRed: '#EC2224',
        brandBlue: '#1072B9',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        
        // Legacy colors (keeping for gradual migration)
        mainGray: '#9FB5C1',
        textGray: '#708FA0'
      },
      
      // Modern typography
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'cairo': ['Cairo', 'system-ui', 'sans-serif'],
        'tajawal': ['Tajawal', 'system-ui', 'sans-serif'],
        'arabic': ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      
      // Enhanced spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Modern shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        scrollEN: {
          '0%': { transform: 'translateX(200%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrollAR: {
          '0%': { transform: 'translateX(-250%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        scrollEN_Mobile: {
          '0%': { transform: 'translateX(200%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrollAR_Mobile: {
          '0%': { transform: 'translateX(-250%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}