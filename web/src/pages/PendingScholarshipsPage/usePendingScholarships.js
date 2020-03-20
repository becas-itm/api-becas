import { get } from 'utils/api';
import { useQuery } from 'react-query';
import { query_params } from 'pages/SearchPage/useQueryParamsFilters';

export function usePendingScholarships(page) {
  const url = `/api/publishing/scholarships/${query_params({ page })}`;
  const { isFetching, data = {} } = useQuery(url, get, {
    refetchOnWindowFocus: false,
  });
  const { results = [], ...pagination } = data;

  return {
    isFetching,
    scholarships: results,
    pagination: pagination,
  };
}
