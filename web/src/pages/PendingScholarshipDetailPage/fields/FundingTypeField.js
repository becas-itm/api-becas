import React from 'react';
import { Money } from 'ui/components/Icon';
import { getFundingType } from 'utils/scholarship';
import { BaseField } from './BaseField';

export function FundingTypeField({ value }) {
  return (
    <BaseField isMissing={!value} icon={Money} name="Financiamiento">
      {value && getFundingType(value)}
    </BaseField>
  );
}
