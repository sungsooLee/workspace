/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto = {
    /**
     * 도착지 콘텐츠 UUID
     */
    destContentUuid?: string;
    /**
     * 도착지 콘텐츠명
     */
    destContentName?: string;
    /**
     * 도착지 테넌트 ID
     */
    destTenantId?: number;
    /**
     * 도착지 테넌트명
     */
    destTenantName?: string;
    /**
     * 도착지 채널 UUID
     */
    destChannelUuid?: string;
    /**
     * 도착지 채널 이름
     */
    destChannelName?: string;
    /**
     * 도착지 콘텐츠 국가 언어 코드 Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto.languageCountryCode;
    /**
     * 도착지 콘텐츠 국가 언어 코드
     */
    languageCountryCodeName?: string;
    /**
     * 수신자 UUID
     */
    recieverUuid?: string;
    /**
     * 수신자이름
     */
    recieverName?: string;
    recievedDate?: string;
};
export namespace com_ever_edu_cms_content_dto_res_SharedBoxHistoryDestinationResDto {
    /**
     * 도착지 콘텐츠 국가 언어 코드 Enum(pms.multilingual.LangCountryCode)
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

