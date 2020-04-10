import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Input from 'ui/components/Input';
import Button from 'ui/components/Button';
import Avatar from 'ui/components/Avatar';
import { FastField } from 'ui/components/formik';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Ingresa como mínimo 6 carácteres')
    .max(100, 'La contraseña debe ser menor o igual a 100 carácteres')
    .required('Ingresa una contraseña'),
});

export function ResetForm({ user, onReset, isLoading }) {
  return (
    <>
      <h1 className="text-2xl mb-8">Restablecer contraseña</h1>

      <div className="flex items-start">
        <Avatar
          size={48}
          src={user.photoURL}
          className="shadow-xs mr-4 flex-shrink-0"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.displayName}</h2>
          <p className="text-gray-700">Usuario</p>
        </div>
      </div>

      <Formik
        onSubmit={onReset}
        initialValues={{ password: '' }}
        validationSchema={validationSchema}
      >
        <Form noValidate className="mt-6">
          <div>
            <FastField label="Contraseña" name="password">
              <Input
                disabled={isLoading}
                type="password"
                placeholder="Contraseña"
              />
            </FastField>
          </div>

          <Button isLoading={isLoading} type="submit" className="mt-8">
            Restablecer
          </Button>
        </Form>
      </Formik>
    </>
  );
}
