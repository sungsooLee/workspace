/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_res_SharedBoxResDto = {
    sourceTenantId?: number;
    sourceTenantName?: string;
    sourceChannelUuid?: string;
    sourceChannelName?: string;
    sourceContentUuid?: string;
    sourceContentName?: string;
    /**
     * 원본 학습자원 그룹ID
     */
    sourceGroupContentId?: number;
    sourceContentType?: com_ever_edu_cms_content_dto_res_SharedBoxResDto.sourceContentType;
    contentCreateType?: com_ever_edu_cms_content_dto_res_SharedBoxResDto.contentCreateType;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_content_dto_res_SharedBoxResDto.languageCountryCode;
    isContentEnabled?: boolean;
    destTenantId?: number;
    destTenantName?: string;
    destChannelUuid?: string;
    destChannelName?: string;
    sharerUuid?: string;
    sharerName?: string;
    sharedCount?: number;
    sharedDate?: string;
};
export namespace com_ever_edu_cms_content_dto_res_SharedBoxResDto {
    export enum sourceContentType {
        VIDEO = 'VIDEO',
        EBOOK = 'EBOOK',
        SCORM = 'SCORM',
        HTML5_VIDEO = 'HTML5_VIDEO',
        IMAGE = 'IMAGE',
        EXTERNAL_LINK = 'EXTERNAL_LINK',
        EXTERNAL_AGENCY = 'EXTERNAL_AGENCY',
        BLOG = 'BLOG',
        EXAM = 'EXAM',
        EXAM_POOL = 'EXAM_POOL',
        ASSIGNMENT = 'ASSIGNMENT',
        SURVEY = 'SURVEY',
        ETC = 'ETC',
    }
    export enum contentCreateType {
        MANUAL = 'MANUAL',
        SHARED = 'SHARED',
        TRANSLATE = 'TRANSLATE',
    }
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

