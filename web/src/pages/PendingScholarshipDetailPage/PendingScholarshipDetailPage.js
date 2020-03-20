import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Spinner from 'ui/components/Spinner';
import { ArrowBack } from 'ui/components/Icon';
import IconButton from 'ui/components/IconButton';
import AdminTemplate from 'ui/templates/AdminTemplate';

import { useScholarship } from './useScholarship';
import PendingScholarship from './PendingScholarship';

function PendingScholarshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scholarship, isFetching } = useScholarship(id);

  return (
    <AdminTemplate>
      <header className="flex items-center sm:hidden h-12 px-2 border-b bg-white">
        <IconButton icon={ArrowBack} onClick={() => navigate(-1)}>
          Atrás
        </IconButton>
        <h1 className="flex-1 mx-2">Convocatoria</h1>
      </header>

      <main
        className="max-w-screen-md mx-auto p-4 bg-white rounded sm:py-10 md:py-16 my-8"
        style={{
          maxWidth: 840,
          boxShadow:
            '0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)',
        }}
      >
        {isFetching ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <PendingScholarship scholarship={scholarship} />
        )}
      </main>
    </AdminTemplate>
  );
}

export default PendingScholarshipDetailPage;
