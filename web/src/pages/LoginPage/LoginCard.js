import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

import Input from 'ui/components/Input';
import Button from 'ui/components/Button';
import { AppLogo } from 'ui/components/AppLogo';
import { FastField } from 'ui/components/formik';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Correo electrónico no válido')
    .required('Ingresa tu correo'),
  password: yup
    .string()
    .min(6, 'Ingresa como mínimo 6 carácteres')
    .max(100, 'La contraseña debe ser menor o igual a 100 carácteres')
    .required('Ingresa una contraseña'),
});

function LoginCard({ onSubmit, isLoading = false }) {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={{ email: '', password: '' }}
    >
      <Form
        noValidate
        className="w-full max-w-sm pt-6 px-8 pb-8 bg-white rounded shadow"
      >
        <header className="flex flex-col items-center mb-6">
          <AppLogo children={null} />
          <h1 className="block text-center text-xl">Iniciar sesión — Becas</h1>
        </header>

        <div className="block mb-6">
          <FastField label="Correo electrónico" name="email">
            <Input
              type="email"
              placeholder="ejemplo@itm.edu.co"
              data-testid="email"
              disabled={isLoading}
            />
          </FastField>
        </div>

        <label className="block">
          <FastField name="password" label="Contraseña">
            <Input
              type="password"
              placeholder="Contraseña"
              data-testid="password"
              disabled={isLoading}
            />
          </FastField>
        </label>

        <div className="mt-6 mb-2 text-center">
          <Link
            to="/recuperar"
            className="text-primary text-base hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          wide
          isLoading={isLoading}
          type="submit"
          className="mt-4"
          data-testid="submit-button"
        >
          Iniciar sesión
        </Button>
      </Form>
    </Formik>
  );
}

export default LoginCard;
