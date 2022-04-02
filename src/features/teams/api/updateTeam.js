import { axios } from '@/lib/axios';
import { useNotificationStore } from '@/stores/notifications';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

export const updateTeam = ({ teamId, data }) => {
  return axios.patch(`/teams/${teamId}`, data);
};

updateTeam.propTypes = {
  teamId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export const useUpdateTeam = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    ...config,
    mutationFn: updateTeam,
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Profile Updated',
      });
    },
  });
};
