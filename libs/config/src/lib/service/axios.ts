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
        console.log('axios.interceptors');
        const accessToken = cookieService.get('ACCESS-TOKEN');
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
        console.log('interceptors onRejected', error);
        if (errorResponse?.status === 403) {
          console.log('401 error');
          return await reissueProccess(error);
        }

        return Promise.reject(error);
      },
    },
  };

  const reissueProccess = (error: any): Promise<any> => {
    const { config, response: errorResponse } = error;
    return httpService
      .execute<AxiosResponse>(
        {
          method: HttpMethod.POST,
          url: `${OAuthApiPrefix()}/token-reissue`,
        },
        { headers: { 'refresh-token': `${cookieService.get('REFRESH-TOKEN')}` } },
      )
      .then((data) => {
        cookieService.set('ACCESS-TOKEN', data.headers['access-token']);
        cookieService.set('REFRESH-TOKEN', data.headers['refresh-token']);

        config.headers.authorization = `Bearer ${data.headers['access-token']}`;
        return axios(config);
      });
  };

  httpService.init({ interceptors });
}
