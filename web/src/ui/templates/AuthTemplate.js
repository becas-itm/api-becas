import React from 'react';

import AppLogo from 'ui/components/AppLogo';
import Spinner from 'ui/components/Spinner';
import { ThreeRowTemplate } from 'ui/templates/ThreeRowTemplate';

export default function AuthTemplate({ title, isLoading, children }) {
  return (
    <ThreeRowTemplate
      header={
        <header className="bg-white border-b">
          <div className="px-4 h-16 flex items-center max-w-md mx-auto">
            <AppLogo children={null} />
            <div className="pl-3 text-lg">{title}</div>
          </div>
        </header>
      }
    >
      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="p-8 bg-white rounded shadow">
          {isLoading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </ThreeRowTemplate>
  );
}
