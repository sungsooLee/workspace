import { useAuthStore } from '@/shared/stores/useAuthStore';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import memoize from 'memoize';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
});
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}

const getRefreshToken = memoize(
  async (): Promise<string | void> => {
    const authStore = useAuthStore.getState();
    try {
      const {
        data: { accessToken, refreshToken },
      } = await axiosInstance.post('/refresh-token', {
        refreshToken: authStore.refreshToken,
      });

      authStore.setAccessToken(accessToken);
      if (refreshToken) {
        authStore.setRefreshToken(refreshToken);
      }
      return accessToken;
    } catch (e) {
      authStore.signOut();
      throw e;
    }
  },
  { maxAge: 1000 } // 중복 요청 방지용
);

axiosInstance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const { config, response } = error;
    const customConfig = config as CustomAxiosRequestConfig;

    if (response?.status === 401) {
      if (customConfig.url === '/login') {
        return Promise.reject(error);
      }
    }

    if (
      customConfig.url === '/refresh-token' ||
      response?.status !== 401 ||
      customConfig.sent
    ) {
      return Promise.reject(error);
    }

    customConfig.sent = true;
    const accessToken = await getRefreshToken();

    try {
      const { setAccessToken } = useAuthStore.getState();
      if (accessToken) {
        setAccessToken(accessToken);
        customConfig.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(customConfig);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
);
