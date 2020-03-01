import React from 'react';
import Avatar from 'ui/components/Avatar';

export default function EntityAvatar({ spiderName, ...restProps }) {
  const url = `/img/entities/${spiderName}.jpg`;
  return <Avatar {...restProps} src={url} />;
}
