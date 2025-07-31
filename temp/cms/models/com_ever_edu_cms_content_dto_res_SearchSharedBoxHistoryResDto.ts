/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto } from './com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto';
export type com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto = {
    sourceContentUuid?: string;
    sourceContentName?: string;
    sourceTenantId?: number;
    sourceTenantName?: string;
    sourceChannelUuid?: string;
    sourceChannelName?: string;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto.languageCountryCode;
    languageCountryCodeName?: string;
    shareDestinations?: Array<com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto>;
};
export namespace com_ever_edu_cms_content_dto_res_SearchSharedBoxHistoryResDto {
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
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
}

