import React from 'react';
import { FastField } from 'formik';
import Textarea from 'ui/components/Textarea';
import { BaseField } from './BaseField';

export function NameField({ value, isEditing }) {
  if (isEditing) {
    return (
      <BaseField name="Título">
        <FastField name="name" as={Textarea} />
      </BaseField>
    );
  }

  return (
    <BaseField isMissing={!value} name="Título">
      <h1 className="text-xl sm:text-2xl font-semibold">{value || null}</h1>
    </BaseField>
  );
}
