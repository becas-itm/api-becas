import React from 'react';
import { ListboxButton as BaseListboxButton } from '@reach/listbox';
import { ListboxArrow } from './ListboxArrow';

export function ListboxButton(props) {
  return <BaseListboxButton arrow={<ListboxArrow />} {...props} />;
}

ListboxArrow.propTypes = BaseListboxButton.propTypes;
