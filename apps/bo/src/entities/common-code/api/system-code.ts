import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '../../../../../../libs/config/src';

export default class SystemCodeService {
  /**
   * 공통 코드 (enum) 목록 조회
   */
  static fetchCodes(): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/enum`);
  }

  static fetchCode(enumName: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/enum/${enumName}`);
  }
}
