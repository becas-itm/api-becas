import React from 'react';
import { FastField } from 'formik';
import { Money } from 'ui/components/Icon';
import { Listbox, ListboxOption } from 'ui/components/Listbox';
import { getFundingType } from 'utils/scholarship';
import { BaseField } from './BaseField';

const TYPES = [
  { label: 'Seleccionar', value: '*' },
  { label: 'Total', value: 'COMPLETE' },
  { label: 'Parcial', value: 'PARTIAL' },
];

export function FundingTypeField({ value, isEditing }) {
  if (isEditing) {
    return (
      <BaseField icon={Money} name="Financiamiento">
        <FastField
          component={({ field, form }) => (
            <Listbox
              value={field.value.fundingType}
              onChange={item => form.setFieldValue('fundingType', item)}
            >
              {TYPES.map(type => (
                <ListboxOption key={type.value} value={type.value}>
                  {type.label}
                </ListboxOption>
              ))}
            </Listbox>
          )}
        />
      </BaseField>
    );
  }

  return (
    <BaseField isMissing={!value} icon={Money} name="Financiamiento">
      {value && getFundingType(value)}
    </BaseField>
  );
}
