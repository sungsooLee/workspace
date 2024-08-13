import { axiosInstance } from '@/app/api/instance';
import { AxiosResponse } from 'axios';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
interface RefreshResponse {
  accessToken: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
    '/login',
    { email, password }
  );
  return response.data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshResponse> => {
  const response: AxiosResponse<RefreshResponse> = await axiosInstance.post(
    '/refresh-token',
    { refreshToken }
  );
  return response.data;
};
