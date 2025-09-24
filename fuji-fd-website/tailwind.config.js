/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./*.html", "./components/*.html"],
  theme: {
    extend: {
      colors: {
        // FUJI FD Brand Colors - Official Palette
        "fuji-blue": "#146FB6",
        "fuji-blue-dark": "#054A7B",
        "fuji-blue-600": "#0A6AAA",
        "fuji-accent": "#E21E26",
        "fuji-accent-red": "#E21E26",
        "fuji-surface": "#F5F7FA",
        "fuji-bg": "#FFFFFF",
        "fuji-muted": "#6B7280",
        "fuji-text": "#111827"
      },
      fontFamily: {
        sans: ["Poppins", "Cairo", "system-ui", "sans-serif"]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15)'
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
