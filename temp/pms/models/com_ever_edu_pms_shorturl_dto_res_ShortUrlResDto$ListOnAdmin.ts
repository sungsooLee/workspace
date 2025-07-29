/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin = {
    shortUrlId?: number;
    shortUrlCreateType?: com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin.shortUrlCreateType;
    shortUrlMethodType?: com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin.shortUrlMethodType;
    originalUrl?: string;
    shortCode?: string;
    shortUrlName?: string;
    shortUrlContent?: string;
    isAccessControlled?: boolean;
    clickCount?: number;
    createdDate?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ListOnAdmin {
    export enum shortUrlCreateType {
        COURSE_DETAIL = 'COURSE_DETAIL',
        MANUAL = 'MANUAL',
    }
    export enum shortUrlMethodType {
        GET = 'GET',
        POST = 'POST',
    }
}

