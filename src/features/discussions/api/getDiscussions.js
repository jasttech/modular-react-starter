import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

export const getDiscussions = () => {
  return axios.get('/discussions');
};


export const useDiscussions = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['discussions'],
    queryFn: () => getDiscussions(),
  });
};
