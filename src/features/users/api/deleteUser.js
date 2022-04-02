import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

export const deleteUser = ({ userId }) => {
  return axios.delete(`/users/${userId}`);
};

deleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};

export const useDeleteUser = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedUser) => {
      await queryClient.cancelQueries('users');

      const previousUsers = queryClient.getQueryData('users');

      queryClient.setQueryData(
        'users',
        previousUsers?.filter((discussion) => discussion.id !== deletedUser.userId)
      );

      return { previousUsers };
    },
    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('users', context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      addNotification({
        type: 'success',
        title: 'User Deleted',
      });
    },
    ...config,
    mutationFn: deleteUser,
  });
};
