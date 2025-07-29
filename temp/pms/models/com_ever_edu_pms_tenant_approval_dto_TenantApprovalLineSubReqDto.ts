/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 통합결재라인설정목록
 */
export type com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto = {
    '테넌트_결재라인 자동채번ID(유니크)'?: number;
    '테넌트ID'?: number;
    '회사ID'?: number;
    '테넌트결재기본ID'?: number;
    '결재업무유형 (standard_approval, integration_approval 표준결재/통합결재)'?: com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto.'결재업무유형 (standard_approval, integration_approval 표준결재/통합결재)';
    '결재업무유형상세(수강신청, 자격증이력, 어학이력 등)'?: com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto.'결재업무유형상세(수강신청, 자격증이력, 어학이력 등)';
    '결재관리(플랫폼)의 결재라인번호'?: number;
    '결재관리의 결재라인(결재그룹)번호'?: string;
    '결재라인번호-그룹핑한 각 결재번호 ID'?: string;
    '역할(팀장, 담당자, 교육담당자, 교육팀장, 운영자)'?: string;
    '결재라인유형(Group_Approval_line:조직결재라인/Individual_Approval_line개별결재라인)'?: com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto.'결재라인유형(Group_Approval_line:조직결재라인/Individual_Approval_line개별결재라인)';
    '결재순서'?: number;
    '사용여부'?: boolean;
};
export namespace com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto {
    export enum '결재업무유형 (standard_approval, integration_approval 표준결재/통합결재)' {
        STANDARD_APPROVAL = 'STANDARD_APPROVAL',
        INTEGRATION_APPROVAL = 'INTEGRATION_APPROVAL',
    }
    export enum '결재업무유형상세(수강신청, 자격증이력, 어학이력 등)' {
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
    export enum '결재라인유형(Group_Approval_line:조직결재라인/Individual_Approval_line개별결재라인)' {
        GROUP_APPROVAL_LINE = 'GROUP_APPROVAL_LINE',
        INDIVIDUAL_APPROVAL_LINE = 'INDIVIDUAL_APPROVAL_LINE',
        VIRTUAL_APPROVAL_LINE = 'VIRTUAL_APPROVAL_LINE',
    }
}

