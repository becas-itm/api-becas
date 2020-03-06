import { useMemo } from 'react';
import matchSorter from 'match-sorter';
import { useThrottle } from 'react-use';

export default function useCountryMatch(term, countries = []) {
  const throttledTerm = useThrottle(term, 100);

  return useMemo(
    () =>
      term.trim() === ''
        ? countries
        : matchSorter(countries, term, { keys: ['name'] }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttledTerm, countries],
  );
}
