/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_shorturl_dto_req_ShortUrlParamSaveReqDto$ShortUrlParamDto } from './com_ever_edu_pms_shorturl_dto_req_ShortUrlParamSaveReqDto$ShortUrlParamDto';
export type com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto = {
    /**
     * 단축 URL 구분
     */
    shortUrlCreateType?: com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto.shortUrlCreateType | null;
    /**
     * 단축 URL Method 구분
     */
    shortUrlMethodType?: com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto.shortUrlMethodType | null;
    /**
     * 원본 URL
     */
    originalUrl?: string | null;
    /**
     * 단축 URL 코드
     */
    shortCode?: string | null;
    /**
     * 단축 URL 명
     */
    shortUrlName?: string | null;
    /**
     * 내용
     */
    shortUrlContent?: string | null;
    /**
     * 파라메터목록
     */
    queryParams?: Array<com_ever_edu_pms_shorturl_dto_req_ShortUrlParamSaveReqDto$ShortUrlParamDto> | null;
    /**
     * 접근제어사용여부
     */
    isAccessControlled?: boolean | null;
    /**
     * 접근가능대상자
     */
    shortUrlUserList?: Array<string | null> | null;
};
export namespace com_ever_edu_pms_shorturl_dto_req_ShortUrlSaveReqDto$ShortUrlDto {
    /**
     * 단축 URL 구분
     */
    export enum shortUrlCreateType {
        COURSE_DETAIL = 'COURSE_DETAIL',
        MANUAL = 'MANUAL',
    }
    /**
     * 단축 URL Method 구분
     */
    export enum shortUrlMethodType {
        GET = 'GET',
        POST = 'POST',
    }
}

