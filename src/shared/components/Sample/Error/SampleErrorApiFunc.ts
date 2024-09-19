import { axiosInstance } from '@/app/api/instance';
// import axios from 'axios';

export const errorGetData = async (param?: string) => {
  const response = await axiosInstance.get(`/error/${param}`);
  return response.data;
};
