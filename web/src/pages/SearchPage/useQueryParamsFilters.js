import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

export function query_params(payload) {
  return qs.stringify(payload, {
    encode: false,
    skipNulls: true,
    addQueryPrefix: true,
    arrayFormat: 'comma',
  });
}

function parseSearch(search) {
  return qs.parse(search, { comma: true, ignoreQueryPrefix: true });
}

export default function useQueryParamsFilters() {
  const location = useLocation();
  const navigate = useNavigate();

  const replaceFilters = payload =>
    navigate(query_params(payload), { replace: true });

  return {
    replaceFilters,
    values: parseSearch(location.search),
  };
}
