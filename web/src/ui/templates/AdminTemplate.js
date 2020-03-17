import React from 'react';
import AppLogo from 'ui/components/AppLogo';
import { ThreeRowTemplate } from 'ui/templates/ThreeRowTemplate';

function AdminHeader() {
  return (
    <header className="bg-white border-b">
      <div className="container h-16 flex items-center mx-auto px-4">
        <AppLogo>Admin</AppLogo>
      </div>
    </header>
  );
}

function AdminTemplate(props) {
  return <ThreeRowTemplate header={<AdminHeader />} {...props} />;
}

export default AdminTemplate;
