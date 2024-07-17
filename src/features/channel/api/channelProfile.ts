import axiosInstance from '@/shared/utils/axios';

export const fetchProfileDetail = async () => {
  const response = await axiosInstance.get('/api/channel/testId/profile');
  return response.data;
};
