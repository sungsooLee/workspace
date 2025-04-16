/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_entity_CompanyEntity } from './com_ever_edu_pms_company_entity_CompanyEntity';
/**
 * 부서코드id
 */
export type com_ever_edu_pms_company_entity_DeptEntity = {
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    deptId?: number;
    companyEntity?: com_ever_edu_pms_company_entity_CompanyEntity;
    deptCode?: string;
    deptManagerId?: string;
    deptManagerName?: string;
    deptName?: string;
    deptEngName?: string;
    parentDepartmentCd?: string;
    parentDepartmentName?: string;
    deptGradeCode?: string;
    deptGradeName?: string;
    isIntegratOranization?: boolean;
    isLowlevelDepartmentExist?: boolean;
    isUsed?: boolean;
    isDeleted?: boolean;
};

