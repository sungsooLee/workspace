import { createPmsUrl, registerApi } from '../../../shared/lib/use-authorized-query';

/**
 * PMS > 공통 코드 관리 API 모음
 */
export const CommonCodeApi = {
  list: registerApi('code.list', 'GET', createPmsUrl('/codes'), '코드 목록 조회'),
  detail: registerApi(
    'code.detail',
    'GET',
    createPmsUrl('/codes/:cdGroupId/:cdId'),
    '코드 단건 조회',
  ),
  create: registerApi('code.create', 'POST', createPmsUrl('/codes'), '코드 생성'),
  update: registerApi(
    'code.update',
    'PUT',
    createPmsUrl('/codes/:cdGroupId/:cdId'),
    '코드 업데이트',
  ),
};
