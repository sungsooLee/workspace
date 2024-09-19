import { axiosInstance } from '@/app/api/instance';
import { AxiosResponse } from 'axios';

interface RefreshResponse {
  accessToken: string;
}

export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshResponse> => {
  const response: AxiosResponse<RefreshResponse> = await axiosInstance.post(
    '/refresh-token',
    { refreshToken }
  );
  return response.data;
};
