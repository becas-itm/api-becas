import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Link } from 'react-router-dom';
import { Button } from 'ui/components/Button';
import { AppLogo } from 'ui/components/AppLogo';

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

export default function LoginCard({ onLogin, isLoading, hasErrors = false }) {
  const {
    isValid,
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    validationSchema,
    isInitialValid: false,
    initialValues: { email: '', password: '' },
    onSubmit: values => onLogin(values),
  });

  React.useEffect(() => {
    if (hasErrors) {
      alert('Correo y/o contraseña no válidos');
    }
  }, [hasErrors]);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-sm pt-6 px-8 pb-8 bg-white rounded shadow-md"
    >
      <header className="flex flex-col items-center mb-6">
        <AppLogo children={null} />
        <h1 className="block text-center text-xl">Iniciar sesión — Becas</h1>
      </header>

      <label className="block mb-6">
        <span className="block text-base">Correo electrónico</span>
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          type="email"
          disabled={isLoading}
          className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent focus:border-gray-300 focus:bg-white"
          placeholder="ejemplo@itm.edu.co"
        />
        {errors.email && touched.email ? (
          <div className="pl-3 mt-1 font-semibold text-sm text-red-700">
            {errors.email}
          </div>
        ) : null}
      </label>

      <label className="block">
        <span className="block text-base">Contraseña</span>
        <input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          name="password"
          type="password"
          className="block w-full px-3 py-2 rounded bg-gray-200 border border-transparent focus:border-gray-300 focus:bg-white"
          placeholder="Contraseña"
        />
        {errors.password && touched.password ? (
          <div className="pl-3 mt-1 font-semibold text-sm text-red-700">
            {errors.password}
          </div>
        ) : null}
      </label>

      <Link
        to="#"
        className="block mt-6 mb-2 text-primary text-base text-center hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <Button
        disabled={!isValid || isLoading}
        wide
        type="submit"
        className="mt-4"
      >
        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
    </form>
  );
}
