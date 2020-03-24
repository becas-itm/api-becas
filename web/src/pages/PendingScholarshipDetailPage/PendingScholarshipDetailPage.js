import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useToggle } from 'utils/hooks';
import Spinner from 'ui/components/Spinner';
import IconButton from 'ui/components/IconButton';
import { ArrowBack, Edit } from 'ui/components/Icon';
import AdminTemplate from 'ui/templates/AdminTemplate';

import { useScholarship } from './useScholarship';
import PendingScholarship from './PendingScholarship';
import EditableScholarship from './EditableScholarship';

function PendingScholarshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scholarship, isFetching, refetch } = useScholarship(id);

  const [isEditing, toggleEdit] = useToggle();

  const handleEdit = () => {
    toggleEdit();
    refetch();
  };

  return (
    <AdminTemplate>
      <header className="flex items-center sm:hidden h-12 px-2 border-b bg-white">
        <IconButton icon={ArrowBack} onClick={() => navigate(-1)}>
          Atrás
        </IconButton>
        <h1 className="flex-1 mx-2">Convocatoria</h1>
        {!isEditing && (
          <IconButton onClick={toggleEdit} icon={Edit}>
            Editar convocatoria
          </IconButton>
        )}
      </header>

      <main
        style={{ maxWidth: 840 }}
        className="max-w-screen-md mx-auto p-4 bg-white shadow rounded sm:py-10 md:py-16 my-8"
      >
        {isFetching ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : isEditing ? (
          <EditableScholarship
            scholarship={scholarship}
            onCancel={toggleEdit}
            onEdit={handleEdit}
          />
        ) : (
          <PendingScholarship scholarship={scholarship} onEdit={toggleEdit} />
        )}
      </main>
    </AdminTemplate>
  );
}

export default PendingScholarshipDetailPage;
