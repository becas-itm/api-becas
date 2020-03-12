import React from 'react';
import { ListboxPopover as BaseListboxPopover } from '@reach/listbox';

export function ListboxPopover(props) {
  return <BaseListboxPopover portal={false} {...props} />;
}

ListboxPopover.propTypes = BaseListboxPopover.propTypes;
