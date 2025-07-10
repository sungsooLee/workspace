/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_res_BlackAndWhiteTargetDto = {
    /**
     * 회사Id
     */
    companyId?: number;
    /**
     * 회사code
     */
    companyCode?: string;
    companyName?: string;
    deptId?: number;
    deptName?: string;
    employeeNumber?: string;
    userUuid?: string;
    userName?: string;
    userStatus?: com_ever_edu_pms_user_dto_res_BlackAndWhiteTargetDto.userStatus;
    accountStatus?: com_ever_edu_pms_user_dto_res_BlackAndWhiteTargetDto.accountStatus;
};
export namespace com_ever_edu_pms_user_dto_res_BlackAndWhiteTargetDto {
    export enum userStatus {
        ACTIVE = 'ACTIVE',
        SUSPENDED = 'SUSPENDED',
        LEAVE = 'LEAVE',
    }
    export enum accountStatus {
        NORMAL = 'NORMAL',
        LOCK = 'LOCK',
    }
}

