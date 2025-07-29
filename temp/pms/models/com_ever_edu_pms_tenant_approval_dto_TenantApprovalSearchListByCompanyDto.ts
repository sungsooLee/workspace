/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByWorkDetailDto } from './com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByWorkDetailDto';
/**
 * 하위회사결재목록(회사별>업무유형구분별>결재라인별>결재자리스트 순으로 tree구조
 */
export type com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByCompanyDto = {
    /**
     * 회사ID
     */
    companyId?: number;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 결재관리라인 목록(approvalDetailType-결재업무유형상세 별 결재라인 리스트)
     */
    approvalTypeList?: Array<com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByWorkDetailDto>;
    approvalList?: Array<com_ever_edu_pms_tenant_approval_dto_TenantApprovalSearchListByWorkDetailDto>;
};

