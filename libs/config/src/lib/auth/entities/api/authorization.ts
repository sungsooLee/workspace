import type { AxiosResponse } from 'axios';

import { httpService, HttpMethod } from '@learnway/shared';
import { OAuthApiPrefix } from '../../../service/config.service';

export default class AuthorizationService {
  static login(payload: any): Promise<any> {
    return httpService.execute<AxiosResponse>({
      method: HttpMethod.POST,
      url: `${OAuthApiPrefix()}/login`,
      payload,
    });
  }

  static logout() {
    return httpService.post(`${OAuthApiPrefix()}/logout`, {});
  }

  static reissue() {
    const refresh_token = localStorage.getItem('REFRESH-TOKEN');
    if (!refresh_token) {
      return Promise.reject();
    }
    return httpService.execute<AxiosResponse>(
      {
        method: HttpMethod.POST,
        url: `${OAuthApiPrefix()}/token-reissue`,
      },
      { headers: { 'refresh-token': `${refresh_token}` } },
    );
  }
}
