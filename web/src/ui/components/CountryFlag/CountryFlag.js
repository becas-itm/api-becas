import React from 'react';
import propTypes from 'prop-types';

function getStyle(code) {
  code = code.toLowerCase();

  if (code === 'onl' || code === 'oth') {
    return {
      src: '/img/svgs/world.svg',
      style: { width: 20, height: 20 },
    };
  }

  return {
    style: { width: 20, height: 14 },
    src: `https://restcountries.eu/data/${code}.svg`,
  };
}

function CountryFlag({ code, className = '', ...restProps }) {
  return (
    <img
      alt={code}
      {...getStyle(code)}
      {...restProps}
      className={`inline-block ${className}`}
    />
  );
}

CountryFlag.propTypes = {
  code: propTypes.string.isRequired,
};

export default CountryFlag;
