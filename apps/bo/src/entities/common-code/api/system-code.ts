import { createPmsUrl, registerApi } from '../../../shared/lib/use-authorized-query';

export const SystemCodeApi = {
  list: registerApi('systemCode.list', 'GET', createPmsUrl('/enum'), '시스템코드 목록 조회'),
  detail: registerApi(
    'systemCode.detail',
    'GET',
    createPmsUrl('/enum/:enumName'),
    '시스템코드 단건 조회',
  ),
};
