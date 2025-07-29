/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_external_link_dto_res_ExternalLinkResourceResDto = {
    contentUuid?: string;
    contentName?: string;
    languageCountryCode?: com_ever_edu_cms_external_link_dto_res_ExternalLinkResourceResDto.languageCountryCode;
    externalLink?: string;
    externalLinkType?: com_ever_edu_cms_external_link_dto_res_ExternalLinkResourceResDto.externalLinkType;
    source?: string;
};
export namespace com_ever_edu_cms_external_link_dto_res_ExternalLinkResourceResDto {
    export enum languageCountryCode {
        KO = 'KO',
        EN = 'EN',
        ES = 'ES',
        AR = 'AR',
        RU = 'RU',
        FR = 'FR',
        PT = 'PT',
        ID = 'ID',
        ZH = 'ZH',
        VI = 'VI',
        TR = 'TR',
        TH = 'TH',
        DE = 'DE',
        HE = 'HE',
        NE = 'NE',
        FA = 'FA',
        HI = 'HI',
        JA = 'JA',
        MS = 'MS',
        IT = 'IT',
        SK = 'SK',
        RO = 'RO',
        HR = 'HR',
        ET = 'ET',
    }
    export enum externalLinkType {
        CP = 'CP',
        EXT_NEW_WINDOW = 'EXT_NEW_WINDOW',
        SERICEO = 'SERICEO',
    }
}

