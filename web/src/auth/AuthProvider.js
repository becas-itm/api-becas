import React from 'react';
import { useMount } from 'react-use';
import { useNavigate } from 'react-router-dom';

import token from './token';
import { useRefreshToken } from './useRefreshToken';
import { LOGIN_PATH, ADMIN_PATH } from './constants';

export const AuthContext = React.createContext(null);

export default function AuthProvider({ user: initialUser, children }) {
  const navigate = useNavigate();
  const refreshCountdown = useRefreshToken();
  const [user, setUser] = React.useState(initialUser || null);

  function signOut() {
    console.log('SIGNING OUT');
    token.clean();
    refreshCountdown.stop();
    setUser(null);
    navigate(LOGIN_PATH);
  }

  function setCurrentUser({ token: accessToken, expiresIn, ...user }) {
    setUser(user);
    token.setToken(accessToken, expiresIn);
    countRefresh(expiresIn);
  }

  async function countRefresh(timeout) {
    console.log('INIT COUNTDOWN', timeout);
    const refreshedUser = await refreshCountdown.restart(timeout);

    if (refreshedUser) {
      setCurrentUser(refreshedUser);
    } else {
      signOut();
    }
  }

  useMount(() => {
    if (token.exists) {
      countRefresh(token.getExpiresIn());
    }
  });

  function signIn(user) {
    console.log('USER AUTHENTICATED');
    setCurrentUser(user);
    navigate(ADMIN_PATH);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
