import React from 'react';
import * as api from 'utils/api';
import { useQuery } from 'react-query';
import { useLocalStorage, useMount } from 'react-use';

export const AuthContext = React.createContext();

function useToken(value) {
  const [token, setToken] = useLocalStorage('token');
  React.useEffect(() => {
    if (value) {
      setToken(value);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    token,
    setToken,
  };
}

function verifyToken(url, token) {
  return api.get(`${url}/?token=${token}`);
}

function useAppAuth() {
  const [user, setUser] = React.useState(null);
  const { token } = useToken(user?.token || '');

  const { refetch } = useQuery(['/api/auth/verify', token], verifyToken, {
    suspense: true,
    manual: true,
  });

  useMount(() => {
    if (token) {
      refetch().then(user => setUser(user));
    }
  });

  const attempt = credentials =>
    api
      .post('/api/auth/', credentials)
      .then(res => res.json())
      .then(setUser);

  const signOut = () => setUser(null);

  return {
    user,
    setUser,
    attempt,
    signOut,
  };
}

export default function AuthProvider({ children }) {
  const auth = useAppAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
