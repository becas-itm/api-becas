import React from 'react';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { Formik, Form, FastField, ErrorMessage } from 'formik';

import { post } from 'utils/api';
import Button, { COLOR } from 'ui/components/Button';
import AvatarUrlPicker from 'ui/components/AvatarUrlPicker';
import Dialog, { Title, Actions, CloseBtn } from 'ui/components/Dialog';

const validationSchema = yup.object().shape({
  displayName: yup
    .string()
    .max(25, 'El nombre debe ser menor o igual a 25 carácteres')
    .required('Ingresa su nombre'),
  email: yup
    .string()
    .email('Correo electrónico no válido')
    .required('Ingresa su correo'),
});

function useInviteUser() {
  const [invite, result] = useMutation(data => post('/api/users/', data));
  return {
    invite,
    isLoading: result.status === 'loading',
  };
}

export function InviteUserDialog({ isOpen, onCancel, onInvite }) {
  const { invite, isLoading } = useInviteUser();
  const handleDismiss = isLoading ? () => {} : onCancel;

  const handleInvite = user => invite(user).then(onInvite);

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={handleDismiss}
      aria-labelledby="invite-user"
      className="w-full max-w-sm"
    >
      <CloseBtn onClick={handleDismiss} />

      <Title id="invite-user">Invitar usuario</Title>

      <Formik
        onSubmit={handleInvite}
        validationSchema={validationSchema}
        initialValues={{
          displayName: '',
          email: '',
          photoUrl: '',
        }}
        validateOnMount
      >
        {({ values, setFieldValue }) => (
          <Form noValidate>
            <div className="block mb-4">
              <div className="block text-base mb-1">Avatar</div>
              <AvatarUrlPicker
                url={values.photoUrl}
                onUrl={url => setFieldValue('photoUrl', url)}
              />
            </div>

            <label className="block mb-4">
              <span className="block text-base">Nombre</span>
              <FastField
                name="displayName"
                disabled={isLoading}
                className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent focus:border-gray-300 focus:bg-white"
                placeholder="John Doe"
              />
              <ErrorMessage name="displayName">
                {message => (
                  <div className="block pl-3 mt-1 font-semibold text-sm text-red-700">
                    {message}
                  </div>
                )}
              </ErrorMessage>
            </label>

            <label className="block mb-6">
              <span className="block text-base">Correo electrónico</span>
              <FastField
                name="email"
                type="email"
                disabled={isLoading}
                className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent focus:border-gray-300 focus:bg-white"
                placeholder="ejemplo@itm.edu.co"
              />
              <ErrorMessage name="email">
                {message => (
                  <div className="block pl-3 mt-1 font-semibold text-sm text-red-700">
                    {message}
                  </div>
                )}
              </ErrorMessage>
            </label>

            <Actions className="mt-6">
              <Button
                onClick={onCancel}
                color={COLOR.secondary}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button disabled={isLoading} isLoading={isLoading} type="submit">
                {isLoading ? 'Cargando...' : 'Invitar'}
              </Button>
            </Actions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
