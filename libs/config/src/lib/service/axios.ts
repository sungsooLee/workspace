import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { isFunction } from 'lodash';
import qs from 'qs'; // qs 라이브러리 임포트
import { HttpMethod, httpService } from '@learnway/shared';

import { tokenService } from './token.service';
import { OAuthApiPrefix } from '../service/config.service';

interface axiosConfig {
  onRejected?: (error: any) => Promise<any>;
}

export function initAxios(extendConfig?: axiosConfig) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

  // 요청 파라미터 객체를 쿼리 스트링으로 직렬화하기 위해 qs 라이브러리를 사용
  axios.defaults.paramsSerializer = (params) => {
    // arrayFormat 옵션에 따라 배열 데이터를 어떤 형식으로 변환할지 지정할 수 있음
    return qs.stringify(params, {
      arrayFormat: 'repeat',
      // 다른 옵션 예시:
      // arrayFormat: 'repeat'   -> a=1&a=2 (기본값)
      // arrayFormat: 'comma'    -> a=1,2   (서버가 comma 포맷을 지원하는 경우 사용)
      // arrayFormat: 'indices'  -> a[0]=1&a[1]=2
      // arrayFormat: 'brackets' -> (예: a[]=1&a[]=2)
    });
  };

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
        console.log('onRejected', error);
        const { config, response: errorResponse } = error;
        // error
        if (errorResponse?.status === 401) {
          return await reissueProccess(error);
        }

        if (errorResponse?.status === 412 && config.url === '/token-reissue') {
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
