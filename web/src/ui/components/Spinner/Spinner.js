import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import './Spinner.css';

function Spinner({ size, className, colorAuto, style, ...restProps }) {
  const styles = classNames(
    'Spinner relative inline-block',
    colorAuto ? '-colorAuto' : '-colorPrimary',
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
  colorAuto: false,
  'data-testid': 'spinner',
};

Spinner.propTypes = {
  size: propTypes.number,
  colorAuto: propTypes.bool,
};

export default Spinner;
