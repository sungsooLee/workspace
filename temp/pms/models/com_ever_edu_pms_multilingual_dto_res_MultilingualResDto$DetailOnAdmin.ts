/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$TranslationDto } from './com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$TranslationDto';
export type com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin = {
    multilingualId?: number;
    multilingualKey?: string;
    keyType?: com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin.keyType;
    translations?: Array<com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$TranslationDto>;
};
export namespace com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin {
    export enum keyType {
        SYSTEM_COMMON_CODE = 'SYSTEM_COMMON_CODE',
        LEARNER_MENU = 'LEARNER_MENU',
        HRD_CENTER_MENU = 'HRD_CENTER_MENU',
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

