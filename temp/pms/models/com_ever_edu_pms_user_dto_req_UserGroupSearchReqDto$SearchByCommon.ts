/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_user_dto_req_BlackAndWhiteTargetSearchReqDto$SearchByAdmin } from './com_ever_edu_pms_user_dto_req_BlackAndWhiteTargetSearchReqDto$SearchByAdmin';
export type com_ever_edu_pms_user_dto_req_UserGroupSearchReqDto$SearchByCommon = {
    groups?: Array<com_ever_edu_pms_user_dto_req_BlackAndWhiteTargetSearchReqDto$SearchByAdmin>;
    /**
     * 회사Id
     */
    companyId?: number;
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
    userName?: string;
    /**
     * 계정상태 (enum:AccountStatus)
     */
    accountStatus?: com_ever_edu_pms_user_dto_req_UserGroupSearchReqDto$SearchByCommon.accountStatus;
};
export namespace com_ever_edu_pms_user_dto_req_UserGroupSearchReqDto$SearchByCommon {
    /**
     * 계정상태 (enum:AccountStatus)
     */
    export enum accountStatus {
        NORMAL = 'NORMAL',
        LOCK = 'LOCK',
    }
}

