/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$TranslationDto } from './com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$TranslationDto';
export type com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$MultilingualDto = {
    /**
     * 분류값
     */
    keyTypeCode: com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$MultilingualDto.keyTypeCode;
    /**
     * 번역언어
     */
    targetLocale: string;
    /**
     * 번역 리스트
     */
    translations: Array<com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$TranslationDto>;
};
export namespace com_ever_edu_pms_multilingual_dto_req_MultilingualUpdateReqDto$MultilingualDto {
    /**
     * 분류값
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

