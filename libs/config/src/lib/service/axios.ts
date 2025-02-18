import axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_SERVER } from '../const/config.constant';
import { OAuthApiPrefix } from '../service/config.service';

import { httpService, cookieService, HttpMethod } from '@learnway/shared';

export function initAxios() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = API_SERVER;

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

  httpService.init(reissueProccess);
}
