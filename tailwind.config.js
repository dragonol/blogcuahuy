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
      'title': ['Kollektif', 'Be Vietnam Pro']
    }
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
