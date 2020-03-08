import useFetch from 'use-http';
import { useState, useEffect } from 'react';

import useFilters from './useFilters';
import { DEFAULT_FILTERS } from './SiteFilters/SiteFilters';
import useQueryParamsFilters, { query_params } from './useQueryParamsFilters';

export default function useSearch() {
  const { values: initial, replaceFilters } = useQueryParamsFilters();

  const [term, _setTerm] = useState(initial.q || '');
  const [page, setPage] = useState(initial.page || 1);
  const [results, setResults] = useState({ results: [] });
  const [request, response] = useFetch('/api/search/scholarships/');

  const filter = useFilters(DEFAULT_FILTERS, initial);
  const { values } = filter;

  const resetFilters = () => {
    setPage(1);
    filter.onReset();
  };

  const setTerm = searchTerm => {
    _setTerm(searchTerm);
    setPage(1);
  };

  async function searchScholarships(payload) {
    const results = await request.get(query_params(payload));
    if (response.ok) {
      setResults(results);
    }
  }

  useEffect(() => {
    searchScholarships({ term, page, ...values });
    replaceFilters({ ...values, q: term, page });
  }, [term, page, values]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    term,
    page,
    setTerm,
    setPage,
    results,
    isLoading: request.loading,
    filter: {
      ...filter,
      onReset: resetFilters,
    },
  };
}
