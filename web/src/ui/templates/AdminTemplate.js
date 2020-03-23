import React from 'react';
import { useUser, useAuth } from 'reactfire';

import AppLogo from 'ui/components/AppLogo';
import UserActions from 'ui/components/UserActions';
import { ThreeRowTemplate } from 'ui/templates/ThreeRowTemplate';

function AdminTemplate(props) {
  const user = useUser();
  const auth = useAuth();
  return (
    <ThreeRowTemplate
      header={
        <header className="bg-white border-b">
          <div className="container h-16 flex items-center justify-between mx-auto px-4">
            <AppLogo>Admin</AppLogo>
            <div>
              <UserActions user={user} onLogout={() => auth.signOut()} />
            </div>
          </div>
        </header>
      }
      {...props}
    />
  );
}

export default AdminTemplate;
