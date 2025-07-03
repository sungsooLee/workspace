/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_company_dto_req_CompanyDeptReqDto = {
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
    /**
     * 매니저 사원번호 Uuid
     */
    managerEmployeeNumberUuid?: string;
    /**
     * 부서명
     */
    deptName: string;
    /**
     * 부서 설명
     */
    deptDesc?: string;
};

