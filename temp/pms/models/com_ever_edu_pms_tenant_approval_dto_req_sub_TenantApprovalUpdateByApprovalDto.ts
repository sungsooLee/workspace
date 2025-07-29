/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByUserDto } from './com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByUserDto';
/**
 * 결재관리라인 목록
 */
export type com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto = {
    /**
     * 결재선ID
     */
    approvalLineId?: string;
    /**
     * 결재순번
     */
    approvalSeq?: number;
    /**
     * 역할
     */
    role?: string;
    /**
     * 결재업무타입구분
     */
    approvalWorkType?: com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto.approvalWorkType;
    /**
     * 결재업무타입구분명
     */
    approvalWorkTypeName?: string;
    /**
     * 결재업무상세타입구분
     */
    approvalWorkDetailType?: com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto.approvalWorkDetailType;
    /**
     * 결재라인유형구분
     */
    approvalLineType?: com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto.approvalLineType;
    /**
     * 결재라인유형구분명
     */
    approvalLineTypeName?: string;
    /**
     * 결재업무상세타입구분명
     */
    approvalWorkDetailTypeName?: string;
    /**
     * 결재관리(플랫폼)의 결재라인번호
     */
    orgApprovalLineTempId?: number;
    /**
     * 결재관리의 결재라인(결재그룹)번호(approval_line_template_detail_r.approval_line_id
     */
    orgApprovalLineId?: string;
    /**
     * 하위 결재관리라인 목록
     */
    approvalUserList?: Array<com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByUserDto>;
};
export namespace com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto {
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
     * 결재라인유형구분
     */
    export enum approvalLineType {
        GROUP_APPROVAL_LINE = 'GROUP_APPROVAL_LINE',
        INDIVIDUAL_APPROVAL_LINE = 'INDIVIDUAL_APPROVAL_LINE',
        VIRTUAL_APPROVAL_LINE = 'VIRTUAL_APPROVAL_LINE',
    }
}

