import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from 'utils/hooks';
import IconButton from 'ui/components/IconButton';
import Button, { COLOR } from 'ui/components/Button';
import { ArrowBack, Edit } from 'ui/components/Icon';
import { ScholarshipDetails } from 'pages/ScholarshipPage/ScholarshipDetails';

import { DenyDialog } from './DenyDialog';
import { useApprove } from './useScholarship';

import { BaseField } from './fields/BaseField';
import { EntityField } from './fields/EntityField';
import { CountryField } from './fields/CountryField';
import { DeadlineField } from './fields/DeadlineField';
import { FundingTypeField } from './fields/FundingTypeField';
import { AcademicLevelField } from './fields/AcademicLevelField';

export default function PendingScholarship({ scholarship, onEdit }) {
  const { approve, isApproving, isApproved } = useApprove(scholarship.id);

  const navigate = useNavigate();

  const [isDenied, toggleIsDenied] = useToggle();
  const [showDeny, toggleDenyDialog] = useToggle();

  return (
    <div className="relative max-w-xl mx-auto">
      <IconButton
        icon={ArrowBack}
        onClick={() => navigate(-1)}
        className="hidden md:block absolute -ml-16"
      >
        Atrás
      </IconButton>

      <IconButton
        icon={Edit}
        onClick={onEdit}
        className="hidden md:block absolute left-full ml-2"
      >
        Editar convocatoria
      </IconButton>

      <div className="mb-2">
        <h1 className="text-xl sm:text-2xl font-semibold">
          {scholarship.name}
        </h1>
      </div>

      <BaseField isMissing={!scholarship.description} name="Descripción">
        {scholarship.description || null}
      </BaseField>

      <div className="pl-8 mt-6">
        <DeadlineField value={scholarship.deadline} />

        <div className="mt-4">
          <AcademicLevelField value={scholarship.academicLevel} />
        </div>

        <div className="mt-4">
          <FundingTypeField value={scholarship.fundingType} />
        </div>

        <div className="mt-4">
          <CountryField value={scholarship.country} />
        </div>

        <div className="mt-4 -ml-8">
          <EntityField value={scholarship.entity || {}} />
        </div>
      </div>

      <ScholarshipDetails
        {...scholarship.sourceDetails}
        entityName={scholarship.entity?.name}
      />

      <div className="flex justify-end mt-6">
        <Button
          disabled={isApproving || isApproved || isDenied}
          onClick={toggleDenyDialog}
          color={COLOR.danger}
          outline
        >
          Rechazar
        </Button>

        <Button
          onClick={approve}
          isLoading={isApproving}
          disabled={
            scholarship.fillStatus === 'INCOMPLETE' || isApproved || isDenied
          }
          className="ml-3"
        >
          Aprobar
        </Button>
      </div>

      {showDeny && (
        <DenyDialog
          onDeny={() => {
            toggleIsDenied();
            toggleDenyDialog();
          }}
          onCancel={toggleDenyDialog}
          scholarshipId={scholarship.id}
        />
      )}
    </div>
  );
}
