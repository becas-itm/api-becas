import { useAuth } from './useAuth';

const DEFAULT_USER = Object.assign({
  uid: '',
  displayName: 'Anónimo',
  email: '',
  photoURL: '/img/avatars/person.svg',
});

export function useUser() {
  const { user } = useAuth();
  return user || DEFAULT_USER;
}
