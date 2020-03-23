import React from 'react';
import { AuthCheck } from 'reactfire';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ path, ...restProps }) {
  return (
    <AuthCheck
      key={path}
      fallback={<Navigate to="/login" replace state={{ from: path }} />}
    >
      <Route key={`Route-${path}`} path={path} {...restProps} />
    </AuthCheck>
  );
}

export default PrivateRoute;
