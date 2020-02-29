import React from 'react';
import propTypes from 'prop-types';
import { AppFooter } from 'ui/components/AppFooter';

export function ThreeRowTemplate({ header, className = '', ...restProps }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div>{header}</div>
      <div {...restProps} className={`h-full flex-1 ${className}`} />
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
