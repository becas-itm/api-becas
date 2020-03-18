import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import './Spinner.css';

function Spinner({ size, className, white, style, ...restProps }) {
  const styles = classNames(
    'Spinner relative inline-block',
    {
      'Spinner--color-white': white,
    },
    className,
  );
  return (
    <div
      {...restProps}
      style={{ ...style, width: size, height: size }}
      className={styles}
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
