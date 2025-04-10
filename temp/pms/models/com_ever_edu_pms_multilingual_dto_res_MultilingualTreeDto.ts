/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_multilingual_dto_res_MultilingualTreeDto = {
    multilingualKey?: string;
    translation?: string;
    locale?: string;
    keyType?: com_ever_edu_pms_multilingual_dto_res_MultilingualTreeDto.keyType;
    children?: Array<com_ever_edu_pms_multilingual_dto_res_MultilingualTreeDto>;
};
export namespace com_ever_edu_pms_multilingual_dto_res_MultilingualTreeDto {
    export enum keyType {
        COMMON_CODE = 'COMMON_CODE',
        MENU = 'MENU',
        LABEL = 'LABEL',
        CATEGORY = 'CATEGORY',
        MESSAGE = 'MESSAGE',
    }
}

