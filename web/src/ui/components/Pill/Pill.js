import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

export const COLOR = {
  blue: 'text-primary bg-indigo-100 border-indigo-200',
  green: 'text-green-800 bg-green-100 border-green-200',
  yellow: 'text-yellow-900 bg-yellow-100 border-yellow-300',
  red: 'text-red-800 bg-red-100 border-red-200',
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
