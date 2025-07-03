import { createPmsUrl, registerApi } from '../../../shared/lib/use-authorized-query';

/**
 * PMS > 공통 코드 그룹 관리 API 모음
 */

export const CommonCodeGroupApi = {
  list: registerApi('codeGroup.list', 'GET', createPmsUrl('/code-groups'), '코드 그룹 목록 조회'),
  detail: registerApi(
    'codeGroup.detail',
    'GET',
    createPmsUrl('/code-groups/:cdGroupId'),
    '코드 그룹 단건 조회',
  ),
  create: registerApi('codeGroup.create', 'POST', createPmsUrl('/code-groups'), '코드 그룹 생성'),
  update: registerApi(
    'codeGroup.update',
    'PUT',
    createPmsUrl('/code-groups/:cdGroupId'),
    '코드 그룹 업데이트',
  ),
};
