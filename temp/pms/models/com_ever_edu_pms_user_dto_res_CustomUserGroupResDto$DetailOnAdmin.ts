/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_user_dto_res_BlackAndWhiteTargetDto } from './com_ever_edu_pms_user_dto_res_BlackAndWhiteTargetDto';
export type com_ever_edu_pms_user_dto_res_CustomUserGroupResDto$DetailOnAdmin = {
    userGroupId?: number;
    tenantId?: number;
    tenantName?: string;
    userGroupOriginType?: com_ever_edu_pms_user_dto_res_CustomUserGroupResDto$DetailOnAdmin.userGroupOriginType;
    userGroupOriginMappingId?: string;
    originName?: string;
    userGroupName?: string;
    assignmentType?: com_ever_edu_pms_user_dto_res_CustomUserGroupResDto$DetailOnAdmin.assignmentType;
    userCount?: number;
    isUsed?: boolean;
    /**
     * 등록일
     */
    createdDate?: string;
    /**
     * 수정일
     */
    modifiedDate?: string;
    userList?: Array<com_ever_edu_pms_user_dto_res_BlackAndWhiteTargetDto>;
};
export namespace com_ever_edu_pms_user_dto_res_CustomUserGroupResDto$DetailOnAdmin {
    export enum userGroupOriginType {
        TENANT = 'TENANT',
        CHANNEL = 'CHANNEL',
        PERSONAL = 'PERSONAL',
    }
    export enum assignmentType {
        USER_GROUP_BASED = 'USER_GROUP_BASED',
        DIRECT_USER_BASED = 'DIRECT_USER_BASED',
    }
}

