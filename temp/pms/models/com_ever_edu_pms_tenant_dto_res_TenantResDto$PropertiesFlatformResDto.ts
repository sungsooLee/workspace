/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 테넌트 속성 허용여부 값
 */
export type com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesFlatformResDto = {
    tenantId?: number;
    tenantName?: string;
    /**
     * 수강신청 설정허용 여부
     */
    isUseEnrollOption?: boolean;
    /**
     * 교재 설정허용 여부
     */
    isUseTextBookOption?: boolean;
    /**
     * 강사 설정허용 여부
     */
    isUseInstructorOption?: boolean;
    /**
     * 이수기준 설정허용 여부
     */
    isUsePassOption?: boolean;
    /**
     * 커뮤니케니티 설정허용 여부
     */
    isUseCommunicationOption?: boolean;
    /**
     * 학습환경 설정허용 여부
     */
    isUseLearningEnvOption?: boolean;
    /**
     * 학습제어 설정허용 여부
     */
    isUseLearningControlOption?: boolean;
    /**
     * 사전/연관학습 설정허용 여부
     */
    isUseRelatedCourseOption?: boolean;
    /**
     * 행정항목 설정허용 여부
     */
    isUseAdminDataOption?: boolean;
    /**
     * 완성차 테넌트 전용 항목 설정허용 여부
     */
    isUseCarTenantCustomOption?: boolean;
    /**
     * 로템 테넌트 전용 항목 설정허용 여부
     */
    isUseRotemTenantCustomOption?: boolean;
    /**
     * 위탁 테넌트 전용 항목 설정허용 여부
     */
    isUseOutsourcingTenantCustomOption?: boolean;
    /**
     * 위아 테넌트 전용 항목 설정허용 여부
     */
    isUseWiaTenantCustomOption?: boolean;
    /**
     * 오토에버 테넌트 전용 항목 설정허용 여부
     */
    isUseAutoeverTenantCustomOption?: boolean;
};

