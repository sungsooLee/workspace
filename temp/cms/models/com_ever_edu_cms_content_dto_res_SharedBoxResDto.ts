/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_res_SharedBoxResDto = {
    /**
     * 원본 테넌트 id
     */
    sourceTenantId?: number;
    /**
     * 원본 테넌트명
     */
    sourceTenantName?: string;
    /**
     * 원본 채널 UUID
     */
    sourceChannelUuid?: string;
    /**
     * 원본 채널 이름
     */
    sourceChannelName?: string;
    /**
     * 원본 학습자원 UUID
     */
    sourceContentUuid?: string;
    /**
     * 원본 학습자원명
     */
    sourceContentName?: string;
    /**
     * 원본 학습자원 그룹ID
     */
    sourceGroupContentId?: number;
    /**
     * 원본 학습자원 유형, enum(cms.content.ContentType)
     */
    sourceContentType?: com_ever_edu_cms_content_dto_res_SharedBoxResDto.sourceContentType;
    contentCreateType?: com_ever_edu_cms_content_dto_res_SharedBoxResDto.contentCreateType;
    /**
     * 원본 학습자원 국가 언어 코드
     */
    langCountryCode?: com_ever_edu_cms_content_dto_res_SharedBoxResDto.langCountryCode;
    /**
     * 원본 학습자원 사용가능 여부
     */
    isContentEnabled?: boolean;
    /**
     * 공유자 UUID
     */
    sharerUuid?: string;
    /**
     * 공유자명
     */
    sharerName?: string;
    /**
     * 공유 횟수
     */
    shareCount?: number;
    sharedDate?: string;
};
export namespace com_ever_edu_cms_content_dto_res_SharedBoxResDto {
    /**
     * 원본 학습자원 유형, enum(cms.content.ContentType)
     */
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
        TRASLATE = 'TRASLATE',
    }
    /**
     * 원본 학습자원 국가 언어 코드
     */
    export enum langCountryCode {
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

