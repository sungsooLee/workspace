/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 추가 설정 항목
 */
export type com_ever_edu_pms_tenant_dto_req_TenantPropertiesFlatformUpdateReqDto = {
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 수강신청 설정 여부
     */
    isUseEnrollOption: boolean;
    /**
     * 교재 설정 여부
     */
    isUseTextBookOption: boolean;
    /**
     * 강사 설정 여부
     */
    isUseInstructorOption: boolean;
    /**
     * 이수기준 설정 여부
     */
    isUsePassOption: boolean;
    /**
     * 커뮤니케니티 설정 여부
     */
    isUseCommunicationOption: boolean;
    /**
     * 학습환경 설정 여부
     */
    isUseLearningEnvOption: boolean;
    /**
     * 학습제어 설정 여부
     */
    isUseLearningControlOption: boolean;
    /**
     * 사전/연관학습 설정 여부
     */
    isUseRelatedCourseOption: boolean;
    /**
     * 행정항목 설정 여부
     */
    isUseAdminDataOption: boolean;
    /**
     * 완성차 테넌트 전용 항목 설정 여부
     */
    isUseCarTenantCustomOption: boolean;
    /**
     * 로템 테넌트 전용 항목 설정 여부
     */
    isUseRotemTenantCustomOption: boolean;
    /**
     * 위탁 테넌트 전용 항목 설정 여부
     */
    isUseOutsourcingTenantCustomOption: boolean;
    /**
     * 위아 테넌트 전용 항목 설정 여부
     */
    isUseWiaTenantCustomOption: boolean;
    /**
     * 오토에버 테넌트 전용 항목 설정 여부
     */
    isUseAutoeverTenantCustomOption: boolean;
};

