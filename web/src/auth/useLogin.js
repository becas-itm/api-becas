import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export function useLogin() {
  const { signIn } = useAuth();
  const [isLoading, setLoading] = useState(false);

  const attempt = useCallback(
    credentials =>
      Promise.resolve(setLoading(true))
        .then(() => attemptLogin(credentials))
        .then(signIn)
        .catch(() => alert('Correo y/o contraseña no válidos'))
        .then(() => setLoading(false)),
    [signIn],
  );

  return { isLoading, attempt };
}

async function attemptLogin(credentials) {
  const response = await fetch('/api/auth/', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    method: 'POST',
  });

  if (response.ok) {
    return response.json();
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
