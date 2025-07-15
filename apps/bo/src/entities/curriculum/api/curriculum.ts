import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import {
  CurriculumCreateRequest,
  CurriculumDetailResponse,
  CurriculumResponse,
  CurriculumSearchParams,
  GeneralModuleSaveParams,
  PageableContent,
  GeneralModuleUpdateParams,
  FixedModuleSaveParams,
  FixedModuleUpdateParams,
  ModuleDetailResponse,
} from '@types';

export class CurriculumService {
  /**
   * 커리큘럼 목록 조회
   * @param param
   * @returns
   */
  static getCurriculumList(
    param: CurriculumSearchParams,
  ): Promise<PageableContent<CurriculumResponse>> {
    return httpService.get<PageableContent<CurriculumResponse>>(
      `${CMSApiPrefix()}/curriculums`,
      param,
    );
  }

  /**
   * 커리큘럼 상세 조회
   */
  static getCurriculumDetail(curriculumId: number): Promise<CurriculumDetailResponse> {
    return httpService.get<CurriculumDetailResponse>(
      `${CMSApiPrefix()}/curriculum/${curriculumId}`,
    );
  }

  /**
   * 커리큘럼 모듈 정보 상세 조회
   */
  static getModuleDetail(moduleId: number): Promise<any> {
    return httpService.get<ModuleDetailResponse>(`${CMSApiPrefix()}/curriculum/module/${moduleId}`);
  }

  /**
   *  커리큘럼 등록
   */
  static createCurriculum(data: CurriculumCreateRequest): Promise<CurriculumResponse> {
    return httpService.post(`${CMSApiPrefix()}/curriculum`, data);
  }

  /**
   * 커리큘럼 내 목차 모듈 생성
   */
  static createCurriculumModule(data: GeneralModuleSaveParams): Promise<any> {
    return httpService.post(`${CMSApiPrefix()}/curriculum/general-module`, data);
  }

  /**
   * 커리큘럼 내 목차 모듈 수정
   */
  static updateCurriculumModule(data: GeneralModuleUpdateParams): Promise<any> {
    return httpService.put(`${CMSApiPrefix()}/curriculum/general-module`, data);
  }

  /**
   * 커리큘럼 내 Fixed 목차 모듈 생성
   */
  static createCurriculumFixedModule(data: FixedModuleSaveParams): Promise<any> {
    return httpService.post(`${CMSApiPrefix()}/curriculum/fixed-module`, data);
  }

  /**
   * 커리큘럼 내 Fixed 목차 모듈 수정
   */
  static updateCurriculumFixedModule(data: FixedModuleUpdateParams): Promise<any> {
    return httpService.put(`${CMSApiPrefix()}/curriculum/fixed-module`, data);
  }
}
