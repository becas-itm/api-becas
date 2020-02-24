import React from 'react';
import propTypes from 'prop-types';
import { AppLogo } from 'ui/components/AppLogo';
import './AppHeader.scss';

export function AppHeader({ title, children }) {
  return (
    <header className="AppHeader">
      <div className="AppHeader__container">
        <AppLogo className="AppHeader__AppLogo">{title}</AppLogo>
        {children}
      </div>
    </header>
  );
}

AppHeader.defaultProps = { title: 'Becas' };

AppHeader.propTypes = {
  title: propTypes.string,
  children: propTypes.any,
};
