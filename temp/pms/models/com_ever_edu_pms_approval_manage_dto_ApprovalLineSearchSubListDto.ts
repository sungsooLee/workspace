/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 결재라인목록
 */
export type com_ever_edu_pms_approval_manage_dto_ApprovalLineSearchSubListDto = {
    /**
     * 결재라인양식상세 자동채번ID
     */
    approvalLineTempDetailId?: number;
    /**
     * 결재라인아이디
     */
    approvalLineTempId?: number;
    /**
     * 결재라인ID
     */
    approvalLineId?: string;
    /**
     * 역할(팀장, 담당자, 교육담당자, 교육팀장, 운영자)
     */
    role?: string;
    /**
     * 결재라인유형(Group_Approval_line:조직결재라인/Individual_Approval_line개별결재라인)
     */
    approvalLineSetType?: com_ever_edu_pms_approval_manage_dto_ApprovalLineSearchSubListDto.approvalLineSetType;
    /**
     * 결재순서
     */
    approvalSeq?: number;
};
export namespace com_ever_edu_pms_approval_manage_dto_ApprovalLineSearchSubListDto {
    /**
     * 결재라인유형(Group_Approval_line:조직결재라인/Individual_Approval_line개별결재라인)
     */
    export enum approvalLineSetType {
        GROUP_APPROVAL_LINE = 'GROUP_APPROVAL_LINE',
        INDIVIDUAL_APPROVAL_LINE = 'INDIVIDUAL_APPROVAL_LINE',
        VIRTUAL_APPROVAL_LINE = 'VIRTUAL_APPROVAL_LINE',
    }
}

