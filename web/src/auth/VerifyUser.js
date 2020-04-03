import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import token from './token';
import { ADMIN_PATH } from './constants';

const HTTP_STATUS_UNAUTHORIZED = 401;

async function fetchSilentRefresh() {
  if (window.Cypress && localStorage['user']) {
    console.log('user loaded from local storage');
    return JSON.parse(localStorage['user']);
  }

  const response = await fetch('/api/auth/refresh-token/', { method: 'POST' });

  if (response.ok) {
    return response.json();
  }

  if (response.status === HTTP_STATUS_UNAUTHORIZED) {
    return null;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function VerifyUser({ children, ...restProps }) {
  const location = useLocation();
  const isPrivateRoute = location.pathname.startsWith(ADMIN_PATH);

  let { data: user } = useQuery(
    !token.exists || (token.exists && isPrivateRoute)
      ? '/api/auth/refresh-token/'
      : null,
    fetchSilentRefresh,
    {
      suspense: true,
      retry: false,
      cacheTime: 0,
    },
  );

  if (user) {
    const { token: accessToken, expiresIn, ...verifiedUser } = user;
    token.setToken(accessToken, expiresIn);
    user = verifiedUser;
  }

  return React.cloneElement(children, {
    ...restProps,
    user,
  });
}
