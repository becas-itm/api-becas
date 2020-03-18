import React from 'react';
import useFetch from 'use-http';
import { useMount } from 'react-use';
import { useParams, useNavigate } from 'react-router-dom';

import { useToggle } from 'utils/hooks';
import { ArrowBack } from 'ui/components/Icon';
import IconButton from 'ui/components/IconButton';
import { Button, KIND } from 'ui/components/Button';
import AdminTemplate from 'ui/templates/AdminTemplate';
import { ScholarshipDetails } from 'pages/ScholarshipPage/ScholarshipDetails';

import { DenyDialog } from './DenyDialog';
import { NameField } from './fields/NameField';
import { EntityField } from './fields/EntityField';
import { CountryField } from './fields/CountryField';
import { DeadlineField } from './fields/DeadlineField';
import { DescriptionField } from './fields/DescriptionField';
import { FundingTypeField } from './fields/FundingTypeField';
import { AcademicLevelField } from './fields/AcademicLevelField';

function PendingScholarshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDenying, toggleDeny] = useToggle();
  const [isApproved, toggleApprove] = useToggle();

  const [data, setData] = React.useState(null);

  const [request, response] = useFetch(`/api/publishing/scholarships/${id}/`);

  useMount(() => {
    async function fetchScholarship() {
      const newData = await request.get();
      if (response.ok) {
        setData(newData);
      }
    }
    fetchScholarship();
  });

  const handleApprove = async () => {
    await request.post('approve/');
    if (response.ok) {
      toggleApprove();
    }
  };

  if (!data) {
    return null;
  }

  return (
    <AdminTemplate>
      <main
        className="max-w-screen-md mx-auto p-4 bg-white rounded sm:py-10 md:py-16 my-8"
        style={{
          maxWidth: 840,
          boxShadow:
            '0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)',
        }}
      >
        <div className="relative max-w-xl mx-auto">
          <IconButton
            icon={ArrowBack}
            onClick={() => navigate(-1)}
            className="hidden sm:block absolute -ml-16"
          >
            Atrás
          </IconButton>
          <div className="mb-2">
            <NameField value={data.name} />
          </div>

          <DescriptionField value={data.description} />

          <div className="pl-8 mt-6">
            <DeadlineField value={data.deadline} />
            <div className="mt-4">
              <AcademicLevelField value={data.academicLevel} />
            </div>
            <div className="mt-4">
              <FundingTypeField value={data.fundingType} />
            </div>
            <div className="mt-4">
              <CountryField value={data.country} />
            </div>
            <div className="mt-4 -ml-8">
              <EntityField
                value={{
                  ...(data.entity || {}),
                  code: (data.spider || {}).name,
                }}
              />
            </div>
          </div>

          <ScholarshipDetails
            {...data.sourceDetails}
            spider={data.spider.name}
          />

          <div className="flex justify-end mt-6">
            <Button
              disabled={request.loading || isApproved}
              kind={KIND.dangerTertiary}
              onClick={toggleDeny}
            >
              Rechazar
            </Button>

            <Button
              onClick={handleApprove}
              isLoading={request.loading}
              disabled={data.fillStatus === 'INCOMPLETE' || isApproved}
              className="ml-3"
            >
              Aceptar
            </Button>
          </div>
        </div>

        {isDenying && (
          <DenyDialog
            onCancel={toggleDeny}
            scholarshipId={data.id}
            onDeny={() => navigate('/admin/pendientes/')}
          />
        )}
      </main>
    </AdminTemplate>
  );
}

export default PendingScholarshipDetailPage;
