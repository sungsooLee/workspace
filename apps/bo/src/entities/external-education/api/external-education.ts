import {
  ExternalCourseFormEnrollType,
  ExternalCourseFormListRequest,
  ExternalCourseLayoutParam,
  ExternalCourseLayoutRequest,
  PageableContent } from '@types';
import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';
import { ExternalCourseForm } from '@types';

export class ExternalEducationService {
  /**
   * 외부 교육 신청서 단건 조회
   */
  static getExternalEducation(externalCourseFormId: number): Promise<ExternalCourseForm> {
    return httpService.get<ExternalCourseForm>(
      `${LMSApiPrefix()}/external-course-form?externalCourseFormId=${externalCourseFormId}`,
    );
  }
  /**
   * 외부 교육 신청서 목록 조회
   */
  static getExternalEducationList(
    param: ExternalCourseFormListRequest,
  ): Promise<PageableContent<any>> {
    return httpService.get<PageableContent<any>>(`${LMSApiPrefix()}/external-course-forms`, param);
  }

  /**
   * 외부 교육 신청서 등록
   */
  static createExternalEducation(data: ExternalCourseForm): Promise<any> {
    return httpService.post(`${LMSApiPrefix()}/external-course-form`, data);
  }

  /**
   * 외부 교육 신청서 수정
   */
  static updateExternalEducation(formId: number, data: ExternalCourseForm): Promise<any> {
    return httpService.put(`${LMSApiPrefix()}/external-course-form/${formId}`, data);
  }

  /**
   * 외부 교육 신청서 저장 (통합 엔드포인트)
   */
  static saveExternalEducation(formId: number, data: any): Promise<any> {
    return httpService.post(`${LMSApiPrefix()}/external-course-form/${formId}`, data);
  }

  /**
   * 테넌트별 외부 교육 신청서 컴포넌트 목록 조회
   */
  static getComponentList({
    tenantId,
    externalCourseFormEnrollType }: {
    tenantId: number;
    externalCourseFormEnrollType: ExternalCourseFormEnrollType;
  }): Promise<any> {
    return httpService.get(
      `${LMSApiPrefix()}/external-course-form-component?tenantId=${tenantId}&externalCourseFormEnrollType=${externalCourseFormEnrollType}`,
    );
  }

  /**
   * 신청서 레이아웃 조회
   */
  static getRegistrationLayout(data: ExternalCourseLayoutParam): Promise<any> {
    return httpService.get(
      `${LMSApiPrefix()}/external-course-layout?externalCourseFormId=${data.externalCourseFormId}&externalCourseFormEnrollType=${data.externalCourseFormEnrollType}`,
    );
  }

  /**
   * 신청서 등록
   */
  static createExternalCourseLayout(data: ExternalCourseLayoutRequest): Promise<any> {
    return httpService.post(`${LMSApiPrefix()}/external-course-layout`, data);
  }

  /**
   * 팝업 조회
   */
  static getExternalCoursePopup(externalCourseFormId: number): Promise<any> {
    return httpService.get(
      `${LMSApiPrefix()}/external-course-form-popup?externalCourseFormId=${externalCourseFormId}`,
    );
  }

  /**
   * 팝업 등록
   */
  static createExternalCoursePopup(data: any): Promise<any> {
    return httpService.post(`${LMSApiPrefix()}/external-course-form-popup`, data);
  }
}
