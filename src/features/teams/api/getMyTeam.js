import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

export const getMyTeam = () => {
  return axios.get('/team');
};

export const useMyTeam = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['my-teams'],
    queryFn: () => getMyTeam(),
  });
};
