import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export class HmgDepartmentService {
  static getDepartmentTree(companyCode: string[]): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/hmg/department/tree`, {
      companyCodeList: companyCode,
    });
  }
}
