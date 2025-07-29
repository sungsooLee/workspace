/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ShortUrlParamDto } from './com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ShortUrlParamDto';
import type { com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ShortUrlUserDto } from './com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ShortUrlUserDto';
export type com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin = {
    shortUrlId?: number;
    shortUrlCreateType?: com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin.shortUrlCreateType;
    shortUrlMethodType?: com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin.shortUrlMethodType;
    originalUrl?: string;
    shortCode?: string;
    shortUrlName?: string;
    shortUrlContent?: string;
    isAccessControlled?: boolean;
    clickCount?: number;
    createdDate?: string;
    modifiedDate?: string;
    queryParams?: Array<com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ShortUrlParamDto>;
    shortUrlUserList?: Array<com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$ShortUrlUserDto>;
};
export namespace com_ever_edu_pms_shorturl_dto_res_ShortUrlResDto$DetailOnAdmin {
    export enum shortUrlCreateType {
        COURSE_DETAIL = 'COURSE_DETAIL',
        MANUAL = 'MANUAL',
    }
    export enum shortUrlMethodType {
        GET = 'GET',
        POST = 'POST',
    }
}

