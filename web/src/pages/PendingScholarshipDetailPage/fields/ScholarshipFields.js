import React from 'react';

import { NameField } from './NameField';
import { EntityField } from './EntityField';
import { CountryField } from './CountryField';
import { DeadlineField } from './DeadlineField';
import { DescriptionField } from './DescriptionField';
import { FundingTypeField } from './FundingTypeField';
import { AcademicLevelField } from './AcademicLevelField';

export default function ScholarshipFields({ fields }) {
  return (
    <>
      <div className="mb-2">
        <NameField value={fields.name} />
      </div>

      <DescriptionField value={fields.description} />

      <div className="pl-8 mt-6">
        <DeadlineField value={fields.deadline} />

        <div className="mt-4">
          <AcademicLevelField value={fields.academicLevel} />
        </div>

        <div className="mt-4">
          <FundingTypeField value={fields.fundingType} />
        </div>

        <div className="mt-4">
          <CountryField value={fields.country} />
        </div>

        <div className="mt-4 -ml-8">
          <EntityField
            value={{
              ...(fields.entity || {}),
              code: (fields.spider || {}).name,
            }}
          />
        </div>
      </div>
    </>
  );
}
