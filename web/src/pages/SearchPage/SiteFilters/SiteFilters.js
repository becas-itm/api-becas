import React from 'react';
import { useFormik } from 'formik';
import { checkboxGroup } from 'utils/forms';

import { Checkbox } from 'ui/components/Checkbox';
import Button, { COLOR } from 'ui/components/Button';
import CountryCombobox from 'ui/components/CountryCombobox';

import LanguageFilter from './LanguageFilter';

export const DEFAULT_FILTERS = {
  page: 1,
  term: '',
  country: '',
  language: '*',
  fundingType: ['COMPLETE', 'PARTIAL'],
  academicLevel: ['UNDERGRADUATE', 'POSTGRADUATE', 'OTHERS'],
};

/**
 * Picks only the filter values Formik uses.
 *
 * Since `enableReinitialize` is set to `true`, it will reset
 * the form if any filter changes, causing unnecessary re-renders.
 * By hand-picking those values we avoid them.
 */
function pickValues(values) {
  const { country, language, fundingType, academicLevel } = values;
  return { country, language, fundingType, academicLevel };
}

export default function SiteFilters({ filters, onSubmit, onReset }) {
  const initialValues = pickValues(filters);
  const form = useFormik({ onSubmit, initialValues, enableReinitialize: true });

  const academicLevelProps = checkboxGroup('academicLevel', form);
  const fundingTypeProps = checkboxGroup('fundingType', form);

  return (
    <form onSubmit={form.handleSubmit} onReset={onReset} id="filters">
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
          value={form.values.language}
          onChange={language => form.setFieldValue('language', language)}
        />
      </div>

      <h4 className="text-sm font-semibold color-gray-500 uppercase pb-1">
        País
      </h4>
      <CountryCombobox
        value={form.values.country}
        onSelect={country => form.setFieldValue('country', country)}
        onChange={event => form.setFieldValue('country', event.target.value)}
      />

      <div className="mt-8">
        <Button wide type="submit">
          Listo
        </Button>
        <Button color={COLOR.secondary} wide type="reset" className="mt-3">
          Restablecer
        </Button>
      </div>
    </form>
  );
}
