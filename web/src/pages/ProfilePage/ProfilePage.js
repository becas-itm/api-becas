import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from 'utils/hooks';
import { useUser } from 'utils/hooks/auth';

import Avatar from 'ui/components/Avatar';
import IconButton from 'ui/components/IconButton';
import { ArrowBack, Edit } from 'ui/components/Icon';
import AdminTemplate from 'ui/templates/AdminTemplate';
import { AlternateEmail } from 'ui/components/Icon/icons/AlternateEmail';

import { EditProfileDialog } from './EditProfileDialog';

export default function ProfilePage() {
  const user = useUser();
  const navigate = useNavigate();
  const [showEdit, toggleEdit] = useToggle();

  return (
    <AdminTemplate>
      <div className="max-w-lg mx-auto px-4 pt-2 sm:mt-8">
        <div className="flex items-center mb-3 sm:mb-10">
          <IconButton onClick={() => navigate(-1)} icon={ArrowBack} large>
            Atrás
          </IconButton>
          <h1 className="flex-1 ml-3 text-lg">Perfil</h1>
          <IconButton onClick={toggleEdit} icon={Edit} large>
            Editar perfil
          </IconButton>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="w-24 h-24 sm:w-32 sm:h-32 sm:mr-16">
            <Avatar src={user.photoURL} size={null} />
          </div>

          <div className="flex flex-col items-center mt-2 sm:mt-0 text-center sm:text-left">
            <h2 className="w-full text-2xl sm:text-3xl sm:mb-2">
              {user.displayName}
            </h2>

            <div className="w-full flex items-center">
              <AlternateEmail className="flex-shrink-0 mr-1 text-gray-500" />
              <a
                href={`mailto:${user.email}`}
                className="flex-1 block text-primary text-base text-left hover:underline"
              >
                {user.email}
              </a>
            </div>
          </div>
        </div>

        <EditProfileDialog
          user={user}
          isOpen={showEdit}
          onCancel={toggleEdit}
        />
      </div>
    </AdminTemplate>
  );
}
