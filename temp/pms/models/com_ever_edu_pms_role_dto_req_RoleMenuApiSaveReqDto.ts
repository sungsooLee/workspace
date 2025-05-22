/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_role_dto_req_MenuApiDto } from './com_ever_edu_pms_role_dto_req_MenuApiDto';
export type com_ever_edu_pms_role_dto_req_RoleMenuApiSaveReqDto = {
    /**
     * 추가할 메뉴 ID 목록
     */
    addMenuIds?: Array<number>;
    /**
     * 삭제할 메뉴 ID 목록
     */
    removeMenuIds?: Array<number>;
    /**
     * 추가할 API ID 목록
     */
    addApis?: Array<com_ever_edu_pms_role_dto_req_MenuApiDto>;
    /**
     * 삭제할 API ID 목록
     */
    removeApis?: Array<com_ever_edu_pms_role_dto_req_MenuApiDto>;
};

