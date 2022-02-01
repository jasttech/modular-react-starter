import { axios } from '@/lib/axios';

export const registerWithEmailAndPassword = (data) => {
  return axios.post('/auth/register', data);
};
