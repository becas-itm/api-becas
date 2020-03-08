import { useState } from 'react';
import { useToggle } from 'utils/hooks';

function shouldArrifyFilter(name) {
  return ['academicLevel', 'fundingType'].includes(name);
}

function mergeValues(defaultValues, initialValues) {
  const values = {};

  for (const [field, defaultValue] of Object.entries(defaultValues)) {
    const value = initialValues[field];

    if (value || value === '') {
      if (shouldArrifyFilter(field) && !Array.isArray(value)) {
        values[field] = value === '' ? [] : [value];
      } else {
        values[field] = value;
      }
    } else {
      values[field] = defaultValue;
    }
  }

  return values;
}

export function useFilters(defaultFilters, initialFilters = {}) {
  const [values, setValues] = useState(
    mergeValues(defaultFilters, initialFilters),
  );
  const onReset = () => setValues(defaultFilters);
  const onSubmit = newValues => setValues(newValues);

  const [isFiltering, toggleFilters] = useToggle(false);

  return { values, onReset, onSubmit, isFiltering, toggleFilters };
}

export default useFilters;
