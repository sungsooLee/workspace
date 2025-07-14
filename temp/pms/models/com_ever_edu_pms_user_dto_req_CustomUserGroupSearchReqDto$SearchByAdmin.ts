/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_CustomUserGroupSearchReqDto$SearchByAdmin = {
    /**
     * 테넌트ID
     */
    tenantId: number;
    /**
     * 유저그룹유형
     */
    userGroupOriginType?: com_ever_edu_pms_user_dto_req_CustomUserGroupSearchReqDto$SearchByAdmin.userGroupOriginType;
    /**
     * 채널명
     */
    channelName?: string;
    /**
     * 개인명
     */
    personName?: string;
    /**
     * 유저그룹명
     */
    userGroupName?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 수정기간 시작일
     */
    modifiedStartDate?: string;
    /**
     * 수정기간 종료일
     */
    modifiedEndDate?: string;
};
export namespace com_ever_edu_pms_user_dto_req_CustomUserGroupSearchReqDto$SearchByAdmin {
    /**
     * 유저그룹유형
     */
    export enum userGroupOriginType {
        TENANT = 'TENANT',
        CHANNEL = 'CHANNEL',
        PERSONAL = 'PERSONAL',
    }
}

