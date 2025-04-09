/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_locale_dto_res_MessageResDto$TranslationDto } from './com_ever_edu_pms_locale_dto_res_MessageResDto$TranslationDto';
export type com_ever_edu_pms_locale_dto_res_MessageResDto$DetailOnAdmin = {
    messageId?: number;
    code?: string;
    keyType?: com_ever_edu_pms_locale_dto_res_MessageResDto$DetailOnAdmin.keyType;
    messageDesc?: string;
    useYn?: boolean;
    translations?: Array<com_ever_edu_pms_locale_dto_res_MessageResDto$TranslationDto>;
};
export namespace com_ever_edu_pms_locale_dto_res_MessageResDto$DetailOnAdmin {
    export enum keyType {
        COMMON_CODE = 'COMMON_CODE',
        MENU = 'MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        ERROR = 'ERROR',
        MESSAGE = 'MESSAGE',
    }
}

