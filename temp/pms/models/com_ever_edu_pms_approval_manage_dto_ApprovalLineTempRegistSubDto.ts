/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_approval_manage_dto_ApprovalLineSearchSubListDto } from './com_ever_edu_pms_approval_manage_dto_ApprovalLineSearchSubListDto';
/**
 * 결재라인목록 - approvalLineList는 화면의 순서대로 넣어주세요. 조회시 역순으로 전달합니다.
 */
export type com_ever_edu_pms_approval_manage_dto_ApprovalLineTempRegistSubDto = {
    /**
     * 기본결재라인여부
     */
    defaultApprovalLineYn?: boolean;
    /**
     * 결재라인목록
     */
    approvalLineSubList?: Array<com_ever_edu_pms_approval_manage_dto_ApprovalLineSearchSubListDto>;
};

