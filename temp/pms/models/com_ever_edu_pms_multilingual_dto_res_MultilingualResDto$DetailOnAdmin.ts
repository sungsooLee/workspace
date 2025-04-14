/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$TranslationDto } from './com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$TranslationDto';
export type com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin = {
    multilingualId?: number;
    multilingualKey?: string;
    keyType?: com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin.keyType;
    messageDesc?: string;
    isUsed?: boolean;
    translations?: Array<com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$TranslationDto>;
};
export namespace com_ever_edu_pms_multilingual_dto_res_MultilingualResDto$DetailOnAdmin {
    export enum keyType {
        COMMON_CODE = 'COMMON_CODE',
        MENU = 'MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        MESSAGE = 'MESSAGE',
    }
}

