/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_UserGroupSearchReqDto$SearchByAdmin = {
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 소속명(부서계층 중 최종부서)
     */
    deptName?: string;
    /**
     * 사원번호
     */
    employeeNumber?: string;
    /**
     * 이름
     */
    name?: string;
    /**
     * 계정상태
     */
    accountStatus?: com_ever_edu_pms_user_dto_req_UserGroupSearchReqDto$SearchByAdmin.accountStatus;
};
export namespace com_ever_edu_pms_user_dto_req_UserGroupSearchReqDto$SearchByAdmin {
    /**
     * 계정상태
     */
    export enum accountStatus {
        NORMAL = 'NORMAL',
        LOCK = 'LOCK',
    }
}

