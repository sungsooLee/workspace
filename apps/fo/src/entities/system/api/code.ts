import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Code } from '../model/code';

import codeMock from '../../mock/code.json';

export default class CodeService {
  static fetchCodes() {
    //return httpService.get<Company[]>(`${PMSApiPrefix()}/codes`);
    return new Promise((resolve) => setTimeout(() => resolve(codeMock as any), 2000));
  }
}
