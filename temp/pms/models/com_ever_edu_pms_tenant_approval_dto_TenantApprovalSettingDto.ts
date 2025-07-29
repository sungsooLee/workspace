/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_tenant_approval_dto_TenantApprovalSettingDto = {
    /**
     * 양식사용여부
     */
    formatIsUsed?: boolean;
    /**
     * 테넌트사용여부
     */
    tenantIsUsed?: boolean;
    /**
     * 결재업무유형 (standard_approval, integration_approval 표준결재/통합결재)
     */
    approvalWorkType?: com_ever_edu_pms_tenant_approval_dto_TenantApprovalSettingDto.approvalWorkType;
    /**
     * 결재업무유형상세(수강신청, 자격증이력, 어학이력 등)
     */
    approvalWorkDetailType?: com_ever_edu_pms_tenant_approval_dto_TenantApprovalSettingDto.approvalWorkDetailType;
};
export namespace com_ever_edu_pms_tenant_approval_dto_TenantApprovalSettingDto {
    /**
     * 결재업무유형 (standard_approval, integration_approval 표준결재/통합결재)
     */
    export enum approvalWorkType {
        STANDARD_APPROVAL = 'STANDARD_APPROVAL',
        INTEGRATION_APPROVAL = 'INTEGRATION_APPROVAL',
    }
    /**
     * 결재업무유형상세(수강신청, 자격증이력, 어학이력 등)
     */
    export enum approvalWorkDetailType {
        COURSE_REGIST = 'COURSE_REGIST',
        QUALIFICATIONS_RECODE = 'QUALIFICATIONS_RECODE',
        QUALIFICATIONS_EXAM_FEE_APPLICATION = 'QUALIFICATIONS_EXAM_FEE_APPLICATION',
        QUALIFICATIONS_ACQ_EXAM_RESULT = 'QUALIFICATIONS_ACQ_EXAM_RESULT',
        LANG_STUDY_RECORD = 'LANG_STUDY_RECORD',
        LANG_STUDY_EXAM_FEE = 'LANG_STUDY_EXAM_FEE',
        STUDY_GROUP_OPENED = 'STUDY_GROUP_OPENED',
        STUDY_GROUP_RESULT = 'STUDY_GROUP_RESULT',
        OJT_REGIST = 'OJT_REGIST',
        LEARNING_LAB_OPENED = 'LEARNING_LAB_OPENED',
        LEARNING_LAB_EXTENSION = 'LEARNING_LAB_EXTENSION',
        IDP_PLAN = 'IDP_PLAN',
        IDP_RESULT = 'IDP_RESULT',
        GROUP_EXTERNAL_ENROLL_APPLICATION = 'GROUP_EXTERNAL_ENROLL_APPLICATION',
        GROUP_EXTERNAL_ENROLL_RESULT = 'GROUP_EXTERNAL_ENROLL_RESULT',
        HYUNDAI_EXTERNAL_ENROLL_APPLICATION = 'HYUNDAI_EXTERNAL_ENROLL_APPLICATION',
        HYUNDAI_EXTERNAL_ENROLL_RESULT = 'HYUNDAI_EXTERNAL_ENROLL_RESULT',
        KIA_EXTERNAL_ENROLL_APPLICATION = 'KIA_EXTERNAL_ENROLL_APPLICATION',
        KIA_EXTERNAL_ENROLL_RESULT = 'KIA_EXTERNAL_ENROLL_RESULT',
        CAR_EDU_BUDGET_BUSINESS_PLAN = 'CAR_EDU_BUDGET_BUSINESS_PLAN',
        CAR_EDU_BUDGET_EXE = 'CAR_EDU_BUDGET_EXE',
        CAR_EDU_BUDGET_END = 'CAR_EDU_BUDGET_END',
    }
}

