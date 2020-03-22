import React from 'react';
import { useFormik } from 'formik';
import { checkboxGroup } from 'utils/forms';

import { Checkbox } from 'ui/components/Checkbox';
import { Button, KIND } from 'ui/components/Button';
import CountryCombobox from 'ui/components/CountryCombobox';

import LanguageFilter from './LanguageFilter';

export const DEFAULT_FILTERS = {
  country: '',
  fundingType: ['COMPLETE', 'PARTIAL'],
  academicLevel: ['UNDERGRADUATE', 'POSTGRADUATE', 'OTHERS'],
  language: '*',
};

export default function SiteFilters({ initialValues, onSubmit, onReset }) {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => onSubmit(values),
  });

  const academicLevelProps = checkboxGroup('academicLevel', formik);
  const fundingTypeProps = checkboxGroup('fundingType', formik);

  return (
    <form onSubmit={formik.handleSubmit} onReset={onReset} id="filters">
      <h4 className="text-sm font-semibold color-gray-500 uppercase">
        Tipo de beca
      </h4>
      <div className="flex flex-col mb-2">
        <Checkbox
          {...academicLevelProps('UNDERGRADUATE')}
          className="p-3 flex-grow"
          data-testid="academicLevel.undergraduate"
        >
          Pregrado
        </Checkbox>
        <Checkbox
          {...academicLevelProps('POSTGRADUATE')}
          className="p-3 flex-grow"
          data-testid="academicLevel.postgraduate"
        >
          Posgrado
        </Checkbox>
        <Checkbox
          {...academicLevelProps('OTHERS')}
          className="p-3 flex-grow"
          data-testid="academicLevel.others"
        >
          Otros
        </Checkbox>
      </div>

      <h4 className="text-sm font-semibold color-gray-500 uppercase">
        Tipo de financiamiento
      </h4>
      <div className="flex flex-wrap mb-2">
        <Checkbox
          {...fundingTypeProps('COMPLETE')}
          className="p-3 flex-grow"
          data-testid="fundingType.complete"
        >
          Total
        </Checkbox>
        <Checkbox
          {...fundingTypeProps('PARTIAL')}
          className="p-3 flex-grow"
          data-testid="fundingType.partial"
        >
          Parcial
        </Checkbox>
      </div>

      <label
        id="filter-language"
        className="text-sm font-semibold color-gray-500 uppercase pb-1"
      >
        Idioma
      </label>
      <div className="flex flex-wrap mb-4">
        <LanguageFilter
          value={formik.values.language}
          onChange={language => formik.setFieldValue('language', language)}
        />
      </div>

      <h4 className="text-sm font-semibold color-gray-500 uppercase pb-1">
        País
      </h4>
      <CountryCombobox
        value={formik.values.country}
        onSelect={country => formik.setFieldValue('country', country)}
        onChange={event => formik.setFieldValue('country', event.target.value)}
      />

      <div className="mt-8">
        <Button wide type="submit">
          Listo
        </Button>
        <Button kind={KIND.secondary} wide type="reset" className="mt-3">
          Restablecer
        </Button>
      </div>
    </form>
  );
}
