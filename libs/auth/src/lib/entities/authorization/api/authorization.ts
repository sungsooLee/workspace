import type { AxiosResponse } from 'axios';

import { httpService, HttpMethod } from '@learnway/shared';
import { OAuthApiPrefix, SSOApiPrefix } from '@learnway/config';
import { tokenService } from '../../../../../../config/src/lib/service/token.service';

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
    const refresh_token = tokenService.refreshToken;
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

  static healthcheck(comanyCode: string) {
    return httpService.execute<AxiosResponse>({
      method: HttpMethod.POST,
      url: `${SSOApiPrefix()}/healthcheck`,
      payload: {
        comanyCode,
        upForm: 'N',
        userIp: '111.11.11.11',
      },
    });
  }

  static ssoLogin(payload: any) {
    return httpService.execute<AxiosResponse>({
      method: HttpMethod.POST,
      url: `${SSOApiPrefix()}/sso/login`,
      payload,
    });
  }
}
