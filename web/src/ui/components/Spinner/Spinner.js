import React from 'react';
import propTypes from 'prop-types';
import './Spinner.css';

function Spinner({ size, className, style, ...restProps }) {
  return (
    <div
      {...restProps}
      style={{ ...style, width: size, height: size }}
      className={`Spinner relative inline-block ${className}`}
    />
  );
}

Spinner.defaultProps = {
  size: 28,
  style: {},
  className: '',
};

Spinner.propTypes = { size: propTypes.number };

export default Spinner;
