import { useAuth } from 'reactfire';
import { useMount, useLocalStorage } from 'react-use';

export function useAppToken() {
  const auth = useAuth();
  const [, setToken] = useLocalStorage('token');

  useMount(() => {
    auth.onIdTokenChanged(user => {
      if (!user) {
        setToken('');
      } else {
        user.getIdToken().then(setToken);
      }
    });
  });
}
