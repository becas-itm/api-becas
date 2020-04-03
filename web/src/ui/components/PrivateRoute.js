import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { useAuth } from 'auth/useAuth';
import { LOGIN_PATH } from 'auth/constants';

function PrivateRoute(props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  return <Route {...props} />;
}

export default PrivateRoute;
