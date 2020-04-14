import { useMemo } from 'react';
import matchSorter from 'match-sorter';
import { useThrottle } from 'react-use';

import allCountries from './countries';

export default function useCountryMatch(term) {
  const throttledTerm = useThrottle(term, 100);

  return useMemo(
    () =>
      term.trim() === ''
        ? allCountries
        : matchSorter(allCountries, term, { keys: ['name'] }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttledTerm],
  );
}
