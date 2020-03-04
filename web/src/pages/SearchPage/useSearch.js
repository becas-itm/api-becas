import qs from 'qs';
import useFetch from 'use-http';
import { useState, useEffect } from 'react';

import useFilters from './useFilters';
import { DEFAULT_FILTERS } from './SiteFilters/SiteFilters';

function query_params(payload) {
  return qs.stringify(payload, {
    encode: false,
    skipNulls: true,
    addQueryPrefix: true,
    arrayFormat: 'comma',
  });
}

export default function useSearch() {
  const [term, _setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState({ results: [] });
  const [request, response] = useFetch('/api/search/scholarships/');

  const filter = useFilters(DEFAULT_FILTERS);
  const { values } = filter;

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
  }, [term, page, values]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    term,
    page,
    setTerm,
    setPage,
    results,
    filter,
    isLoading: request.loading,
  };
}
