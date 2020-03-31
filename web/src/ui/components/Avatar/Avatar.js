import React from 'react';
import propTypes from 'prop-types';

export const SIZE = Object.freeze({
  regular: 48,
  large: 96,
  extraLarge: 128,
});

function Avatar({ size, style, className, ...restProps }) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      {...restProps}
      style={{ ...style, width: size, height: size }}
      className={`inline-block object-cover rounded-full flex-shrink-0 shadow-xs bg-white ${className}`}
    />
  );
}

Avatar.defaultProps = {
  alt: '',
  style: {},
  size: SIZE.regular,
  'data-testid': 'Avatar',
  className: '',
};

Avatar.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string,
  size: propTypes.number,
};

export default Avatar;
