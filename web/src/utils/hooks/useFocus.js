import chain from 'utils/chainFns';
import { useState, useCallback } from 'react';

export function useFocus(initialFocus = false) {
  const [isFocused, setFocused] = useState(initialFocus);

  const bind = useCallback(
    ({ onFocus, onBlur } = {}) => ({
      onFocus: chain(() => setFocused(true), onFocus),
      onBlur: chain(() => setFocused(false), onBlur),
    }),
    [],
  );

  return [isFocused, bind];
}
