import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { Program } from '../../../types/entities/program';

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
  static fetchPrograms(apiScopeCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/apis/tree?apiScopeCode=${apiScopeCode}`);
  }

  static createProgram(payload: Program) {
    return httpService.post<Program>(`${PMSApiPrefix()}/apis`, payload);
  }

  static deleteProgram(apiId: string): Promise<any> {
    return httpService.delete<Program>(`${PMSApiPrefix()}/apis/${apiId}`);
  }

  static updateProgram(payload: Program): Promise<any> {
    return httpService.put<Program>(`${PMSApiPrefix()}/apis/${payload.apiUuid}`, payload);
  }

  static dndProgram(payload: any): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/apis/${payload.apiUuid}/dnd`, payload);
  }
}
