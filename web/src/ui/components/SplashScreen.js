import React from 'react';
import Spinner from 'ui/components/Spinner';
import AppLogo from 'ui/components/AppLogo';

function SplashScreen() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <AppLogo />
      <Spinner className="mt-4" />
    </div>
  );
}

export default SplashScreen;
