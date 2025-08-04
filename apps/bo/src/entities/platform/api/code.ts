import { CodeGroup } from '@learnway/config';

import codeMock from '../../mock/code.json';

export default class CodeService {
  static fetchCodes(): Promise<CodeGroup[]> {
    return new Promise((resolve) => setTimeout(() => resolve(codeMock as any), 1000));
  }
}
