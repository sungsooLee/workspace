import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export class DepartmentService {
  static getDepartmentList(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department`, param);
  }

  static getDepartmentTree(companyCode: string[]): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department/tree`, {
      companyCodeList: companyCode,
    });
  }
}
