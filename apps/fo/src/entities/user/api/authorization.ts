import type { AxiosResponse } from 'axios';

import { httpService, HttpMethod } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { User } from '../model/user';

export default class AuthorizationService {
  static login(payload: any) {
    return httpService.execute<AxiosResponse>({
      method: HttpMethod.POST,
      url: `${PMSApiPrefix()}/login`,
      payload,
    });
  }

  static logout() {
    //return httpService.get(`${PMSApiPrefix()}/logout`);
    return new Promise((resolve) => resolve({}));
  }
}
