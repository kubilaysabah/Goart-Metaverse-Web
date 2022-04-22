module.exports = {
  content: [
    "./src/**/**/**/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        'layout': '1fr auto',
      },
      colors: {
        purple: {
          400: "#6B46AF",
          500: "#38197A",
          600: "#2B1268",
          700: "#1F0C57",
          800: "#38197A",
          900: "#2B1268"
        },
        gray: {
          50: "#F8F8FA",
          100: "#F8F8FA",
          200: "#E6E7E9",
          300: "#D6D6D8",
          500: "#919294",
          600: "#696A6B",
          700: "#565758",
          800: "#38383A",
          900: "#181819",
        }
      },
      spacing: {
        3: "0.813rem",
        4: "1.063rem"
      },
      backgroundImage: {
        "countdown": 'url("https://via.placeholder.com/1920x1080")',
        "countdown-time": "linear-gradient(90deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.1) 100%)",
        "primary-gradient": "linear-gradient(90deg, rgba(43,18,104,1) 0%, rgba(56,25,122,1) 100%)",
        "select": 'url("/select.svg")'
      },
      backgroundPosition: {
        "top-right-70": "top 70px right",
        "center-right-20": "center right 20px"
      },
      fontFamily: {
        "inter": ['"Inter"', "sans-serif"],
        "nexa": ['"Nexa"']
      },
      keyframes: {
        scroll: {
          '0%, 100%': { top: '0' },
          '50%': { top: '70%' },
        }
      },
      animation: {
        'scroll': 'scroll 2s linear infinite',
      }
    }
  },
  plugins: [],
}