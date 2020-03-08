import React from 'react';
import propTypes from 'prop-types';

import { Checkbox } from 'ui/components/Checkbox';
import { Button, KIND } from 'ui/components/Button';
import CountryCombobox from 'ui/components/CountryCombobox';
import countries from 'ui/components/CountryCombobox/countries';

import { collectFilters } from './collectFilters';

export const DEFAULT_FILTERS = {
  country: '',
  fundingType: ['COMPLETE', 'PARTIAL'],
  academicLevel: ['UNDERGRADUATE', 'POSTGRADUATE', 'OTHERS'],
};

function SiteFilters({ filters, onSubmit, onReset }) {
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(collectFilters(event.target));
  };

  return (
    <form onSubmit={handleSubmit} id="filters">
      <h4 className="text-sm font-semibold color-gray-500 uppercase">
        Tipo de beca
      </h4>
      <div className="flex flex-col mb-2">
        <Checkbox
          value="UNDERGRADUATE"
          name="academicLevel[]"
          defaultChecked={filters.academicLevel.includes('UNDERGRADUATE')}
          className="p-3 flex-grow"
          data-testid="academicLevel.undergraduate"
        >
          Pregrado
        </Checkbox>
        <Checkbox
          value="POSTGRADUATE"
          name="academicLevel[]"
          defaultChecked={filters.academicLevel.includes('POSTGRADUATE')}
          className="p-3 flex-grow"
          data-testid="academicLevel.postgraduate"
        >
          Posgrado
        </Checkbox>
        <Checkbox
          value="OTHERS"
          name="academicLevel[]"
          defaultChecked={filters.academicLevel.includes('OTHERS')}
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
          value="COMPLETE"
          name="fundingType[]"
          defaultChecked={filters.fundingType.includes('COMPLETE')}
          className="p-3 flex-grow"
          data-testid="fundingType.complete"
        >
          Total
        </Checkbox>
        <Checkbox
          value="PARTIAL"
          name="fundingType[]"
          defaultChecked={filters.fundingType.includes('PARTIAL')}
          className="p-3 flex-grow"
          data-testid="fundingType.partial"
        >
          Parcial
        </Checkbox>
      </div>

      <h4 className="text-sm font-semibold color-gray-500 uppercase pb-3">
        País
      </h4>
      <CountryCombobox
        htmlFor=""
        name="country"
        defaultCountry={filters.country}
        countries={countries}
      />

      <div className="mt-8">
        <Button wide type="submit">
          Listo
        </Button>
        <Button
          onClick={onReset}
          kind={KIND.secondary}
          wide
          type="reset"
          className="mt-3"
        >
          Restablecer
        </Button>
      </div>
    </form>
  );
}

SiteFilters.propTypes = {
  filters: propTypes.object.isRequired,
  onSubmit: propTypes.func.isRequired,
  onReset: propTypes.func.isRequired,
};

export default SiteFilters;
