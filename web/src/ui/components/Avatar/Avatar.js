import React from 'react';
import propTypes from 'prop-types';
import './Avatar.scss';

export function Avatar({ src, size, alt = '' }) {
  return (
    <div className="Avatar" style={{ width: size, height: size }}>
      <img src={src} alt={alt} />
    </div>
  );
}

Avatar.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string,
  size: propTypes.number,
};
