import React from 'react';
import Icon from '../Icon';

export function ArrowRightAlt(props) {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </Icon>
  );
}

ArrowRightAlt.defaultProps = Icon.defaultProps;

ArrowRightAlt.propTypes = Icon.propTypes;
