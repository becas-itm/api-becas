import React from 'react';
import propTypes from 'prop-types';
import itmLogo from './itmLogo.png';

function AppLogo({ children }) {
  return (
    <div className="inline-flex items-center" data-testid="AppLogo">
      <img
        src={itmLogo}
        alt="ITM"
        title="Logo ITM"
        className="h-12 sm:h-auto"
        style={{ maxHeight: 60 }}
      />
      {children && (
        <span className="flex items-center h-8 sm:h-10 pl-3 ml-3 text-xl border-l">
          {children}
        </span>
      )}
    </div>
  );
}

AppLogo.defaultProps = { children: 'Becas' };

AppLogo.propTypes = { children: propTypes.string };

export default AppLogo;
