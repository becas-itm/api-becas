import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Input from 'ui/components/Input';
import Button from 'ui/components/Button';
import { FastField } from 'ui/components/formik';

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
        onSubmit={onRecover}
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
      >
        <Form noValidate>
          <div className="block">
            <FastField label="Correo electrónico" name="email">
              <Input
                disabled={isLoading}
                type="email"
                placeholder="ejemplo@itm.edu.co"
              />
            </FastField>
          </div>

          <Button isLoading={isLoading} type="submit" className="mt-8">
            Continuar
          </Button>
        </Form>
      </Formik>
    </>
  );
}
