import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

export const getDiscussion = ({ discussionId }) => {
  return axios.get(`/discussions/${discussionId}`);
};


export const useDiscussion = ({ discussionId, config }) => {
  return useQuery({
    ...config,
    queryKey: ['discussion', discussionId],
    queryFn: () => getDiscussion({ discussionId }),
  });
};
