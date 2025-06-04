/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$ListOnAdmin = {
    /**
     * 다국어 ID
     */
    multilingualId?: number;
    /**
     * 다국어 분류
     */
    keyType?: com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$ListOnAdmin.keyType;
    /**
     * 다국어 코드
     */
    multilingualKey?: string;
    /**
     * 기준명(한국어)
     */
    baseLanguage?: string;
    /**
     * 번역명(번역언어)
     */
    targetLanguage?: string;
    /**
     * 번역 언어
     */
    targetLocale?: string;
    /**
     * 목록 번역언어 기준 번역완료수
     */
    targetTranslatedCount?: number;
    /**
     * 번역완료 번역 수
     */
    totalTranslatedCount?: number;
    /**
     * 번역완료 총 언어셋 수
     */
    totalLocaleCount?: number;
    /**
     * 수정일
     */
    modifiedDate?: string;
    /**
     * 수정자
     */
    lastModifiedBy?: string;
};
export namespace com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$ListOnAdmin {
    /**
     * 다국어 분류
     */
    export enum keyType {
        SYSTEM_COMMON_CODE = 'SYSTEM_COMMON_CODE',
        LEARNER_MENU = 'LEARNER_MENU',
        HRD_CENTER_MENU = 'HRD_CENTER_MENU',
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

