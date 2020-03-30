import React from 'react';
import { useMutation } from 'react-query';

import { post } from 'utils/api';
import AuthTemplate from 'ui/templates/AuthTemplate';

import { RecoverForm } from './RecoverForm';

function sendResetEmail(data) {
  return post(`/api/auth/recover/`, data);
}

export default function RecoverPage() {
  const [mutate, result] = useMutation(sendResetEmail);
  const isLoading = result.status === 'loading';
  const handleRecover = data => mutate(data);

  return (
    <AuthTemplate title="Recuperar cuenta">
      <RecoverForm onRecover={handleRecover} isLoading={isLoading} />
    </AuthTemplate>
  );
}
