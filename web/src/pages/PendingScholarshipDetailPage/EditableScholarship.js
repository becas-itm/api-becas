import React from 'react';
import { format } from 'date-fns';
import { Formik, Form } from 'formik';

import Button, { COLOR } from 'ui/components/Button';
import { ScholarshipDetails } from 'pages/ScholarshipPage/ScholarshipDetails';

import { useUpdate } from './useScholarship';
import { NameField } from './fields/NameField';
import { EntityField } from './fields/EntityField';
import { CountryField } from './fields/CountryField';
import { DeadlineField } from './fields/DeadlineField';
import { DescriptionField } from './fields/DescriptionField';
import { FundingTypeField } from './fields/FundingTypeField';
import { AcademicLevelField } from './fields/AcademicLevelField';

const formatDate = date => format(new Date(date), 'yyyy-MM-dd');

export default function EditableScholarship({ scholarship, onEdit, onCancel }) {
  const initialValues = {
    name: scholarship.name || '',
    description: scholarship.description || '',
    deadline: scholarship.deadline ? formatDate(scholarship.deadline) : '',
    academicLevel: scholarship.academicLevel || '*',
    fundingType: scholarship.fundingType || '*',
    country: scholarship.country || { code: '*', name: 'Seleccionar' },
  };

  const { update, isUpdating } = useUpdate(scholarship.id);

  const handleSubmit = values =>
    update({
      ...values,
      country: values.country?.code,
    }).then(onEdit);

  return (
    <div className="relative max-w-xl mx-auto">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form noValidate>
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Actualizar convocatoria
          </h1>

          <div className="mb-2">
            <NameField isEditing />
          </div>

          <DescriptionField isEditing />

          <div className="mt-6">
            <DeadlineField isEditing />

            <div className="mt-4">
              <AcademicLevelField isEditing />
            </div>

            <div className="mt-4">
              <FundingTypeField isEditing />
            </div>

            <div className="mt-4">
              <CountryField isEditing />
            </div>
          </div>

          <div className="pl-8 -ml-8 mt-8">
            <EntityField value={scholarship.entity || {}} />
          </div>

          <ScholarshipDetails
            {...scholarship.sourceDetails}
            entityName={scholarship.entity?.name}
          />

          <div className="flex justify-end mt-6">
            <Button
              disabled={isUpdating}
              color={COLOR.secondary}
              onClick={onCancel}
            >
              Cancelar
            </Button>

            <Button isLoading={isUpdating} type="submit" className="ml-3">
              Actualizar
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
