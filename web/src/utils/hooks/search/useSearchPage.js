import { useFilter } from './useFilter';
import { useSearch } from './useSearch';
import { useQueryFilters } from './useQueryFilters';
import { useUpdateQueryParamsFilters } from './useUpdateQueryParamsFilters';

export function useSearchPage(url, defaultFilters) {
  const params = useQueryFilters();

  const filter = useFilter({ defaultFilters, initialFilters: params.filters });

  useUpdateQueryParamsFilters(filter.filters, params.replace);

  const search = useSearch(url, filter.filters);

  return { search, filter, params };
}
