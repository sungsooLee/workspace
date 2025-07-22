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
  GeneralLessonSaveParams,
  LessonUpdateParams,
  CurriculumUpdateRequest,
  CurriculumDndParams,
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
   * 커리큘럼 수정
   */
  static updateCurriculum(data: CurriculumUpdateRequest): Promise<CurriculumResponse> {
    return httpService.put(`${CMSApiPrefix()}/curriculum`, data);
  }

  /**
   * 커리큘럼 삭제
   */
  static deleteCurriculum(curriculumId: number): Promise<void> {
    return httpService.delete(`${CMSApiPrefix()}/curriculum/${curriculumId}`);
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

  /**
   * General 모듈에 Lesson 생성
   */

  static createGeneralLesson(data: GeneralLessonSaveParams): Promise<any> {
    return httpService.post(`${CMSApiPrefix()}/curriculum/general-module/lesson`, data);
  }

  /**
   * General 모듈 Lesson 수정
   */
  static updateGeneralLesson(data: LessonUpdateParams): Promise<any> {
    return httpService.put(`${CMSApiPrefix()}/curriculum/general-module/lesson`, data);
  }

  /**
   * 커리큘럼에 Lesson 생성
   */
  static createCurriculumLesson(data: GeneralLessonSaveParams): Promise<any> {
    return httpService.post(`${CMSApiPrefix()}/curriculum/module/auto-lesson-module`, data);
  }

  /**
   * FIXED 모듈의 레슨 수정
   */
  static updateFixedLesson(data: LessonUpdateParams): Promise<any> {
    return httpService.put(`${CMSApiPrefix()}/curriculum/fixed-module/lesson`, data);
  }

  /**
   * 레슨 상세 정보 조회
   */
  static getLessonDetail(data: { moduleId: number; lessonId: number }): Promise<any> {
    return httpService.get(
      `${CMSApiPrefix()}/curriculum/module/${data.moduleId}/lesson/${data.lessonId}`,
    );
  }

  /**
   * 커리큘럼 트리 dnd
   */
  static updateDndCurriculumTree(data: CurriculumDndParams): Promise<any> {
    return httpService.post(`${CMSApiPrefix()}/curriculum/dnd`, data);
  }

  /**
   * 모듈 삭제 (커리큘럼 내 레슨도 마찬가지임)
   */
  static deleteCurriculumModule(data: { curriculumId: number; moduleId: number }): Promise<any> {
    return httpService.delete(
      `${CMSApiPrefix()}/curriculum/${data.curriculumId}/module/${data.moduleId}`,
    );
  }

  /**
   * 모듈 내에 레슨 삭제
   */
  static deleteCurriculumLesson(data: { moduleId: number; lessonId: number }): Promise<any> {
    return httpService.delete(
      `${CMSApiPrefix()}/curriculum/general-module/${data.moduleId}/lesson/${data.lessonId}`,
    );
  }
}
