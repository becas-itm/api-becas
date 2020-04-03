import { useRef } from 'react';
import { useUnmount } from 'react-use';

const HTTP_STATUS_UNAUTHORIZED = 401;

export function useRefreshToken() {
  const ref = useRef(null);

  useUnmount(stop);

  function stop() {
    clearTimeout(ref.current);
  }

  function start(timeout) {
    return new Promise(resolve => {
      ref.current = setTimeout(() => resolve(fetchSilentRefresh()), timeout);
    });
  }

  function restart(timeout) {
    stop();
    return start(timeout);
  }

  return { start, stop, restart };
}

async function fetchSilentRefresh() {
  const response = await fetch('/api/auth/refresh-token/', { method: 'POST' });

  if (response.ok) {
    return response.json();
  }

  if (response.status === HTTP_STATUS_UNAUTHORIZED) {
    return null;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
