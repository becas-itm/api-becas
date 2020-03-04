import { useState } from 'react';
import { useToggle } from 'utils/hooks';

export function useFilters(defaultFilters) {
  const [values, setValues] = useState(defaultFilters);
  const onReset = () => setValues(defaultFilters);
  const onSubmit = newValues => setValues(newValues);

  const [isFiltering, toggleFilters] = useToggle(false);

  return { values, onReset, onSubmit, isFiltering, toggleFilters };
}

export default useFilters;
