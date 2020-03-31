import React from 'react';
import EntityAvatar from 'ui/components/EntityAvatar';
import { BaseField } from './BaseField';

export function EntityField({ value }) {
  return (
    <BaseField
      isMissing={!value}
      icon={() => (
        <div className="text-gray-500 mr-4">
          <EntityAvatar name={value.name} />
        </div>
      )}
      name="Publicada por"
    >
      {value && value.fullName}
    </BaseField>
  );
}
