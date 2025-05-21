/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_res_CompanyDeptSubCompanyResDto } from './com_ever_edu_pms_company_dto_res_CompanyDeptSubCompanyResDto';
import type { com_ever_edu_pms_company_dto_res_CompanyDeptSubUserResDto } from './com_ever_edu_pms_company_dto_res_CompanyDeptSubUserResDto';
export type com_ever_edu_pms_company_dto_res_CompanyDeptResDto = {
    /**
     * 부서ID
     */
    deptId?: number;
    /**
     * 뎁스
     */
    depth?: number;
    /**
     * 정렬순서
     */
    sortOrder?: number;
    companyInfo?: com_ever_edu_pms_company_dto_res_CompanyDeptSubCompanyResDto;
    /**
     * 부서코드
     */
    deptCode?: string;
    managerUserInfo?: com_ever_edu_pms_company_dto_res_CompanyDeptSubUserResDto;
    /**
     * 부서명
     */
    deptName?: string;
    /**
     * 부서영문명
     */
    deptEngName?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 삭제여부
     */
    isDeleted?: boolean;
    /**
     * 상위부서코드
     */
    parent?: number;
    /**
     * 하위메뉴
     */
    childList?: Array<com_ever_edu_pms_company_dto_res_CompanyDeptResDto>;
    /**
     * 등록자ID
     */
    createdBy?: string;
    /**
     * 등록일시
     */
    createdDate?: string;
    /**
     * 최종수정자ID
     */
    lastModifiedBy?: string;
    /**
     * 최종수정일시
     */
    modifiedDate?: string;
};

