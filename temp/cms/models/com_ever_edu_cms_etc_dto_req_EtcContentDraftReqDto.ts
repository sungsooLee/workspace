/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_etc_dto_req_EtcContentDraftReqDto = {
    tenantId: number;
    tenantName: string;
    channelUuid: string;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode: com_ever_edu_cms_etc_dto_req_EtcContentDraftReqDto.languageCountryCode;
    /**
     * 파일 UUID
     */
    fileUuid: string;
};
export namespace com_ever_edu_cms_etc_dto_req_EtcContentDraftReqDto {
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

