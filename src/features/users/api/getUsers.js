import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import { axios } from '@/lib/axios';
export const getUsers = () => {
  return axios.get(`/users`);
};

export const useUsers = ({ config }) => {
  return useQuery({
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
