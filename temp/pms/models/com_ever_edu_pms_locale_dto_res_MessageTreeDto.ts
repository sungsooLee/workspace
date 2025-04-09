/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_locale_dto_res_MessageTreeDto = {
    code?: string;
    translation?: string;
    locale?: string;
    keyType?: com_ever_edu_pms_locale_dto_res_MessageTreeDto.keyType;
    children?: Array<com_ever_edu_pms_locale_dto_res_MessageTreeDto>;
};
export namespace com_ever_edu_pms_locale_dto_res_MessageTreeDto {
    export enum keyType {
        COMMON_CODE = 'COMMON_CODE',
        MENU = 'MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        ERROR = 'ERROR',
        MESSAGE = 'MESSAGE',
    }
}

