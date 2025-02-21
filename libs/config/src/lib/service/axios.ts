import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { API_SERVER } from '../const/config.constant';
import { OAuthApiPrefix } from '../service/config.service';

import { httpService, cookieService, HttpMethod } from '@learnway/shared';

export function initAxios() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = API_SERVER;

  const interceptors = {
    request: {
      onFulfilled: function (config: InternalAxiosRequestConfig<any>) {
        const accessToken = localStorage.getItem('ACCESS-TOKEN');
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
      onRejected: async (error: any) => {
        const { config, response: errorResponse } = error;
        // error
        if (errorResponse?.status === 401) {
          return await reissueProccess(error);
        }
        if (errorResponse?.status === 403) {
          //return await reissueProccess(error);
        }

        return Promise.reject(error);
      },
    },
  };

  const reissueProccess = (error: any): Promise<any> => {
    const { config, response: errorResponse } = error;
    const refresh_token = localStorage.getItem('REFRESH-TOKEN');
    if (!refresh_token) {
      return Promise.reject();
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
        localStorage.setItem('ACCESS-TOKEN', data.headers['access-token']);
        localStorage.setItem('REFRESH-TOKEN', data.headers['refresh-token']);

        config.headers.authorization = `Bearer ${data.headers['access-token']}`;
        return axios(config);
      });
  };

  httpService.init({ interceptors });
}
