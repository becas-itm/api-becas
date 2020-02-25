import React from 'react';
import propTypes from 'prop-types';
import './Checkbox.scss';

export function Checkbox({ className, children, ...restProps }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={`Checkbox ${className || ''}`}>
      <input
        {...restProps}
        type="checkbox"
        className="Checkbox__input a-visuallyHidden"
      />
      <div className="Checkbox__checkMark" />
      {children && <span className="Checkbox__label">{children}</span>}
    </label>
  );
}

Checkbox.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
};
