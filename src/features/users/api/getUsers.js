import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

export const getUsers = () => {
  return axios.get(`/users`);
};

export const useUsers = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
