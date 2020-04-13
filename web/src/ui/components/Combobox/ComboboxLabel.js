import React from 'react';
import { useCombobox } from './Combobox';

export function ComboboxLabel(props) {
  const { getLabelProps } = useCombobox();
  return <label {...props} {...getLabelProps()} />;
}
