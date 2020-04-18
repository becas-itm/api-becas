import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

export const COLOR = {
  blue: 'text-primary bg-blue-50 border-blue-200',
  green: 'text-green-600 bg-green-50 border-green-200',
  yellow: 'text-yellow-600 bg-yellow-100 border-yellow-300',
  red: 'text-red-500 bg-red-50 border-red-100',
  gray: 'text-gray-600 bg-gray-100 border-gray-400',
};

function Pill({ color, className, ...restProps }) {
  const styles = classNames(
    'inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full border',
    color,
    className,
  );
  return <span className={styles} {...restProps} />;
}

Pill.defaultProps = { color: COLOR.blue };

Pill.propTypes = {
  children: propTypes.string.isRequired,
  color: propTypes.oneOf(Object.values(COLOR)),
};

export default Pill;
