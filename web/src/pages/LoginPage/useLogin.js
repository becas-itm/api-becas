import { useReducer } from 'react';
import { useAuth } from 'reactfire';
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

  const attempt = ({ email, password }) =>
    Promise.resolve(dispatch({ type: 'ATTEMPT' }))
      .then(() => auth.signInWithEmailAndPassword(email, password))
      .then(() => dispatch({ type: 'SUCCEED' }))
      .then(() => navigate('/admin/pendientes'))
      .catch(() => dispatch({ type: 'ERROR' }));

  return { ...state, attempt };
}
