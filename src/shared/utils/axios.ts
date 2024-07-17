import { HTTPError } from '@/shared/components/error/error-boundary';
import axios from 'axios';

export const endpoints = {};

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (!error.response) throw error;
    const { data, status } = error.response;
    throw new HTTPError(status, data.message);
  }
);

export default axiosInstance;
