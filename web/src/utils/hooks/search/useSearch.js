import { get } from 'utils/api';
import { useQuery } from 'react-query';
import { stringifyFilters } from './useQueryFilters';

export function useSearch(url, filters = {}) {
  const { data, isFetching: isLoading } = useQuery([url, filters], fetchSearch);
  return {
    isLoading,
    results: data || { results: [] },
  };
}

function fetchSearch(url, filters) {
  let searchUrl = url;

  if (filters) {
    searchUrl += stringifyFilters(filters);
  }

  return get(searchUrl);
}
