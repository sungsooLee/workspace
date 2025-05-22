/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_role_dto_req_RoleUserDto } from './com_ever_edu_pms_role_dto_req_RoleUserDto';
import type { com_ever_edu_pms_role_dto_req_UserChannelDto } from './com_ever_edu_pms_role_dto_req_UserChannelDto';
import type { com_ever_edu_pms_role_dto_req_UserCompanyDto } from './com_ever_edu_pms_role_dto_req_UserCompanyDto';
import type { com_ever_edu_pms_role_dto_req_UserDeptDto } from './com_ever_edu_pms_role_dto_req_UserDeptDto';
export type com_ever_edu_pms_role_dto_req_RoleUserReqDto = {
    /**
     * 추가할 사용자 ID 목록
     */
    addUserIds?: Array<com_ever_edu_pms_role_dto_req_RoleUserDto>;
    /**
     * 삭제할 사용자 ID 목록
     */
    removeUserIds?: Array<number>;
    /**
     * 추가할 회사 ID 목록
     */
    addCompanies?: Array<com_ever_edu_pms_role_dto_req_UserCompanyDto>;
    /**
     * 삭제할 회사 ID 목록
     */
    removeCompanies?: Array<com_ever_edu_pms_role_dto_req_UserCompanyDto>;
    /**
     * 추가할 채널 ID 목록
     */
    addChannels?: Array<com_ever_edu_pms_role_dto_req_UserChannelDto>;
    /**
     * 삭제할 채널 ID 목록
     */
    removeChannels?: Array<com_ever_edu_pms_role_dto_req_UserChannelDto>;
    /**
     * 추가할 조직 ID 목록
     */
    addDepts?: Array<com_ever_edu_pms_role_dto_req_UserDeptDto>;
    /**
     * 삭제할 조직 ID 목록
     */
    removeDepts?: Array<com_ever_edu_pms_role_dto_req_UserDeptDto>;
};

