/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_approval_manage_dto_ApprovalLineTempRegistSubDto } from './com_ever_edu_pms_approval_manage_dto_ApprovalLineTempRegistSubDto';
export type com_ever_edu_pms_approval_manage_dto_req_ApprovalLineTempUpdateListReqDto = {
    /**
     * 결재라인양식id
     */
    approvalLineTempId?: number;
    /**
     * 결재업무타입구분
     */
    approvalWorkType?: com_ever_edu_pms_approval_manage_dto_req_ApprovalLineTempUpdateListReqDto.approvalWorkType;
    /**
     * 결재업무상세타입구분
     */
    approvalWorkDetailType?: com_ever_edu_pms_approval_manage_dto_req_ApprovalLineTempUpdateListReqDto.approvalWorkDetailType;
    /**
     * 기본결재라인ID
     */
    defaultApprovalLineId?: string;
    /**
     * 결재라인목록 - approvalLineList는 화면의 순서대로 넣어주세요. 조회시 역순으로 전달합니다.
     */
    approvalLineList?: Array<com_ever_edu_pms_approval_manage_dto_ApprovalLineTempRegistSubDto>;
};
export namespace com_ever_edu_pms_approval_manage_dto_req_ApprovalLineTempUpdateListReqDto {
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
}

