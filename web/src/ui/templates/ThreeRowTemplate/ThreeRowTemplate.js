import React from 'react';
import propTypes from 'prop-types';
import { AppFooter } from 'ui/components/AppFooter';
import './ThreeRowTemplate.scss';

export function ThreeRowTemplate({ header, children }) {
  return (
    <div className="ThreeRowTemplate">
      <div>{header}</div>
      <div className="ThreeRowTemplate__main">{children}</div>
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
