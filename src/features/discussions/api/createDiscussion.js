import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

export const createDiscussion = ({ data }) => {
  return axios.post(`/discussions`, data);
};

createDiscussion.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export const useCreateDiscussion = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newDiscussion) => {
      await queryClient.cancelQueries('discussions');

      const previousDiscussions = queryClient.getQueryData('discussions');

      queryClient.setQueryData('discussions', [...(previousDiscussions || []), newDiscussion.data]);

      return { previousDiscussions };
    },
    onError: (_, __, context) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData('discussions', context.previousDiscussions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('discussions');
      addNotification({
        type: 'success',
        title: 'Discussion Created',
      });
    },
    ...config,
    mutationFn: createDiscussion,
  });
};
