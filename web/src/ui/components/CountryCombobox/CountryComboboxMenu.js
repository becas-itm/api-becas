import React from 'react';
import CountryFlag from 'ui/components/CountryFlag';
import { useCombobox, ComboboxMenu } from 'ui/components/Combobox';

import useCountryMatch from './useCountryMatch';

export function CountryComboboxMenu() {
  const { initialInputValue, inputValue } = useCombobox();
  const countries = useCountryMatch(initialInputValue || inputValue || '');
  return (
    <ComboboxMenu
      filter={false}
      items={countries.slice(0, 8)}
      itemToKey={country => country.code}
      RenderComboboxItem={CountryComboboxItem}
    />
  );
}

function CountryComboboxItem({ item: country, ...restProps }) {
  return (
    <li {...restProps}>
      <CountryFlag code={country.code} />
      <span className="ml-2">{country.name}</span>
    </li>
  );
}
