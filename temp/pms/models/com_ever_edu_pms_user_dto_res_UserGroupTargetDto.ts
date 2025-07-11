/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_res_UserGroupTargetDto = {
    /**
     * 유저그룹유형
     */
    userGroupType?: com_ever_edu_pms_user_dto_res_UserGroupTargetDto.userGroupType;
    /**
     * 유저그룹Id
     */
    userGroupId?: number;
    userGroupName?: string;
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
    userStatus?: com_ever_edu_pms_user_dto_res_UserGroupTargetDto.userStatus;
    accountStatus?: com_ever_edu_pms_user_dto_res_UserGroupTargetDto.accountStatus;
};
export namespace com_ever_edu_pms_user_dto_res_UserGroupTargetDto {
    /**
     * 유저그룹유형
     */
    export enum userGroupType {
        ORGANIZATION = 'ORGANIZATION',
        JOB_GROUP = 'JOB_GROUP',
        JOB = 'JOB',
        JOB_TITLE = 'JOB_TITLE',
        JOB_POSITION = 'JOB_POSITION',
        CUSTOM_GROUP = 'CUSTOM_GROUP',
    }
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

