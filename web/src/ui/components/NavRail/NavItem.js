import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export function NavItem({ icon: Icon, to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className="NavRail-Item flex flex-col items-center justify-center text-center"
        activeClassName="-active"
      >
        <Icon regular />
        <div className="NavRail-Item__label">{children}</div>
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  children: propTypes.string.isRequired,
  icon: propTypes.elementType.isRequired,
};
