import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import { useUser } from 'auth/index';

import Input from 'ui/components/Input';
import { FastField } from 'ui/components/formik';
import Button, { COLOR } from 'ui/components/Button';
import { Title, Actions } from 'ui/components/Dialog';
import AdminTemplate from 'ui/templates/AdminTemplate';
import GenreAvatarPicker from 'ui/components/GenreAvatarPicker';

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

export default function ProfilePage() {
  const user = useUser();
  const { edit, isLoading } = useEditUser(user.id);

  return (
    <AdminTemplate>
      <div className="w-full max-w-sm mx-auto bg-white shadow p-8 rounded mt-8">
        <Title id="edit-profile">Perfil</Title>

        <Formik
          onSubmit={edit}
          validationSchema={validationSchema}
          initialValues={{
            password: '',
            genre: user.genre || '',
            displayName: user.displayName || '',
          }}
        >
          {({ values, setFieldValue }) => (
            <Form noValidate>
              <div className="block mb-4">
                <div className="block text-base mb-1">Avatar</div>
                <GenreAvatarPicker
                  genre={values.genre}
                  onGenre={genre => setFieldValue('genre', genre)}
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
                <Button
                  color={COLOR.secondary}
                  disabled={isLoading}
                  type="reset"
                >
                  Restablecer
                </Button>
                <Button isLoading={isLoading} type="submit">
                  Actualizar
                </Button>
              </Actions>
            </Form>
          )}
        </Formik>
      </div>
    </AdminTemplate>
  );
}
