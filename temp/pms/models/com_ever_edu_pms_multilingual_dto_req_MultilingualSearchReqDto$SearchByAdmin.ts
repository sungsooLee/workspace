/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin = {
    /**
     * 다국어 분류
     */
    keyType?: com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin.keyType;
    /**
     * 번역 언어
     */
    targetLocale?: string;
    /**
     * 다국어 코드
     */
    multilingualKey?: string;
    /**
     * 기준 언어
     */
    translation?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin {
    /**
     * 다국어 분류
     */
    export enum keyType {
        COMMON_CODE = 'COMMON_CODE',
        MENU = 'MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        MESSAGE = 'MESSAGE',
    }
}

