import React from 'react';
import propTypes from 'prop-types';

function Avatar({ src, size, alt = '', className = '' }) {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
      data-testid="Avatar"
    >
      <img
        src={src}
        alt={alt}
        className="object-cover rounded-full w-full h-full"
      />
    </div>
  );
}

Avatar.defaultProps = { size: 48 };

Avatar.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string,
  size: propTypes.number,
};

export default Avatar;
