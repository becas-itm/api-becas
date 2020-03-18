import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from 'ui/components/Spinner';
import './Button.scss';

export const KIND = {
  primary: '-kindPrimary',
  secondary: '-kindSecondary',
  tertiary: '-kindTertiary',
  danger: '-kindDanger',
  dangerTertiary: '-kindDangerTertiary',
};

export const Button = React.forwardRef(
  (
    {
      kind,
      wide,
      className,
      renderAs: Component,
      disabled,
      isLoading,
      ...restProps
    },
    ref,
  ) => {
    const classes = classNames(
      'Button',
      wide && '-wide',
      {
        'Button--disabled': disabled || isLoading,
        'Button--loading': isLoading,
      },
      className,
    );
    const contentClasses = classNames('Button__content', kind);
    return (
      <div className={classes}>
        <Component
          {...restProps}
          disabled={disabled || isLoading}
          className={contentClasses}
          ref={ref}
        />
        {isLoading && <Spinner size={24} white className="Button__indicator" />}
      </div>
    );
  },
);

Button.defaultProps = {
  wide: false,
  type: 'button',
  kind: KIND.primary,
  disabled: false,
  renderAs: 'button',
  isLoading: false,
};

Button.propTypes = {
  disabled: propTypes.bool,
  wide: propTypes.bool,
  kind: propTypes.oneOf(Object.values(KIND)),
  type: propTypes.oneOf(['button', 'submit', 'reset']),
  renderAs: propTypes.elementType,
  className: propTypes.string,
  isLoading: propTypes.bool,
};
