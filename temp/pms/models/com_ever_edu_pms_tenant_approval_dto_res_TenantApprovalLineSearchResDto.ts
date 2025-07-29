/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByCompanyDto } from './com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByCompanyDto';
export type com_ever_edu_pms_tenant_approval_dto_res_TenantApprovalLineSearchResDto = {
    /**
     * 테넌트ID
     */
    tenantId?: number;
    /**
     * 테넌트명
     */
    tenantName?: string;
    /**
     * 하위회사결재목록(회사별>업무유형구분별>결재라인별>결재자리스트 순으로 tree구조
     */
    companyApprovalList?: Array<com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByCompanyDto>;
};

