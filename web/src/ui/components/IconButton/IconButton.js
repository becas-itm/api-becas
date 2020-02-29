import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

export const SHAPE = {
  rounded: 'rounded-full',
  square: 'rounded-md',
  simple:
    'text-gray-600 hover:text-gray-700 focus:text-gray-700 active:text-gray-600',
};

function IconButton({ icon: Icon, shape, children, className, ...restProps }) {
  const classes = classNames(
    'inline-flex focus:outline-none select-none p-2 duration-100 ease-in-out',
    {
      'hover:bg-gray-200 focus:bg-gray-200 text-gray-600 focus:text-gray-600 active:text-gray-700':
        shape !== SHAPE.simple,
    },
    shape,
    className,
  );
  return (
    <button {...restProps} className={classes}>
      <Icon regular />
      <span className="sr-only">{children}</span>
    </button>
  );
}

IconButton.defaultProps = {
  shape: SHAPE.rounded,
  type: 'button',
};

IconButton.propTypes = {
  icon: propTypes.elementType,
  children: propTypes.string.isRequired,
  shape: propTypes.oneOf(Object.values(SHAPE)),
};

export default IconButton;
