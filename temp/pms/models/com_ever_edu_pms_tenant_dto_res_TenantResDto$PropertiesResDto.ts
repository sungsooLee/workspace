/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin';
export type com_ever_edu_pms_tenant_dto_res_TenantResDto$PropertiesResDto = {
    tenantId?: number;
    tenantName?: string;
    /**
     * 수강신청 설정 여부
     */
    isEnrollOption?: boolean;
    /**
     * 교재 설정 여부
     */
    isTextBookOption?: boolean;
    /**
     * 강사 설정 여부
     */
    isInstructorOption?: boolean;
    /**
     * 이수기준 설정 여부
     */
    isPassOption?: boolean;
    /**
     * 커뮤니케니티 설정 여부
     */
    isCommunicationOption?: boolean;
    /**
     * 학습환경 설정 여부
     */
    isLearningEnvOption?: boolean;
    /**
     * 학습제어 설정 여부
     */
    isLearningControlOption?: boolean;
    /**
     * 사전/연관학습 설정 여부
     */
    isRelatedCourseOption?: boolean;
    /**
     * 행정항목 설정 여부
     */
    isAdminDataOption?: boolean;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
    tenantInfo?: com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin;
};

