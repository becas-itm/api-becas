import { useSearch } from './useSearch';
import { useFilters } from './useFilters';
import { useQueryFilters } from './useQueryFilters';
import { useUpdateQueryParamsFilters } from './useUpdateQueryParamsFilters';

export function useSearchPage(url, defaultFilters) {
  const params = useQueryFilters();

  const filter = useFilters({ defaultFilters, initialFilters: params.filters });

  useUpdateQueryParamsFilters(filter.filters, params.replace);

  const search = useSearch(url, filter.filters);

  return { search, filter, params };
}
