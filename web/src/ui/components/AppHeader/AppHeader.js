import React from 'react';
import propTypes from 'prop-types';
import { AppLogo } from 'ui/components/AppLogo';
import './AppHeader.scss';

export function Bar({ children }) {
  return <div className="AppHeader__searchBar">{children}</div>;
}

export function Actions({ children }) {
  return <div className="AppHeader__actions">{children}</div>;
}

export function AppHeader({ title, children }) {
  return (
    <header className="AppHeader">
      <div className="AppHeader__container">
        <AppLogo>{title}</AppLogo>
        {children}
      </div>
    </header>
  );
}

AppHeader.defaultProps = { title: 'Becas' };

AppHeader.propTypes = {
  title: propTypes.string,
  children: propTypes.node,
};
