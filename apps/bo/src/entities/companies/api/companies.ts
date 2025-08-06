import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { PageableContent } from '@shared/types/page-meta';
import {
  CompanyCodeExistParams,
  CompanyCreateRequest,
  CompanyListParams,
  CompanyResponse,
} from '../types/company.types';

/**
 * 회사 관리
 */
export default class CompaniesService {
  /**
   * 회사 목록 조회
   * @param params
   * @returns
   */
  static fetchAll(params: CompanyListParams) {
    const reqParam = { ...params, size: 5000 };
    return httpService.get<PageableContent<CompanyResponse>>(
      `${PMSApiPrefix()}/companies`,
      reqParam,
    );
  }

  /**
   * 회사 목록 조회
   * @param params
   * @returns
   */
  static fetchList(params: CompanyListParams) {
    return httpService.get<PageableContent<CompanyResponse>>(`${PMSApiPrefix()}/companies`, params);
  }

  /**
   * 회사 목록 조회 팝업
   * @param params
   * @returns
   */
  static fetchListPopup(params: CompanyListParams) {
    return httpService.get<PageableContent<CompanyResponse>>(
      `${PMSApiPrefix()}/companies/popup`,
      params,
    );
  }

  /**
   * 회사 목록 조회 팝업
   * @param params
   * @returns
   */
  static fetchListPopupAll(params: CompanyListParams) {
    return httpService.get<PageableContent<CompanyResponse>>(`${PMSApiPrefix()}/companies/popup`, {
      ...params,
      size: 5000,
    });
  }

  /**
   * 회사 단건 조회
   * @param code
   * @returns
   */
  static fetch(code: string) {
    return httpService.get<CompanyResponse>(`${PMSApiPrefix()}/companies/${code}`);
  }

  /**
   * 회사 생성
   * @param payload
   * @returns
   */
  static create(payload: CompanyCreateRequest) {
    return httpService.post<CompanyResponse>(`${PMSApiPrefix()}/companies`, payload);
  }

  /**
   * 회사 수정
   * @param payload
   * @returns
   */
  static update(payload: CompanyCreateRequest) {
    return httpService.put<CompanyResponse>(
      `${PMSApiPrefix()}/companies/${payload.companyCode}`,
      payload,
    );
  }

  /**
   * 회사 삭제
   * @param companyCode
   * @returns
   */
  static delete(companyCode: string) {
    return httpService.delete<any>(`${PMSApiPrefix()}/companies/${companyCode}`);
  }

  /**
   * 사업자등록번호로 회사 조회
   * @param brn
   * @returns
   */
  static fetchBrn(brn: string) {
    return httpService.get<CompanyResponse>(`${PMSApiPrefix()}/companies/brn/${brn}`);
  }

  /**
   * 회사 코드 중복 체크
   * @param params
   * @returns
   */
  static existsCode(params: CompanyCodeExistParams) {
    return httpService.get<boolean>(`${PMSApiPrefix()}/companies/companyCode/exist`, params);
  }
}
