import qs from 'qs';
import useFetch from 'use-http';
import { useMount } from 'react-use';
import { useState, useEffect } from 'react';

function query_params(payload) {
  return qs.stringify(payload, {
    encode: false,
    skipNulls: true,
    addQueryPrefix: true,
  });
}

export default function useSearch() {
  const [term, _setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState({ results: [] });
  const [request, response] = useFetch('/api/search/scholarships/');

  const setTerm = searchTerm => {
    _setTerm(searchTerm);
    setPage(1);
  };

  useMount(() => searchScholarships());

  async function searchScholarships(payload) {
    const results = await request.get(query_params(payload));
    if (response.ok) {
      setResults(results);
    }
  }

  useEffect(() => {
    searchScholarships({ term, page });
  }, [term, page]); // eslint-disable-line react-hooks/exhaustive-deps

  return { term, page, setTerm, setPage, results, isLoading: request.loading };
}
