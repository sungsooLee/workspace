/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_company_dto_res_CompanyDeptUserResDto = {
    /**
     * 회사코드
     */
    companyCode?: string;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 회사유형
     */
    companyType?: com_ever_edu_pms_company_dto_res_CompanyDeptUserResDto.companyType;
    /**
     * 부서ID
     */
    deptId?: number;
    /**
     * 부서코드
     */
    deptCode?: string;
    /**
     * 부서명
     */
    deptName?: string;
    /**
     * 조직등록유형
     */
    hrInfoManageType?: com_ever_edu_pms_company_dto_res_CompanyDeptUserResDto.hrInfoManageType;
    /**
     * 유저 uuid
     */
    uuid?: string;
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * 성명
     */
    name?: string;
    retireDate?: string;
    userState?: com_ever_edu_pms_company_dto_res_CompanyDeptUserResDto.userState;
};
export namespace com_ever_edu_pms_company_dto_res_CompanyDeptUserResDto {
    /**
     * 회사유형
     */
    export enum companyType {
        CAR = 'CAR',
        GLOBAL = 'GLOBAL',
        GROUP = 'GROUP',
        SERVICE = 'SERVICE',
        SALES = 'SALES',
        GLOBAL_DEALER = 'GLOBAL_DEALER',
        ETC_SERVICE = 'ETC_SERVICE',
        HELLO_HMG = 'HELLO_HMG',
        EDU_SERVICE = 'EDU_SERVICE',
        ETC = 'ETC',
    }
    /**
     * 조직등록유형
     */
    export enum hrInfoManageType {
        MANUAL_MANAGE = 'MANUAL_MANAGE',
        AUTO_MANAGE = 'AUTO_MANAGE',
    }
    export enum userState {
        WAIT = 'WAIT',
        NORMAL = 'NORMAL',
        HALT = 'HALT',
        LEAVE = 'LEAVE',
        DELETE = 'DELETE',
    }
}

