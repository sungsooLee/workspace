/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByUserDto } from './com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByUserDto';
/**
 * 결재관리라인 목록
 */
export type com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByApprovalDto = {
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
     * 결재라인유형구분
     */
    approvalLineType?: com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByApprovalDto.approvalLineType;
    /**
     * 결재라인유형구분명
     */
    approvalLineTypeName?: string;
    /**
     * 결재자 유형 TEAM:팀 결재 /APPROVAL_USER:결재자 지정결재
     */
    approvalLineApprType?: com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByApprovalDto.approvalLineApprType;
    /**
     * 결재팀 ID(가상조직/개별결재라인) 팀선택시 추가.
     */
    approvalLineDeptId?: number;
    /**
     * 결재팀 명
     */
    approvalLineDeptName?: string;
    /**
     * 하위 결재관리라인 목록
     */
    approvalUserList?: Array<com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByUserDto>;
};
export namespace com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByApprovalDto {
    /**
     * 결재라인유형구분
     */
    export enum approvalLineType {
        GROUP_APPROVAL_LINE = 'GROUP_APPROVAL_LINE',
        INDIVIDUAL_APPROVAL_LINE = 'INDIVIDUAL_APPROVAL_LINE',
        VIRTUAL_APPROVAL_LINE = 'VIRTUAL_APPROVAL_LINE',
    }
    /**
     * 결재자 유형 TEAM:팀 결재 /APPROVAL_USER:결재자 지정결재
     */
    export enum approvalLineApprType {
        TEAM = 'TEAM',
        APPROVAL_USER = 'APPROVAL_USER',
        AUTO = 'AUTO',
    }
}

