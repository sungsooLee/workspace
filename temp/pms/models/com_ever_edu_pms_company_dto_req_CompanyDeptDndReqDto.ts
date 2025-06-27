/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_company_dto_req_CompanyDeptDndReqDto = {
    /**
     * 회사코드
     */
    companyCode: string;
    /**
     * 상위부서Id, root 아닐경우 상위부서 ID 필수
     */
    parentDeptId?: number;
    /**
     * 정렬순서
     */
    sortOrder?: number;
};

