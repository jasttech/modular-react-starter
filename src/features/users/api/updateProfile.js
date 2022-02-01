import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { useNotificationStore } from '@/stores/notifications';

export const updateProfile = ({ data }) => {
  return axios.patch(`/users/profile`, data);
};

updateProfile.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export const useUpdateProfile = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'User Updated',
      });
      refetchUser();
    },
    ...config,
    mutationFn: updateProfile,
  });
};
