import React from 'react';
import { useFormikContext } from 'formik';

import CountryFlag from 'ui/components/CountryFlag';
import { ComboboxInput, ComboboxPopover } from 'ui/components/Combobox';
import Combobox, { CountryComboboxMenu } from 'ui/components/CountryCombobox';

import { BaseField } from './BaseField';

function EditableCountryField() {
  const {
    setFieldValue,
    values: { country },
  } = useFormikContext();

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
      <Combobox
        selectedItem={country}
        onSelect={selected => {
          if (selected) {
            setFieldValue('country', selected);
          }
        }}
      >
        <ComboboxInput
          placeholder="Seleccionar"
          className="placeholder-black"
        />
        <ComboboxPopover>
          <CountryComboboxMenu />
        </ComboboxPopover>
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
