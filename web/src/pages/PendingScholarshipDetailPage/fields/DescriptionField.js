import React from 'react';
import { BaseField } from './BaseField';

export function DescriptionField({ value }) {
  return (
    <BaseField isMissing={!value} name="Descripción">
      {value || null}
    </BaseField>
  );
}
