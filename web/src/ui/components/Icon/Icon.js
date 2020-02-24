import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import './Icon.scss';

export const SIZE = {
  small: '-sizeSmall',
  regular: '-sizeRegular',
  auto: '-sizeAuto',
};

export function Icon({ size, title, className, children, ...props }) {
  const iconClasses = classNames('Icon', size, className);

  const a11yProps = title ? { role: 'img' } : { 'aria-hidden': true };

  return (
    <svg {...a11yProps} {...props} className={iconClasses}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

Icon.defaultProps = {
  title: null,
  size: SIZE.regular,
};

Icon.propTypes = {
  title: propTypes.string,
  children: propTypes.node,
  className: propTypes.string,
  size: propTypes.oneOf(Object.values(SIZE)),
};
