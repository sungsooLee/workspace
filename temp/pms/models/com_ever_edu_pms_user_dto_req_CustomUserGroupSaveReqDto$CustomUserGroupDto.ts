/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_user_dto_req_CustomUserGroupSaveReqDto$UserUserGroupSaveDto } from './com_ever_edu_pms_user_dto_req_CustomUserGroupSaveReqDto$UserUserGroupSaveDto';
export type com_ever_edu_pms_user_dto_req_CustomUserGroupSaveReqDto$CustomUserGroupDto = {
    /**
     * 유저그룹 수동관리 유형
     */
    userGroupOriginType?: com_ever_edu_pms_user_dto_req_CustomUserGroupSaveReqDto$CustomUserGroupDto.userGroupOriginType | null;
    /**
     * 유저그룹 수동관리 유형 맵핑 UUID
     */
    userGroupOriginMappingId?: string | null;
    /**
     * 유저그룹 수동관리명
     */
    userGroupName?: string | null;
    /**
     * 테넌트 ID
     */
    tenantId?: number | null;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 유저그룹 대상자 설정 유형
     */
    assignmentType?: com_ever_edu_pms_user_dto_req_CustomUserGroupSaveReqDto$CustomUserGroupDto.assignmentType | null;
    /**
     * 유저목록
     */
    userList?: Array<com_ever_edu_pms_user_dto_req_CustomUserGroupSaveReqDto$UserUserGroupSaveDto> | null;
};
export namespace com_ever_edu_pms_user_dto_req_CustomUserGroupSaveReqDto$CustomUserGroupDto {
    /**
     * 유저그룹 수동관리 유형
     */
    export enum userGroupOriginType {
        TENANT = 'TENANT',
        CHANNEL = 'CHANNEL',
        PERSONAL = 'PERSONAL',
    }
    /**
     * 유저그룹 대상자 설정 유형
     */
    export enum assignmentType {
        USER_GROUP_BASED = 'USER_GROUP_BASED',
        DIRECT_USER_BASED = 'DIRECT_USER_BASED',
    }
}

