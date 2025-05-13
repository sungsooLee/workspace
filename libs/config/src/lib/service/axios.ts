import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isFunction } from 'lodash';

import { httpService, HttpMethod, eventService } from '@learnway/shared';

import { tokenService } from './token.service';
import { OAuthApiPrefix } from '../service/config.service';

interface axiosConfig {
  onRejected?: (error: any) => Promise<any>;
}

export function initAxios(extendConfig?: axiosConfig) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

  // 로그인 페이지 경로 생성 함수
  const getLoginPath = () => {
    // window.__ENV__가 있고 BASE_PATH가 설정되어 있으면 사용
    if (typeof window !== 'undefined' && (window as any).__ENV__?.BASE_PATH) {
      // 앞에 슬래시가 있으면 그대로 사용, 없으면 추가
      const basePath = (window as any).__ENV__.BASE_PATH.startsWith('/')
        ? (window as any).__ENV__.BASE_PATH
        : `/${(window as any).__ENV__.BASE_PATH}`;

      return `${basePath}/login`;
    }

    // 환경 변수에서 BASE_PATH 가져오기 (환경에 따라 다름)
    const basePath = import.meta.env.VITE_BO_BASE_PATH || import.meta.env.VITE_FO_BASE_PATH || '';

    // 빈 문자열이거나 슬래시로 시작하지 않으면 슬래시 추가
    const formattedBasePath = basePath
      ? basePath.startsWith('/')
        ? basePath
        : `/${basePath}`
      : '';

    return `${formattedBasePath}/login`;
  };

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

        if (errorResponse?.status === 412) {
          tokenService.clear();

          if (typeof window !== 'undefined') {
            const loginPath = getLoginPath();
            window.location.href = loginPath;
          }

          return Promise.reject(error);
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
