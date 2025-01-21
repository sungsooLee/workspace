import { httpService } from '@learnway/shared';
import { PMSApiPrefix, CodeGroup } from '@learnway/config';

import codeMock from '../../mock/code.json';

export default class CodeService {
  static fetchCodes(): Promise<CodeGroup[]> {
    //return httpService.get<Company[]>(`${PMSApiPrefix()}/codes`);
    return new Promise((resolve) => setTimeout(() => resolve(codeMock as CodeGroup[]), 2000));
  }
}
