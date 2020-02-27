import React from 'react';
import { Link } from 'react-router-dom';
import { Button, KIND } from 'ui/components/Button';

export function LinkButton(props) {
  return <Button renderAs={Link} kind={KIND.tertiary} {...props} />;
}
