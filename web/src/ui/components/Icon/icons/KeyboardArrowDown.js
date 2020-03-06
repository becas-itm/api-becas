import React from 'react';
import Icon from '../Icon';

export function KeyboardArrowDown(props) {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      <path d="M0 0h24v24H0V0z" fill="none" />
    </Icon>
  );
}

KeyboardArrowDown.defaultProps = Icon.defaultProps;

KeyboardArrowDown.propTypes = Icon.propTypes;
