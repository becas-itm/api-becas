import React from 'react';
import { FastField } from 'formik';

import { Event } from 'ui/components/Icon';
import { formatDeadline } from 'utils/scholarship';

import { BaseField } from './BaseField';

export function DeadlineField({ value, isEditing }) {
  if (isEditing) {
    return (
      <BaseField icon={Event} name="Abierta hasta">
        <FastField
          name="deadline"
          component={({ field }) => (
            <input
              {...field}
              type="date"
              className="w-full px-3 py-2 rounded bg-gray-200"
            />
          )}
        />
      </BaseField>
    );
  }
  return (
    <BaseField isMissing={!value} icon={Event} name="Abierta hasta">
      {value && formatDeadline(value)}
    </BaseField>
  );
}
