/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 결재라인목록
 */
export type com_ever_edu_pms_approval_manage_dto_res_ApprovalLineSearchSubListDto = {
    /**
     * 결재라인양식상세 자동채번ID
     */
    approvalLineTempDetailId?: number;
    /**
     * 결재라인아이디
     */
    approvalLineTempId?: number;
    /**
     * 결재라인번호
     */
    approvalLineSeq?: number;
    /**
     * 역할(팀장, 담당자, 교육담당자, 교육팀장, 운영자)
     */
    role?: string;
    /**
     * 결재라인유형(Group_Approval_line:조직결재라인/Individual_Approval_line개별결재라인)
     */
    approvalLineType?: com_ever_edu_pms_approval_manage_dto_res_ApprovalLineSearchSubListDto.approvalLineType;
    /**
     * 정렬순서
     */
    sortSeq?: number;
    /**
     * 결재순서
     */
    approvalSeq?: number;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_approval_manage_dto_res_ApprovalLineSearchSubListDto {
    /**
     * 결재라인유형(Group_Approval_line:조직결재라인/Individual_Approval_line개별결재라인)
     */
    export enum approvalLineType {
        GROUP_APPROVAL_LINE = 'GROUP_APPROVAL_LINE',
        INDIVIDUAL_APPROVAL_LINE = 'INDIVIDUAL_APPROVAL_LINE',
    }
}

