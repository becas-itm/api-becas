import React from 'react';
import { FastField } from 'formik';
import Textarea from 'ui/components/Textarea';
import { BaseField } from './BaseField';

export function DescriptionField({ value, isEditing = false }) {
  if (isEditing) {
    return (
      <BaseField name="Descripción">
        <FastField name="description" as={Textarea} rows="6" />
      </BaseField>
    );
  }

  return (
    <BaseField isMissing={!value} name="Descripción">
      {value || null}
    </BaseField>
  );
}
