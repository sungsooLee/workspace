import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Authorization } from '../model/authorization';

export default class AuthorizationService {
  static login(payload: any) {
    return httpService.post<Authorization>(`${PMSApiPrefix()}/login`, payload);
  }
}
