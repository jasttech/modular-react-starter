import { axios } from '@/lib/axios';

export const loginWithEmailAndPassword = (data) => {
  return axios.post('/auth/login', data);
};
