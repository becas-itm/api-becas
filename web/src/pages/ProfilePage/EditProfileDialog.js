import React from 'react';
import * as yup from 'yup';
import { Formik, Form, FastField, ErrorMessage } from 'formik';

import { Button, KIND } from 'ui/components/Button';
import Dialog, { Title, Actions, CloseBtn } from 'ui/components/Dialog';

import { useEditUser } from './useEditUser';

const validationSchema = yup.object().shape({
  displayName: yup
    .string()
    .max(25, 'El nombre debe ser menor o igual a 25 carácteres')
    .required('Ingresa tu nombre'),
  password: yup
    .string()
    .min(6, 'Ingresa como mínimo 6 carácteres')
    .max(100, 'La contraseña debe ser menor o igual a 100 carácteres'),
});

export function EditProfileDialog({ isOpen, user, onCancel }) {
  const { edit, isLoading } = useEditUser();

  const handleDismiss = isLoading ? () => {} : onCancel;

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={handleDismiss}
      aria-labelledby="edit-profile"
      className="w-full max-w-sm"
    >
      <CloseBtn onClick={handleDismiss} />

      <Title id="edit-profile">Editar perfil</Title>

      <Formik
        onSubmit={edit}
        validationSchema={validationSchema}
        initialValues={{
          password: '',
          displayName: user.displayName || '',
        }}
        validateOnMount
      >
        {({ isValid }) => (
          <Form noValidate>
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

            <label className="block mb-4 opacity-50 cursor-not-allowed">
              <span className="block text-base">Correo electrónico</span>
              <input
                readOnly
                disabled
                name="email"
                type="email"
                defaultValue={user.email || ''}
                className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent cursor-not-allowed"
              />
            </label>

            <label className="block mb-4">
              <span className="block text-base">Contraseña</span>
              <FastField
                disabled={isLoading}
                name="password"
                type="password"
                className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent focus:border-gray-300 focus:bg-white"
                placeholder="Sin cambiar"
              />
              <ErrorMessage name="password">
                {message => (
                  <div className="block pl-3 mt-1 font-semibold text-sm text-red-700">
                    {message}
                  </div>
                )}
              </ErrorMessage>
            </label>

            <Actions className="mt-6">
              <Button kind={KIND.secondary} disabled={isLoading} type="reset">
                Restablecer
              </Button>
              <Button
                disabled={!isValid || isLoading}
                isLoading={isLoading}
                type="submit"
              >
                {isLoading ? 'Cargando...' : 'Actualizar'}
              </Button>
            </Actions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
