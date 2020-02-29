import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

function Icon({
  title,
  auto,
  small,
  regular,
  className,
  children,
  ...restProps
}) {
  const classes = classNames(
    'inline-block fill-current',
    {
      'w-5 h-5': small,
      'w-6 h-6': regular && !auto && !small,
    },
    className,
  );

  const a11yProps = title ? { role: 'img' } : { 'aria-hidden': true };

  return (
    <svg {...a11yProps} {...restProps} className={classes}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

Icon.defaultProps = {
  title: null,
  auto: false,
  small: false,
  regular: true,
};

Icon.propTypes = {
  title: propTypes.string,
  children: propTypes.node,
  className: propTypes.string,
  auto: propTypes.bool,
  small: propTypes.bool,
  regular: propTypes.bool,
};

export default Icon;
