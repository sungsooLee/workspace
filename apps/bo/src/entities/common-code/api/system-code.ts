import { PMSApiPrefix } from '../../../../../../libs/config/src';
import { httpService } from '../../../../../../libs/shared/src';
export default class SystemCodeService {
  static fetchSystemCodeList() {
    return httpService.get<any>(`${PMSApiPrefix()}/enum`);
  }
  static fetchSystemCodeDetail(enumName: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/enum/${enumName}`);
  }
}
