import React from 'react';
import CountryFlag from 'ui/components/CountryFlag';
import { BaseField } from './BaseField';

export function CountryField({ value }) {
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
