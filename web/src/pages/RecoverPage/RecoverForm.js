import React from 'react';
import * as yup from 'yup';
import { Formik, Form, FastField, ErrorMessage } from 'formik';

import Button from 'ui/components/Button';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Correo electrónico no válido')
    .required('Ingresa tu correo'),
});

export function RecoverForm({ onRecover, isLoading }) {
  return (
    <>
      <h1 className="text-2xl mb-8">Recuperar cuenta</h1>
      <Formik
        validateOnMount
        onSubmit={onRecover}
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form noValidate>
            <label className="block">
              <span className="block text-base">Correo electrónico</span>
              <FastField
                disabled={isLoading}
                name="email"
                type="email"
                className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent focus:border-gray-300 focus:bg-white"
                placeholder="ejemplo@itm.edu.co"
              />
              <ErrorMessage name="email">
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
              Continuar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
