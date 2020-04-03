import { useReducer } from 'react';
import { useAuth } from './useAuth';

const initialState = {
  hasErrors: false,
  isLoading: false,
};

function authReducer(_, action) {
  switch (action.type) {
    case 'ERROR':
      return { hasErrors: true, isLoading: false };

    case 'ATTEMPT':
      return { hasErrors: false, isLoading: true };

    case 'SUCCEED':
    default:
      return initialState;
  }
}

export function useLogin() {
  const { signIn } = useAuth();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const attempt = credentials =>
    Promise.resolve(dispatch({ type: 'ATTEMPT' }))
      .then(() => attemptLogin(credentials))
      .then(user => {
        dispatch({ type: 'SUCCEED' });
        signIn(user);
      })
      .catch(() => dispatch({ type: 'ERROR' }));

  return { ...state, attempt };
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
