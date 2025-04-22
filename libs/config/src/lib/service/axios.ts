import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isFunction } from 'lodash';

import { httpService, HttpMethod } from '@learnway/shared';

import { tokenService } from './token.service';
import { OAuthApiPrefix } from '../service/config.service';

interface axiosConfig {
  onRejected?: (error: any) => Promise<any>;
}

export function initAxios(extendConfig?: axiosConfig) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

  const interceptors = {
    request: {
      // request 시 accessToken을 header로 전송
      onFulfilled: function (config: InternalAxiosRequestConfig<any>) {
        const accessToken = tokenService.accessToken;
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      onRejected: undefined,
    },
    response: {
      onFulfilled: function (config: AxiosResponse<any, any>) {
        return config;
      },
      // response rejected 상태가 401인 경우 reissue
      onRejected: async (error: any) => {
        const { config, response: errorResponse } = error;
        // error
        if (errorResponse?.status === 401) {
          return await reissueProccess(error);
        }

        if (extendConfig?.onRejected && isFunction(extendConfig?.onRejected)) {
          return await extendConfig.onRejected(error);
        }

        return Promise.reject(error);
      },
    },
  };

  // accessToken 만료인 경우 refreshToken을 이용해 accessToken 갱신
  const reissueProccess = (error: any): Promise<any> => {
    const { config, response: errorResponse } = error;
    const refresh_token = tokenService.refreshToken;
    if (!refresh_token) {
      return Promise.reject(error);
    }
    return httpService
      .execute<AxiosResponse>(
        {
          method: HttpMethod.POST,
          url: `${OAuthApiPrefix()}/token-reissue`,
        },
        { headers: { 'refresh-token': `${refresh_token}` } },
      )
      .then((data) => {
        tokenService.accessToken = data.headers['access-token'];
        tokenService.refreshToken = data.headers['refresh-token'];

        config.headers.authorization = `Bearer ${tokenService.accessToken}`;
        return axios(config);
      });
  };

  httpService.init({ interceptors });
}
