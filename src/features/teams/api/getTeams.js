import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

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
