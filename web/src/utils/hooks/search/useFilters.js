import { useReducer } from 'react';

function reducer(filters, action) {
  switch (action.type) {
    case 'SET_TERM':
      return { ...filters, term: action.term };

    case 'SET_PAGE':
      return { ...filters, page: action.page };

    case 'RESET_FILTERS':
      return { ...filters, ...action.defaultFilters };

    case 'SET_FILTERS':
      return { ...filters, ...action.filters };

    default:
      throw new Error('Unknown filter action');
  }
}

export function useFilters({ initialFilters = {}, defaultFilters = {} } = {}) {
  const [filters, dispatch] = useReducer(
    reducer,
    mergeFilters(defaultFilters, initialFilters),
  );

  const setTerm = term => dispatch({ term, type: 'SET_TERM' });
  const reset = () => dispatch({ type: 'RESET_FILTERS', defaultFilters });
  const setFilters = filters => dispatch({ filters, type: 'SET_FILTERS' });
  const setPage = page => dispatch({ page, type: 'SET_PAGE' });

  return { filters, reset, setPage, setTerm, setFilters };
}

function mergeFilters(defaultValues, initialValues) {
  const isArrayFilter = arrayFilters(defaultValues);

  const filters = {};
  for (const [name, defaultValue] of Object.entries(defaultValues)) {
    const value = initialValues[name];

    if (value || value === '') {
      if (isArrayFilter(name) && !Array.isArray(value)) {
        filters[name] = value === '' ? [] : [value];
      } else {
        filters[name] = value;
      }
    } else {
      filters[name] = defaultValue;
    }
  }

  return filters;
}

function arrayFilters(values = {}) {
  const filters = new Set(
    Object.entries(values)
      .filter(([, value]) => Array.isArray(value))
      .map(([filter]) => filter),
  );

  return name => filters.has(name);
}
