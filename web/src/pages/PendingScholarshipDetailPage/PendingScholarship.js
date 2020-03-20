import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from 'utils/hooks';
import { ArrowBack } from 'ui/components/Icon';
import IconButton from 'ui/components/IconButton';
import { Button, KIND } from 'ui/components/Button';
import { ScholarshipDetails } from 'pages/ScholarshipPage/ScholarshipDetails';

import { DenyDialog } from './DenyDialog';
import { useApprove } from './useScholarship';
import ScholarshipFields from './fields/ScholarshipFields';

export default function PendingScholarship({ scholarship }) {
  const { approve, isApproving, isApproved } = useApprove(scholarship.id);

  const navigate = useNavigate();

  const [isDenied, toggleIsDenied] = useToggle();
  const [showDeny, toggleDenyDialog] = useToggle();

  return (
    <div className="relative max-w-xl mx-auto">
      <IconButton
        icon={ArrowBack}
        onClick={() => navigate(-1)}
        className="hidden sm:block absolute -ml-16"
      >
        Atrás
      </IconButton>

      <ScholarshipFields fields={scholarship} />

      <ScholarshipDetails
        {...scholarship.sourceDetails}
        spider={scholarship.spider.name}
      />

      <div className="flex justify-end mt-6">
        <Button
          disabled={isApproving || isApproved || isDenied}
          kind={KIND.dangerTertiary}
          onClick={toggleDenyDialog}
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
          Aceptar
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
