/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_tenant_dto_req_TenantPropertiesUpdateReqDto = {
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 수강 신청 결재라인 사용 여부
     */
    isUseApprovalLine?: boolean;
    /**
     * 학습시간 제한 여부
     */
    isLimitLearningTime?: boolean;
    /**
     * 1일 진도 제한 여부
     */
    isLimitDailyProgress?: boolean;
    /**
     * 진도 초기화 사용 여부
     */
    isResetProgress?: boolean;
    /**
     * 교재 사용 여부
     */
    isUseTextbook?: boolean;
    /**
     * 1인당 교육비 사용 여부
     */
    isUseTrainingCostPerPerson?: boolean;
    /**
     * 고용보험 환급 사용 여부
     */
    isUseEmploymentInsuranceRefund?: boolean;
    /**
     * 수료증 제공 여부
     */
    isProvideCertificate?: boolean;
    /**
     * 학습 포인트(마일리지) 사용 여부
     */
    isUseLearningPoint?: boolean;
    /**
     * 사전 레벨 테스트 사용 여부
     */
    isUsePreLevelTest?: boolean;
    /**
     * 과정 플래그 사용 여부
     */
    isUseCourseFlag?: boolean;
};

