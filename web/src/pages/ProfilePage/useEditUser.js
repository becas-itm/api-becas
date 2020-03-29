import { put } from 'utils/api';
import { useMutation } from 'react-query';

export function useEditUser(userId) {
  const url = `/api/users/${userId}/`;
  const [editUser, result] = useMutation(data => put(url, data));

  const edit = async values => {
    await editUser(values);
    window.location.reload();
  };

  return {
    edit,
    isLoading: result.status === 'loading',
  };
}
