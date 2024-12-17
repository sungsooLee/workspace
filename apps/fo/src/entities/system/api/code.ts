import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Code } from '../model/code';

import codeMock from '../../mock/code.json';

export default class CodeService {
  static fetchCodes(languageCode: string) {
    //return httpService.get<Company[]>(`${PMSApiPrefix()}/codes?languageCode=${languageCode}`);
    return new Promise((resolve) => setTimeout(() => resolve(codeMock as any)));
  }
}
