/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_video_dto_req_VideoSaveReqDto_DraftMultipleSave = {
    languageCountryCode: com_ever_edu_cms_video_dto_req_VideoSaveReqDto_DraftMultipleSave.languageCountryCode;
    tenantId: number;
    channelUuid: string;
    /**
     * 저장할 여러 파일의 UUID 목록
     */
    fileUuids: Array<string>;
};
export namespace com_ever_edu_cms_video_dto_req_VideoSaveReqDto_DraftMultipleSave {
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

