import { getDefaultLang } from '@learnway/config';

import CodeService from '../api/code';

export async function fetchCodes() {
  return await CodeService.fetchCodes();
}
