/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_res_CustomUserGroupResDto$ListOnAdmin = {
    userGroupId?: number;
    tenantName?: string;
    userGroupOriginType?: com_ever_edu_pms_user_dto_res_CustomUserGroupResDto$ListOnAdmin.userGroupOriginType;
    originName?: string;
    userGroupName?: string;
    userCount?: number;
    isUsed?: boolean;
    createdDate?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_user_dto_res_CustomUserGroupResDto$ListOnAdmin {
    export enum userGroupOriginType {
        TENANT = 'TENANT',
        CHANNEL = 'CHANNEL',
        PERSONAL = 'PERSONAL',
    }
}

