import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';

import { put } from 'utils/api';
import Button from 'ui/components/Button';
import GenderAvatar from 'ui/components/GenderAvatar';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Ingresa como mínimo 6 carácteres')
    .max(100, 'La contraseña debe ser menor o igual a 100 carácteres')
    .required('Ingresa una contraseña'),
});

function finishRegister({ token, ...data }) {
  return put(`/api/auth/register/${token}/`, data);
}

export function RegisterCard({ user, token, onRegister }) {
  const [mutate, result] = useMutation(finishRegister);
  const isLoading = result.status === 'loading';

  const handleRegister = data => mutate(data).then(onRegister);

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
    validateOnMount: true,
    initialValues: { token, password: '' },
    onSubmit: values => handleRegister(values),
  });

  return (
    <>
      <h1 className="text-2xl mb-8">Completar registro</h1>

      <div className="flex items-start">
        <GenderAvatar gender={user.gender} className="mr-4" />
        <div>
          <h2 className="text-lg font-semibold">{user.displayName}</h2>
          <p className="text-gray-700">Usuario</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6">
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

        <Button
          disabled={!isValid}
          isLoading={isLoading}
          type="submit"
          className="mt-8"
        >
          Registrarme
        </Button>
      </form>
    </>
  );
}
