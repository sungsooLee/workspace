/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_image_dto_req_ImagesDraftReqDto = {
    tenantId: number;
    tenantName: string;
    channelUuid: string;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode: com_ever_edu_cms_image_dto_req_ImagesDraftReqDto.languageCountryCode;
    /**
     * Enum(pms.file.StorageType)<br>-S3<br>-HMG
     */
    storageType: com_ever_edu_cms_image_dto_req_ImagesDraftReqDto.storageType;
    /**
     * 이미지파일 UUID 목록
     */
    images: Array<string>;
};
export namespace com_ever_edu_cms_image_dto_req_ImagesDraftReqDto {
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
    /**
     * Enum(pms.file.StorageType)<br>-S3<br>-HMG
     */
    export enum storageType {
        S3 = 'S3',
        HMG = 'HMG',
    }
}

