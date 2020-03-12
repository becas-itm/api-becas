import React from 'react';
import { Listbox as BaseListbox } from '@reach/listbox';
import { ListboxArrow } from './ListboxArrow';

export function Listbox(props) {
  return <BaseListbox arrow={<ListboxArrow />} {...props} />;
}

Listbox.propTypes = BaseListbox.propTypes;
