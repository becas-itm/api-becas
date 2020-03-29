import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from 'ui/components/Spinner';
import './Button.scss';

export const COLOR = Object.freeze({
  primary: '-colorPrimary',
  secondary: '-colorSecondary',
  danger: '-colorDanger',
});

const Button = React.forwardRef(function Button(
  {
    wide,
    color,
    shape,
    isLoading,
    className,
    disabled,
    outline,
    children,
    renderAs: Component,
    ...restProps
  },
  ref,
) {
  const classes = classNames(
    'Button -shapeSquare -sizeRegular',
    color,
    {
      '-wide': wide,
      '-outline': outline,
      '-loading': isLoading,
      '-disabled': disabled,
    },
    className,
  );
  return (
    <Component
      ref={ref}
      {...restProps}
      className={classes}
      disabled={isLoading || disabled}
    >
      <div className="Button-content">
        {isLoading && (
          <Spinner
            size={24}
            colorAuto={outline || true}
            className="Button-indicator"
            data-testid="button-indicator"
          />
        )}
        <div className="Button-label">{children}</div>
      </div>
    </Component>
  );
});

Button.defaultProps = {
  type: 'button',
  renderAs: 'button',
  wide: false,
  color: COLOR.primary,
  isLoading: false,
  disabled: false,
  outline: false,
  'data-testid': 'button',
};

Button.propTypes = {
  type: propTypes.oneOf(['button', 'submit', 'reset']),
  renderAs: propTypes.elementType,
  wide: propTypes.bool,
  color: propTypes.oneOf(Object.values(COLOR)),
  isLoading: propTypes.bool,
  disabled: propTypes.bool,
  outline: propTypes.bool,
};

export default Button;
