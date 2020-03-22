import React from 'react';
import propTypes from 'prop-types';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import CountryFlag from 'ui/components/CountryFlag';
import { KeyboardArrowDown } from 'ui/components/Icon';
import countries from 'ui/components/CountryCombobox/countries';

import useCountryMatch from './useCountryMatch';

function CountryCombobox({ value, onSelect, ...restProps }) {
  const results = useCountryMatch(value, countries);

  return (
    <Combobox openOnFocus onSelect={onSelect} className="relative">
      <ComboboxInput
        value={value}
        placeholder="Todos"
        className="w-full placeholder-black"
        {...restProps}
      />
      <div className="absolute right-0 mr-3 inset-y-0 flex items-center pointer-events-none">
        <KeyboardArrowDown className="text-gray-700" />
      </div>
      {results && (
        <ComboboxPopover>
          {results.length > 0 ? (
            <ComboboxList>
              {results.slice(0, 7).map(country => (
                <ComboboxOption key={country.code} value={country.name}>
                  <CountryFlag code={country.code} className="mr-2" />
                  <span>{country.name}</span>
                </ComboboxOption>
              ))}
            </ComboboxList>
          ) : (
            <span className="block m-2 italic text-center">No encontrado</span>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  );
}

CountryCombobox.propTypes = { onSelect: propTypes.func };

CountryCombobox.defaultPropTypes = { onSelect: () => {} };

export default CountryCombobox;
