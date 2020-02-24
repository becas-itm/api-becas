import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import VisuallyHidden from '@reach/visually-hidden';
import { SIZE as IconSize } from 'ui/components/Icon';
import './IconButton.scss';

export const SHAPE = {
  rounded: '-shapeRounded',
  square: '-shapeSquare',
  simple: '-shapeSimple',
};

export const SIZE = {
  compact: '-sizeCompact',
  regular: '-sizeRegular',
};

export function IconButton({
  shape,
  size,
  icon: Icon,
  children,
  className,
  ...restProps
}) {
  const classes = classNames('IconButton', shape, size, className);
  return (
    <button {...restProps} className={classes}>
      <Icon size={IconSize.regular} />
      <VisuallyHidden>{children}</VisuallyHidden>
    </button>
  );
}

IconButton.defaultProps = {
  shape: SHAPE.rounded,
  size: SIZE.regular,
  type: 'button',
};

IconButton.propTypes = {
  shape: propTypes.oneOf(Object.values(SHAPE)),
  size: propTypes.oneOf(Object.values(SIZE)),
  className: propTypes.string,
  icon: propTypes.elementType.isRequired,
  children: propTypes.string.isRequired,
  type: propTypes.oneOf(['button', 'submit', 'reset']),
};
