import React from 'react';
import { useAuth } from 'utils/hooks/auth';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ path, ...restProps }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate key={path} to="/login" replace state={{ from: path }} />;
  }

  return <Route key={`Route-${path}`} path={path} {...restProps} />;
}

export default PrivateRoute;
