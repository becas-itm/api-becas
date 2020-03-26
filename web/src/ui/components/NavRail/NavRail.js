import React from 'react';
import './NavRail.scss';

export default function NavRail({ children }) {
  return (
    <nav className="NavRail hidden bg-white border-r pt-4">
      <ul>{children}</ul>
    </nav>
  );
}
