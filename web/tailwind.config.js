module.exports = {
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
    },
    borderColor: theme => ({
      ...theme('colors'),
      default: 'hsl(0, 0%, 88%)',
    }),
    extend: {
      colors: {
        primary: 'hsl(213, 83%, 44%)',
      },
      inset: {
        full: '100%',
      },
      textColor: {
        current: 'currentColor',
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, .12)',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
};
