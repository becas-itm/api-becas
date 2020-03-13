import React from 'react';
import Icon from '../Icon';

export function ChevronRight(props) {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
}

ChevronRight.defaultProps = Icon.defaultProps;

ChevronRight.propTypes = Icon.propTypes;
