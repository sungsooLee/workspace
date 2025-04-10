/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_entity_CompanyEntity } from './com_ever_edu_pms_company_entity_CompanyEntity';
/**
 * 부서코드id
 */
export type com_ever_edu_pms_company_entity_DeptEntity = {
    firstRegTmstamp?: string;
    finalUpdateTmstamp?: string;
    firstRgstrId?: string;
    finalUpdaterId?: string;
    deptId?: number;
    companyEntity?: com_ever_edu_pms_company_entity_CompanyEntity;
    deptCode?: string;
    deptManagerId?: string;
    deptManagerName?: string;
    deptName?: string;
    deptEngName?: string;
    upperDeptCode?: string;
    upperDeptNm?: string;
    deptGradeCode?: string;
    deptGradeName?: string;
    isIntegrationDept?: boolean;
    isExistBottomDept?: boolean;
    useYn?: boolean;
    deleteYn?: boolean;
};

