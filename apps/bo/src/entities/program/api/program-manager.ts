import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

/**
 * PMS > 프로그램관리(API) API 모음
 */
export default class ProgramManagerService {
  static fetchProgram(apiId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/apis/${apiId}`);
  }
  /**
   * API 목록 트리 조회
   * @param apiScopeCode 'FO' / 'BO'
   * @returns
   */
  static fetchPrograms(rootTreeId: string, apiScopeCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/apis/tree?apiScopeCode=${apiScopeCode}`);
  }
}
