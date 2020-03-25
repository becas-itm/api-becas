import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

export function useQueryFilters() {
  const location = useLocation();
  const navigate = useNavigate();

  const replace = filters =>
    navigate(stringifyFilters(filters), { replace: true });

  return {
    replace,
    filters: parseQueryParamsFilters(location.search),
  };
}

function parseQueryParamsFilters(queryString) {
  return qs.parse(queryString, { comma: true, ignoreQueryPrefix: true });
}

export function stringifyFilters(filters) {
  return qs.stringify(filters, {
    encode: false,
    skipNulls: true,
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  });
}
