import { httpService } from '@learnway/shared';
import { Company } from '@learnway/types';
import { PMSApiPrefix } from '@learnway/config';
import { PageableContent } from '@types';

export default class CompaniesService {
  // 회사 목록 조회
  static fetchAll(params: any) {
    const reqParam = { ...params, size: 5000 };
    return httpService.get<any>(`${PMSApiPrefix()}/companies`, reqParam);
  }

  static fetchList(params: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/companies`, params);
  }

  // 회사 조회
  static fetch(code: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/companies/${code}`);
  }

  // 회사 생성
  static create(payload: Company) {
    return httpService.post<Company>(`${PMSApiPrefix()}/companies`, payload);
  }

  // 회사 수정
  static update(payload: Company) {
    return httpService.put<Company>(`${PMSApiPrefix()}/companies/${payload.companyCode}`, payload);
  }

  // 회사 삭제
  static delete(id: number) {
    return httpService.delete<Company>(`${PMSApiPrefix()}/companies`, { id });
  }

  // 사업자등록번호로 회사 조회
  static fetchBrn(brn: string) {
    return httpService.get<Company>(`${PMSApiPrefix()}/companies/brn/${brn}`);
  }

  static existsCode(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/companies/companyCode/exist`, params);
  }
}

//-------------------
// Mock
//-------------------
const fetchCompaniesMock = Array(10)
  .fill(null)
  .map((d, i) => ({ channelId: `channel_id${i}`, channelName: `channel_name${i}` }));
