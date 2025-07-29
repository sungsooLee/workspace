/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto } from './com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto';
/**
 * 업무별결재관리라인 정보list
 */
export type com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByWorkDetailDto = {
    /**
     * 테넌트_결재라인 자동채번ID(유니크)
     */
    tenantApprovalLineId?: number;
    /**
     * 결재선ID
     */
    approvalLineId?: string;
    /**
     * 순번
     */
    sortIdx?: number;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 결재관리라인 목록
     */
    approvalLineList?: Array<com_ever_edu_pms_tenant_approval_dto_req_sub_TenantApprovalUpdateByApprovalDto>;
};

