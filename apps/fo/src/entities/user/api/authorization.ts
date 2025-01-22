import type { AxiosResponse } from 'axios';

import { httpService, HttpMethod } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { User } from '../model/user';
import { resolve } from 'path';

import loginMock from '../../mock/login.json';

export default class AuthorizationService {
  static login(payload: any): Promise<AxiosResponse> {
    /*
    return httpService.execute<AxiosResponse>({
      method: HttpMethod.POST,
      url: `${PMSApiPrefix()}/login`,
      payload,
    });
*/
    return new Promise((resolve) => setTimeout(() => resolve(loginMock as any)));
  }

  static logout() {
    //return httpService.get(`${PMSApiPrefix()}/logout`);
    return new Promise((resolve) => resolve({}));
  }

  static getCurrentUser(): Promise<AxiosResponse> {
    return new Promise((resolve) => setTimeout(() => resolve(loginMock as any)));
  }
}
