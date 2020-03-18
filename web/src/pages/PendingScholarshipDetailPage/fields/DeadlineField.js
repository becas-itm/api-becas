import React from 'react';
import { Event } from 'ui/components/Icon';
import { formatDeadline } from 'utils/scholarship';
import { BaseField } from './BaseField';

export function DeadlineField({ value }) {
  return (
    <BaseField isMissing={!value} icon={Event} name="Abierta hasta">
      {value && formatDeadline(value)}
    </BaseField>
  );
}
