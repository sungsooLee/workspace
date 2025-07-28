/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_privacyaccess_dto_req_PrivacyAccessLogSearchReqDto$SearchByAdmin = {
    /**
     * 회사 ID
     */
    companyId?: number | null;
    /**
     * 조회자
     */
    userName?: string | null;
    /**
     * 조회자 사번
     */
    employeeNumber?: string;
    /**
     * 다운로드 사유
     */
    downloadReasonType?: string;
    /**
     * 다운로드기간 시작일
     */
    createdDateFrom?: string;
    /**
     * 다운로드기간 종료일
     */
    createdDateTo?: string;
};

