import React from 'react';
import { Link } from 'react-router-dom';
import { ExitToApp } from 'ui/components/Icon';

export default function UserActions({ user, onLogout }) {
  return (
    <div className="flex items-center">
      <Link to="/admin/perfil" className="hover:underline">
        {user.displayName || 'Anónimo'}
      </Link>
      <span className="text-sm text-gray-400 ml-2 select-none">|</span>
      <button
        onClick={onLogout}
        type="button"
        className="ml-2 px-2 flex items-center py-1 rounded cursor-pointer hover:bg-gray-200"
      >
        Salir
        <ExitToApp className="ml-1" />
      </button>
    </div>
  );
}
