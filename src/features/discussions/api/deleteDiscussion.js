import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

export const deleteDiscussion = ({ discussionId }) => {
  return axios.delete(`/discussions/${discussionId}`);
};

deleteDiscussion.propTypes = {
  discussionId: PropTypes.string.isRequired,
};

export const useDeleteDiscussion = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedDiscussion) => {
      await queryClient.cancelQueries('discussions');

      const previousDiscussions = queryClient.getQueryData('discussions');

      queryClient.setQueryData(
        'discussions',
        previousDiscussions?.filter(
          (discussion) => discussion.id !== deletedDiscussion.discussionId
        )
      );

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
        title: 'Discussion Deleted',
      });
    },
    ...config,
    mutationFn: deleteDiscussion,
  });
};
