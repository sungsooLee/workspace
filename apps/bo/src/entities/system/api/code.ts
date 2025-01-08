import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { CodeRole } from '../../../types/entities/code';

import codeMock from '../../mock/code.json';

export default class CodeService {
  static fetchCodes(): Promise<CodeRole[]> {
    //return httpService.get<Company[]>(`${PMSApiPrefix()}/codes`);
    return new Promise((resolve) => setTimeout(() => resolve(codeMock as CodeRole[]), 2000));
  }
}
