import React from 'react';
import { useUser } from 'reactfire';
import { useNavigate } from 'react-router-dom';

import { useToggle } from 'utils/hooks';
import Avatar from 'ui/components/Avatar';
import IconButton from 'ui/components/IconButton';
import { formatDeadline } from 'utils/scholarship';
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
          <Avatar
            src="/img/female.png"
            size={null}
            className="w-24 h-24 sm:w-32 sm:h-32 sm:mr-16 shadow-xs bg-white flex-shrink-0"
          />

          <div className="flex flex-col items-center mt-2 sm:mt-0 text-center sm:text-left">
            <h2 className="w-full text-2xl sm:text-3xl sm:mb-2">
              {user.displayName || 'Anónimo'}
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

        <section className="p-4 mt-5 md:mt-8 rounded-sm shadow bg-white">
          <header className="mb-2 text-gray-700">Usuario</header>
          <div>
            <span className="text-gray-700">Última conexión</span>{' '}
            <span>{formatDeadline(user.metadata.lastSignInTime)}</span>
          </div>
          <div>
            <span className="text-gray-700">Fecha de creación</span>{' '}
            <span>{formatDeadline(user.metadata.creationTime)}</span>
          </div>
        </section>

        <EditProfileDialog
          user={user}
          isOpen={showEdit}
          onCancel={toggleEdit}
        />
      </div>
    </AdminTemplate>
  );
}
