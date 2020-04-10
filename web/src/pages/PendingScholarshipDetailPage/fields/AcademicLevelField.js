import React from 'react';
import { FastField } from 'formik';
import { School } from 'ui/components/Icon';
import { Listbox, ListboxOption } from 'ui/components/Listbox';
import { getAcademicLevel } from 'utils/scholarship';
import { BaseField } from './BaseField';

const LEVELS = [
  { label: 'Seleccionar', value: '*' },
  { label: 'Pregrado', value: 'UNDERGRADUATE' },
  { label: 'Posgrado', value: 'POSTGRADUATE' },
  { label: 'Pregrado y posgrado', value: 'BOTH' },
  { label: 'Otros', value: 'OTHERS' },
];

export function AcademicLevelField({ value, isEditing }) {
  if (isEditing) {
    return (
      <BaseField icon={School} name="Tipo de beca">
        <FastField
          component={({ field, form }) => (
            <Listbox
              value={field.value.academicLevel}
              onChange={item => form.setFieldValue('academicLevel', item)}
            >
              {LEVELS.map(level => (
                <ListboxOption key={level.value} value={level.value}>
                  {level.label}
                </ListboxOption>
              ))}
            </Listbox>
          )}
        />
      </BaseField>
    );
  }

  return (
    <BaseField isMissing={!value} icon={School} name="Tipo de beca">
      {value && getAcademicLevel(value)}
    </BaseField>
  );
}
