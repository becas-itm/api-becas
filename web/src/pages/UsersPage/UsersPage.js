import React from 'react';
import { get } from 'utils/api';
import { useQuery } from 'react-query';

import { useToggle } from 'utils/hooks';
import { Add } from 'ui/components/Icon';
import Button from 'ui/components/Button';
import GenderAvatar from 'ui/components/GenderAvatar';
import AdminTemplate from 'ui/templates/AdminTemplate';

import { InviteUserDialog } from './InviteUserDialog';

function useGetAllUsers() {
  const { data, isFetching } = useQuery('/api/users/', get);

  return {
    isFetching,
    users: data || [],
  };
}
export default function UsersPage() {
  const { users } = useGetAllUsers();
  const [isInviting, toggleInvite] = useToggle();

  return (
    <AdminTemplate className="relative">
      <div className="max-w-5xl mx-auto py-4 px-6">
        <div className="mb-4 flex flex-wrap items-end justify-between">
          <h1 className="text-xl font-semibold">Usuarios</h1>
          <Button onClick={toggleInvite} outline>
            <div className="flex flex-wrap items-center">
              Invitar <Add className="ml-2" />
            </div>
          </Button>
        </div>

        <div className="flex flex-wrap sm:justify-around md:justify-start">
          {users.map(user => (
            <div
              key={user.uid}
              className="w-full sm:w-auto mt-4 mr-4 md:mt-8 md:mr-8"
            >
              <div className="p-4 pr-6 flex flex-wrap items-start rounded shadow bg-white">
                <GenderAvatar alt={user.displayName} gender={user.gender} />
                <div className="pl-3">
                  <h3 className="text-lg font-semibold">{user.displayName}</h3>
                  <div className="text-base text-gray-700 max-w-xs overflow-hidden">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
