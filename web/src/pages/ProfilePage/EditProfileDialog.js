import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Input from 'ui/components/Input';
import { FastField } from 'ui/components/formik';
import Button, { COLOR } from 'ui/components/Button';
import AvatarUrlPicker from 'ui/components/AvatarUrlPicker';
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
  const { edit, isLoading } = useEditUser(user.id);
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
          photoUrl: user.photoURL,
          displayName: user.displayName || '',
        }}
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

            <div className="mb-4">
              <FastField label="Nombre" name="displayName">
                <Input disabled={isLoading} placeholder="John Doe" />
              </FastField>
            </div>

            <div className="block mb-4 opacity-50 cursor-not-allowed">
              <FastField label="Correo electrónico" name="email">
                <Input
                  readOnly
                  disabled
                  type="email"
                  defaultValue={user.email || ''}
                  className="cursor-not-allowed"
                />
              </FastField>
            </div>

            <div className="mb-4">
              <FastField label="Contraseña" name="password">
                <Input
                  disabled={isLoading}
                  type="password"
                  placeholder="Sin cambiar"
                />
              </FastField>
            </div>

            <Actions className="mt-6">
              <Button color={COLOR.secondary} disabled={isLoading} type="reset">
                Restablecer
              </Button>
              <Button isLoading={isLoading} type="submit">
                Actualizar
              </Button>
            </Actions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
