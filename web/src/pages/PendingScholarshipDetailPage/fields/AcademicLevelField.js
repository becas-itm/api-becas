import React from 'react';
import { School } from 'ui/components/Icon';
import { getAcademicLevel } from 'utils/scholarship';
import { BaseField } from './BaseField';

export function AcademicLevelField({ value }) {
  return (
    <BaseField isMissing={!value} icon={School} name="Tipo de beca">
      {value && getAcademicLevel(value)}
    </BaseField>
  );
}
