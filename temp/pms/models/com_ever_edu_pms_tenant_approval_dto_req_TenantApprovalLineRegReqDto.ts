/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto } from './com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto';
export type com_ever_edu_pms_tenant_approval_dto_req_TenantApprovalLineRegReqDto = {
    /**
     * 테넌트ID
     */
    tenantId?: number;
    /**
     * 회사ID
     */
    companyId?: number;
    /**
     * 내부결재라인설정목록
     */
    insideApprovalLineSetList?: Array<com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto>;
    /**
     * 통합결재라인설정목록
     */
    interApprovalLineSetList?: Array<com_ever_edu_pms_tenant_approval_dto_TenantApprovalLineSubReqDto>;
};

