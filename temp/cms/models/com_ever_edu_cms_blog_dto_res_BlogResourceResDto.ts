/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_fasterxml_jackson_databind_JsonNode } from './com_fasterxml_jackson_databind_JsonNode';
export type com_ever_edu_cms_blog_dto_res_BlogResourceResDto = {
    contentUuid?: string;
    contentName?: string;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_blog_dto_res_BlogResourceResDto.languageCountryCode;
    blogContent?: com_fasterxml_jackson_databind_JsonNode;
};
export namespace com_ever_edu_cms_blog_dto_res_BlogResourceResDto {
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

