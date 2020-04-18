import React from 'react';
import itmLogo from './itmLogo.png';

function AppLogo({ children = 'Becas' }) {
  return (
    <div className="inline-flex items-center flex-shrink-0">
      <img
        src={itmLogo}
        alt="ITM"
        title="Logo ITM"
        data-testid="AppLogo__image"
      />
      {children && (
        <>
          <div className="h-8 border-l mx-3" />
          <p className="text-xl" data-testid="AppLogo__title">
            {children}
          </p>
        </>
      )}
    </div>
  );
}

export default AppLogo;
