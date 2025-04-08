import { httpService } from '@learnway/shared';
import { Company } from '../../../types';
import { PMSApiPrefix } from '@learnway/config';

export default class CompaniesService {
  // 회사 목록 조회
  static fetchCompanies() {
    return httpService.get<Company[]>(`${PMSApiPrefix()}/companies`);
    // return new Promise((resolve) => resolve(Mock));
  }

  // 회사 조회
  static fetchCompany(id: number) {
    return httpService.get<Company>(`${PMSApiPrefix()}/companies/${id}`);
  }

  // 회사 생성
  static createCompany(payload: any) {
    return httpService.post<Company>(`${PMSApiPrefix()}/companies`, payload);
  }

  // 회사 수정
  static updateCompany(payload: any) {
    return httpService.post<Company>(`${PMSApiPrefix()}/companies`, payload);
  }

  // 회사 삭제
  static deleteCompany(id: number) {
    return httpService.delete<Company>(`${PMSApiPrefix()}/companies`, { id });
  }

  // 사업자등록번호로 회사 조회
  static fetchCompanyBrn(id: number) {
    return httpService.get<Company>(`${PMSApiPrefix()}/companies/brn/${id}`);
  }
}

//-------------------
// Mock
//-------------------
const fetchCompaniesMock = Array(10)
  .fill(null)
  .map((d, i) => ({ channelId: `channel_id${i}`, channelName: `channel_name${i}` }));
