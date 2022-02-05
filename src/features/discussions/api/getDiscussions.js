import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

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
