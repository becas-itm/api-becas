import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

export const KIND = {
  primary: '-kindPrimary',
  secondary: '-kindSecondary',
  tertiary: '-kindTertiary',
};

export const Button = React.forwardRef(
  ({ kind, wide, className, renderAs: Component, ...restProps }, ref) => {
    const classes = classNames('Button', kind, wide && '-wide', className);
    return <Component {...restProps} className={classes} ref={ref} />;
  },
);

Button.defaultProps = {
  wide: false,
  type: 'button',
  kind: KIND.primary,
  disabled: false,
  renderAs: 'button',
};

Button.propTypes = {
  disabled: propTypes.bool,
  wide: propTypes.bool,
  kind: propTypes.oneOf(Object.values(KIND)),
  type: propTypes.oneOf(['button', 'submit', 'reset']),
  renderAs: propTypes.elementType,
  className: propTypes.string,
};
