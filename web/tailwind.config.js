module.exports = {
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
      mont: ['"Montserrat"', 'sans-serif'],
    },
    colors: {
      blue: {
        50: '#E7F1FB',
        100: '#CEE4F7',
        200: '#85BBEC',
        300: '#54A0E4',
        400: '#0B77D8',
        500: '#095FAD',
        600: '#063C6C',
        700: '#043056',
      },
      red: {
        50: '#FBE7E7',
        100: '#F4A9A9',
        200: '#E36464',
        300: '#DB3030',
        400: '#B72020',
        500: '#871B1B',
        600: '#601819',
      },
      yellow: {
        50: '#FFFCF4',
        100: '#FDF3D7',
        200: '#FAE29F',
        300: '#F4CA64',
        400: '#CAA53D',
        500: '#8C6D1F',
        600: '#5C4813',
      },
      green: {
        50: '#E3FCEC',
        100: '#A8EEC1',
        200: '#74D99F',
        300: '#38C172',
        400: '#259D58',
        500: '#197741',
        600: '#155239',
      },
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
      },
      black: '#000000',
      white: '#FFFFFF',
      error: '#B00020',
      primary: '#0B77D8',
    },
    borderColor: theme => ({
      ...theme('colors'),
      default: 'rgba(0, 0, 0, 0.12)',
    }),
    boxShadow: theme => ({
      outline: `0 0 1px 1px ${theme('colors.blue.200')}`,
      sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      default: '0px 5px 10px rgba(0, 0, 0, 0.12)',
      lg: '0px 10px 20px rgba(0, 0, 0, 0.25)',
      modal:
        '0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.20)',
    }),
    fontWeight: {
      normal: 400,
      semibold: 600,
    },
    borderRadius: {
      sm: '0.25rem',
      default: '0.375rem',
      lg: '0.5rem',
      none: 0,
      full: '999px',
    },
    extend: {
      textColor: {
        current: 'currentColor',
        active: 'rgba(0, 0, 0, 0.87)',
        medium: 'rgba(0, 0, 0, 0.7)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      inset: {
        full: '100%',
      },
      backgroundColor: {
        transparent: 'transparent',
      },
    },
  },
  variants: {},
  plugins: [],
};
