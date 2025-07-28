/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 자막 목록
 */
export type com_ever_edu_cms_video_dto_req_VideoSubtitleSaveReqDto = {
    /**
     * 콘텐츠 ID
     */
    subtitleFileUuid: string;
    languageCountryCode: com_ever_edu_cms_video_dto_req_VideoSubtitleSaveReqDto.languageCountryCode;
    /**
     * 자막명
     */
    subtitleName: string;
};
export namespace com_ever_edu_cms_video_dto_req_VideoSubtitleSaveReqDto {
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

