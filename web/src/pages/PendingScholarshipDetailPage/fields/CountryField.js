import React from 'react';
import { useFormikContext } from 'formik';

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
import useCountryMatch from 'ui/components/CountryCombobox/useCountryMatch';

import { BaseField } from './BaseField';

function EditableCountryField() {
  const {
    setFieldValue,
    values: { country },
  } = useFormikContext();
  const [name, setName] = React.useState(() => country.name);
  const results = useCountryMatch(name, countries);

  React.useEffect(() => void setName(country.name), [country.name]);

  const handleSelect = name =>
    setFieldValue(
      'country',
      countries.find(c => c.name === name),
    );

  const handleChange = event => setName(event.target.value);

  return (
    <BaseField
      icon={() => (
        <CountryFlag
          code={country.code || ''}
          style={{ width: 24, height: 24 }}
          className="shadow-xs rounded-full mr-3 object-cover"
        />
      )}
      name="País"
    >
      <Combobox openOnFocus onSelect={handleSelect} className="relative">
        <ComboboxInput
          value={name}
          onChange={handleChange}
          placeholder="Seleccionar"
          className="w-full placeholder-black"
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
              <span className="block m-2 italic text-center">
                No encontrado
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </BaseField>
  );
}

export function CountryField({ value, isEditing }) {
  if (isEditing) {
    return <EditableCountryField />;
  }

  const { name, code } = value || {};
  return (
    <BaseField
      isMissing={!value}
      icon={() => (
        <CountryFlag
          code={code}
          style={{ width: 24, height: 24 }}
          className="shadow-xs rounded-full mr-2 object-cover"
        />
      )}
      name="País"
    >
      {name || null}
    </BaseField>
  );
}
