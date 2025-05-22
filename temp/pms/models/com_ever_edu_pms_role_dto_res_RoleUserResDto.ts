/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_role_dto_res_RoleUserResDto = {
    /**
     * 사용자 ID
     */
    userId?: number;
    /**
     * Email
     */
    email?: string;
    /**
     * 사용자 이름
     */
    userName?: string;
    /**
     * 사내 사용자 여부
     */
    isInHouse?: boolean;
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * 회사 이름
     */
    companyName?: string;
    /**
     * 조직 ID
     */
    deptId?: number;
    /**
     * 조직 이름
     */
    deptName?: string;
    /**
     * 권한 시작일자
     */
    startDate?: string;
    /**
     * 권한 종료일자
     */
    endDate?: string;
    /**
     * 역할 사용 여부
     */
    isUsed?: boolean;
    /**
     * 데이터 접근 범위(회사)
     */
    companyIds?: Array<number>;
    /**
     * 데이터 접근 범위(채널)
     */
    channelIds?: Array<number>;
    /**
     * 데이터 접근 범위(조직)
     */
    deptIds?: Array<number>;
};

