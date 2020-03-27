import React from 'react';
import { useUser, useAuth } from 'reactfire';
import { useNavigate } from 'react-router-dom';

import AppLogo from 'ui/components/AppLogo';
import AppFooter from 'ui/components/AppFooter';
import { Home, Inbox } from 'ui/components/Icon';
import UserActions from 'ui/components/UserActions';
import NavRail, { NavItem } from 'ui/components/NavRail';

import './AdminTemplate.css';

function AdminTemplate({ children, ...restProps }) {
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div className="AdminTemplate">
      <header className="bg-white border-b">
        <div className="container h-16 flex items-center justify-between mx-auto px-4">
          <AppLogo>Admin</AppLogo>
          <div>
            <UserActions user={user} onLogout={handleLogout} />
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
