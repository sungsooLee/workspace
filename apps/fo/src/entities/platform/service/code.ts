import CodeService from '../api/code';

export async function fetchCodes() {
  return await CodeService.fetchCodes();
}
