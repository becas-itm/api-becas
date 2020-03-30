import React from 'react';
import * as yup from 'yup';
import { Formik, Form, FastField, ErrorMessage } from 'formik';

import Button from 'ui/components/Button';
import Avatar from 'ui/components/Avatar';

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
        validateOnMount
        onSubmit={onReset}
        initialValues={{ password: '' }}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form noValidate className="mt-6">
            <label className="block">
              <span className="block text-base">Contraseña</span>
              <FastField
                disabled={isLoading}
                name="password"
                type="password"
                className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent focus:border-gray-300 focus:bg-white"
                placeholder="Contraseña"
              />
              <ErrorMessage name="password">
                {message => (
                  <div className="pl-3 mt-1 font-semibold text-sm text-red-700">
                    {message}
                  </div>
                )}
              </ErrorMessage>
            </label>

            <Button
              disabled={!isValid}
              isLoading={isLoading}
              type="submit"
              className="mt-8"
            >
              Restablecer
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
