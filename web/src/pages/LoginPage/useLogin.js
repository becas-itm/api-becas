import { useReducer } from 'react';
import { useAuth } from 'utils/hooks/auth';
import { useNavigate } from 'react-router-dom';

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
      return initialState;

    default:
      return initialState;
  }
}

export function useLogin() {
  const navigate = useNavigate();

  const auth = useAuth();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const attempt = credentials =>
    Promise.resolve(dispatch({ type: 'ATTEMPT' }))
      .then(() => auth.attempt(credentials))
      .then(() => dispatch({ type: 'SUCCEED' }))
      .then(() => navigate('/admin/'))
      .catch(() => dispatch({ type: 'ERROR' }));

  return { ...state, attempt };
}
