import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

export const getTeams = () => {
  return axios.get('/teams');
};

export const useTeams = ({ config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  });
};
