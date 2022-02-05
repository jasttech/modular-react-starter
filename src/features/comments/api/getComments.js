import { axios } from '@/lib/axios';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

export const getComments = ({ discussionId }) => {
  return axios.get(`/comments`, {
    params: {
      discussionId,
    },
  });
};

getComments.propTypes = {
  discussionId: PropTypes.string.isRequired,
};

export const useComments = ({ discussionId, config }) => {
  return useQuery({
    ...config,
    queryKey: ['comments', discussionId],
    queryFn: () => getComments({ discussionId }),
  });
};
