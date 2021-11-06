module.exports = {
  important: true,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s infinite'
      },
      height: {
        'article-section': '30rem'
      },
      maxHeight: {
        'article-section': '30rem'
      }
    },
    fontFamily: {
      'normal': ['JetBrains Mono'],
      'title': ['Kollektif']
    }
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
