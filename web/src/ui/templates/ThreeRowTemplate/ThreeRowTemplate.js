import React from 'react';
import propTypes from 'prop-types';
import { AppFooter } from 'ui/components/AppFooter';
import './ThreeRowTemplate.scss';

export function ThreeRowTemplate({ header, className = '', ...restProps }) {
  return (
    <div className="ThreeRowTemplate">
      <div>{header}</div>
      <div {...restProps} className={`ThreeRowTemplate__main ${className}`} />
      <div>
        <AppFooter />
      </div>
    </div>
  );
}

ThreeRowTemplate.propTypes = {
  header: propTypes.node,
  children: propTypes.node,
};
