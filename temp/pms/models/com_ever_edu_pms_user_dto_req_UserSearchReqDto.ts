/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_user_dto_req_UserSearchReqDto = {
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 회사 타입
     */
    companyType?: com_ever_edu_pms_user_dto_req_UserSearchReqDto.companyType;
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * 부서 ID
     */
    deptId?: number;
    /**
     * 역할 ID
     */
    roleId?: number;
    /**
     * 사용자명
     */
    userName?: string;
    /**
     * Email
     */
    email?: string;
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * 계정상태
     */
    userState?: com_ever_edu_pms_user_dto_req_UserSearchReqDto.userState;
    /**
     * 회원가입 기간 시작일
     */
    createdDateFrom?: string;
    /**
     * 회원가입 기간 종료일
     */
    createdDateTo?: string;
};
export namespace com_ever_edu_pms_user_dto_req_UserSearchReqDto {
    /**
     * 회사 타입
     */
    export enum companyType {
        CAR = 'CAR',
        GLOBAL = 'GLOBAL',
        GROUP = 'GROUP',
        SERVICE = 'SERVICE',
        SALES = 'SALES',
        GLOBAL_DEALER = 'GLOBAL_DEALER',
        ETC_SERVICE = 'ETC_SERVICE',
        HELLO_HMG = 'HELLO_HMG',
        EDU_SERVICE = 'EDU_SERVICE',
        ETC = 'ETC',
    }
    /**
     * 계정상태
     */
    export enum userState {
        NORMAL = 'NORMAL',
        WAIT = 'WAIT',
        DORMANT = 'DORMANT',
        LOCKED = 'LOCKED',
    }
}

