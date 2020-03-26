import React from 'react';
import { useUser, useAuth } from 'reactfire';

import AppLogo from 'ui/components/AppLogo';
import AppFooter from 'ui/components/AppFooter';
import UserActions from 'ui/components/UserActions';
import NavRail, { NavItem } from 'ui/components/NavRail';

import './AdminTemplate.css';
import { Home, Inbox } from 'ui/components/Icon';

function AdminTemplate({ children, ...restProps }) {
  const user = useUser();
  const auth = useAuth();

  return (
    <div className="AdminTemplate">
      <header className="bg-white border-b">
        <div className="container h-16 flex items-center justify-between mx-auto px-4">
          <AppLogo>Admin</AppLogo>
          <div>
            <UserActions user={user} onLogout={() => auth.signOut()} />
          </div>
        </div>
      </header>

      <NavRail>
        <NavItem to="/admin" icon={Home}>
          Inicio
        </NavItem>
        <NavItem to="/admin/pendientes" icon={Inbox}>
          Becas
        </NavItem>
      </NavRail>

      <div {...restProps}>{children}</div>

      <AppFooter />
    </div>
  );
}

export default AdminTemplate;
