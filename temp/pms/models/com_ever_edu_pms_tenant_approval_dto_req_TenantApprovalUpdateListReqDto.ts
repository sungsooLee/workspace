/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByWorkDetailDto } from './com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByWorkDetailDto';
export type com_ever_edu_pms_tenant_approval_dto_req_TenantApprovalUpdateListReqDto = {
    /**
     * 테넌트ID
     */
    tenantId?: number;
    /**
     * 회사ID
     */
    companyId?: number;
    /**
     * 테넌트_결재라인 tenant_approval_b(유니크)
     */
    tenantApprovalId?: number;
    /**
     * 결재업무타입구분
     */
    approvalWorkType?: com_ever_edu_pms_tenant_approval_dto_req_TenantApprovalUpdateListReqDto.approvalWorkType;
    /**
     * 결재업무상세타입구분
     */
    approvalWorkDetailType?: com_ever_edu_pms_tenant_approval_dto_req_TenantApprovalUpdateListReqDto.approvalWorkDetailType;
    /**
     * 교육신청절차구분
     */
    approvalEduProcessType?: com_ever_edu_pms_tenant_approval_dto_req_TenantApprovalUpdateListReqDto.approvalEduProcessType;
    /**
     * 예산제한여부
     */
    isBudgetLimit?: boolean;
    /**
     * 업무별결재관리라인 정보list
     */
    workDetailList?: Array<com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByWorkDetailDto>;
};
export namespace com_ever_edu_pms_tenant_approval_dto_req_TenantApprovalUpdateListReqDto {
    /**
     * 결재업무타입구분
     */
    export enum approvalWorkType {
        STANDARD_APPROVAL = 'STANDARD_APPROVAL',
        INTEGRATION_APPROVAL = 'INTEGRATION_APPROVAL',
    }
    /**
     * 결재업무상세타입구분
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
    /**
     * 교육신청절차구분
     */
    export enum approvalEduProcessType {
        APPLICATION_AFTER_REGIST = 'APPLICATION_AFTER_REGIST',
        APPLICATION_NOW_REGIST = 'APPLICATION_NOW_REGIST',
        NONE = 'NONE',
    }
}

