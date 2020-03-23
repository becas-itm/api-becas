import React from 'react';
import { ExitToApp } from 'ui/components/Icon';

export default function UserActions({ user, onLogout }) {
  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center">
      <button
        onClick={onLogout}
        type="button"
        className="ml-2 px-2 flex items-center py-1 rounded cursor-pointer text-gray-800 hover:bg-gray-200"
      >
        Salir
        <ExitToApp className="ml-1 text-gray-700" />
      </button>
    </div>
  );
}
