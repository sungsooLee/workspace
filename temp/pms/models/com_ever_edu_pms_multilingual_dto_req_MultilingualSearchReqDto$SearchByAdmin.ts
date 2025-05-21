/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin = {
    /**
     * 다국어 분류
     */
    keyTypeCode?: com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin.keyTypeCode;
    /**
     * 번역 언어
     */
    targetLocale?: string;
    /**
     * 번역상태
     */
    isTranslated?: boolean;
    /**
     * 다국어 코드
     */
    multilingualKey?: string;
    /**
     * 기준명
     */
    translation?: string;
};
export namespace com_ever_edu_pms_multilingual_dto_req_MultilingualSearchReqDto$SearchByAdmin {
    /**
     * 다국어 분류
     */
    export enum keyTypeCode {
        COMMON_CODE = 'COMMON_CODE',
        LEARNER_MENU = 'LEARNER_MENU',
        HRD_CENTER_MENU = 'HRD_CENTER_MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        MESSAGE = 'MESSAGE',
    }
}

