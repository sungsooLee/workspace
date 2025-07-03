/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_multilingual_dto_excel_MultilingualExcelUploadDto = {
    keyTypeCode?: com_ever_edu_pms_multilingual_dto_excel_MultilingualExcelUploadDto.keyTypeCode;
    multilingualKey?: string;
    baseLanguage?: string;
    targetLanguage?: string;
};
export namespace com_ever_edu_pms_multilingual_dto_excel_MultilingualExcelUploadDto {
    export enum keyTypeCode {
        SYSTEM_COMMON_CODE = 'SYSTEM_COMMON_CODE',
        LEARNER_MENU = 'LEARNER_MENU',
        HRD_CENTER_MENU = 'HRD_CENTER_MENU',
        LABEL = 'LABEL',
        MESSAGE = 'MESSAGE',
    }
}

