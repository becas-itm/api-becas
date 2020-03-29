import React from 'react';
import { Link } from 'react-router-dom';
import Button, { COLOR } from 'ui/components/Button';

export { COLOR };

export default function LinkButton(props) {
  return <Button {...props} />;
}

LinkButton.propTypes = Button.propTypes;

LinkButton.defaultProps = {
  ...Button.defaultProps,
  outline: true,
  renderAs: Link,
  'data-testid': 'link-button',
};
