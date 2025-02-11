import type { AxiosResponse } from 'axios';

import { httpService, HttpMethod, cookieService } from '@learnway/shared';
import { OAuthApiServer, OAuthApiPrefix } from '@learnway/config';

import { User } from '../model/user';
import { resolve } from 'path';

import loginMock from '../../mock/login.json';

export default class AuthorizationService {
  static login(payload: any): Promise<any> {
    /*
    return fetch(`${OAuthApiServer()}/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        //console.log(res);
        //return res.json();
        return res;
      })
      .then((json) => {
        console.log('login failed', json);
        //console.log('login failed', json.headers);
      });
*/

    return httpService.execute<AxiosResponse>({
      method: HttpMethod.POST,
      url: `${OAuthApiServer()}/login`,
      payload,
    });
  }

  static logout() {
    return httpService.post(
      `${OAuthApiServer()}/logout`,
      {},
      { headers: { Authorization: `Bearer ${cookieService.get('LOGIN_TOKEN')}` } },
    );
    //return new Promise((resolve) => resolve({}));
  }

  static reissue() {
    return httpService.execute<AxiosResponse>({
      method: HttpMethod.POST,
      url: `${OAuthApiServer()}/token-reissue`,
    });
  }
}
