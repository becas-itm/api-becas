import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import * as api from 'utils/api';
import AuthTemplate from 'ui/templates/AuthTemplate';

import { ResetForm } from './ResetForm';

function resetPassword({ token, ...data }) {
  return api.put(`/api/auth/reset/${token}/`, data);
}

export default function ResetPage() {
  const { token } = useParams();
  const { data: user, isFetching, error } = useQuery(
    ['/api/auth/reset/', token],
    (url, token) => api.get(`${url}/${token}/`),
    { retry: false },
  );

  const [mutate, result] = useMutation(resetPassword);
  const handleReset = data => mutate({ ...data, token });

  return (
    <AuthTemplate title="Restablecer contraseña" isLoading={isFetching}>
      {!isFetching && error && (
        <div>
          <h1 className="text-2xl mb-4">Enlace caducado</h1>
          <p className="text-gray-700">
            Comuníquese con el administrador para la creación de un nuevo
            usuario.
          </p>
        </div>
      )}

      {user && (
        <ResetForm
          onReset={handleReset}
          user={user}
          isLoading={result.status === 'loading'}
        />
      )}
    </AuthTemplate>
  );
}
