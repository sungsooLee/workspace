import { axiosInstance } from '@/app/api/instance';

export const fetchProfileDetail = async () => {
  const response = await axiosInstance.get('/api/channel/testId/profile');
  return response.data;
};
