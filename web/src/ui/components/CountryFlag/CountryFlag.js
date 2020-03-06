import React from 'react';
import propTypes from 'prop-types';

function CountryFlag({ code, className = '', ...restProps }) {
  return (
    <img
      alt={code}
      style={{ width: 20, height: 14 }}
      {...restProps}
      className={`inline-block ${className}`}
      src={`https://restcountries.eu/data/${code.toLowerCase()}.svg`}
    />
  );
}

CountryFlag.propTypes = {
  code: propTypes.string.isRequired,
};

export default CountryFlag;
