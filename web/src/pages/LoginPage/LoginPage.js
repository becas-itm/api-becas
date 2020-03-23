import React from 'react';
import { ThreeRowTemplate } from 'ui/templates/ThreeRowTemplate';

import LoginCard from './LoginCard';
import { useLogin } from './useLogin';

export default function LoginPage() {
  const login = useLogin();
  return (
    <ThreeRowTemplate header={null}>
      <div className="flex justify-center mt-4 sm:mt-8 lg:mt-24 px-4">
        <LoginCard
          onLogin={login.attempt}
          isLoading={login.isLoading}
          hasErrors={login.hasErrors}
        />
      </div>
    </ThreeRowTemplate>
  );
}
