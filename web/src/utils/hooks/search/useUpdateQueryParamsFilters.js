import { useRef, useEffect } from 'react';

export function useUpdateQueryParamsFilters(filters, replaceFilters) {
  const canReplace = useRef(false);

  useEffect(() => {
    if (canReplace.current) {
      replaceFilters(filters);
    }

    if (!canReplace.current) {
      canReplace.current = true;
    }
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps
}
