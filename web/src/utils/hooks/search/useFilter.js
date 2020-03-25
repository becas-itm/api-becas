import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TERM':
      return { ...state, term: action.term };

    case 'SET_PAGE':
      return { ...state, page: action.page };

    case 'RESET_FILTERS':
      return { ...state, ...action.defaultFilters };

    case 'SET_FILTERS':
      return { ...state, ...action.filters };

    default:
      throw new Error('Unknown filter action');
  }
}

export function useFilter({ initialFilters = {}, defaultFilters = {} } = {}) {
  const [filters, dispatch] = useReducer(
    reducer,
    mergeValues(defaultFilters, initialFilters),
  );

  const setTerm = term => dispatch({ term, type: 'SET_TERM' });
  const reset = () => dispatch({ type: 'RESET_FILTERS', defaultFilters });
  const setFilters = filters => dispatch({ filters, type: 'SET_FILTERS' });
  const setPage = page => dispatch({ page, type: 'SET_PAGE' });

  return { filters, reset, setPage, setTerm, setFilters };
}

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
