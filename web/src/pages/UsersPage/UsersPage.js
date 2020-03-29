import React from 'react';
import { get } from 'utils/api';
import { useQuery } from 'react-query';

import { useToggle } from 'utils/hooks';
import { Add } from 'ui/components/Icon';
import AdminTemplate from 'ui/templates/AdminTemplate';

import { InviteUserDialog } from './InviteUserDialog';
import './UsersPage.scss';

function useGetAllUsers() {
  const { data, isFetching } = useQuery('/api/users/', get);

  return {
    users: data || [],
    isFetching,
  };
}

function UserCard({ name, photoUrl }) {
  return (
    <div className="UserCard shadow w-32 h-32 md:w-40 md:h-40">
      <img
        src={photoUrl || 'http://localhost:3000/img/avatars/person.svg'}
        alt={name}
        className="absolute w-full h-full object-cover bg-white"
      />
      <div className="UserCard__content">{name}</div>
    </div>
  );
}

export default function UsersPage() {
  const { users } = useGetAllUsers();
  const [isInviting, toggleInvite] = useToggle();

  return (
    <AdminTemplate className="relative">
      <div className="p-4 max-w-3xl mx-auto sm:pt-4 lg:pt-12">
        <h1 className="text-xl md:text-3xl mb-4">Usuarios</h1>

        <div className="flex flex-wrap justify-around md:justify-start">
          {users.map(user => (
            <div key={user.uid} className="mt-4 mr-4 md:mt-8 md:mr-8">
              <UserCard name={user.displayName} photoUrl={user.photoUrl} />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 right-0">
        <div className="m-8">
          <button
            onClick={toggleInvite}
            type="submit"
            className="w-12 h-12 bg-primary text-white rounded-full shadow focus:outline-none"
          >
            <Add auto className="w-8 h-8" />
          </button>
        </div>
      </div>

      <InviteUserDialog
        isOpen={isInviting}
        onInvite={toggleInvite}
        onCancel={toggleInvite}
      />
    </AdminTemplate>
  );
}
