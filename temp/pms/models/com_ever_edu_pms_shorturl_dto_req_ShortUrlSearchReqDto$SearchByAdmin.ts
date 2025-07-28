/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_shorturl_dto_req_ShortUrlSearchReqDto$SearchByAdmin = {
    /**
     * 단축 URL 구분
     */
    shortUrlCreateType?: com_ever_edu_pms_shorturl_dto_req_ShortUrlSearchReqDto$SearchByAdmin.shortUrlCreateType | null;
    /**
     * 단축URL명
     */
    shortUrlName?: string | null;
    /**
     * 등록기간 시작일
     */
    createdDateFrom?: string;
    /**
     * 등록기간 종료일
     */
    createdDateTo?: string;
};
export namespace com_ever_edu_pms_shorturl_dto_req_ShortUrlSearchReqDto$SearchByAdmin {
    /**
     * 단축 URL 구분
     */
    export enum shortUrlCreateType {
        COURSE_DETAIL = 'COURSE_DETAIL',
        MANUAL = 'MANUAL',
    }
}

