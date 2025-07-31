/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_res_FindContentResDto = {
    tenantId?: number;
    tenantName?: string;
    channelUuid?: string;
    channelName?: string;
    contentUuid?: string;
    contentName?: string;
    /**
     * Enum(cms.content.ContentType)Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
     */
    contentType?: com_ever_edu_cms_content_dto_res_FindContentResDto.contentType;
    groupContentId?: number;
    /**
     * Enum(cms.content.ContentCreateType)<br>- MANUAL: 직접생성<br>- TRANSLATE: 번역내보내기<br>- SHARED: 공유내보내기
     */
    createType?: com_ever_edu_cms_content_dto_res_FindContentResDto.createType;
    /**
     * Enum(cms.content.ContentStatusCode)<br>- TEMPORARY_SAVE<br>- SAVED<br>- DELETED
     */
    contentStatusCode?: com_ever_edu_cms_content_dto_res_FindContentResDto.contentStatusCode;
    isContentEnabled?: boolean;
    coordinatorUuid?: string;
    coordinatorName?: string;
    /**
     * Enum(cms.content.ContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    contentAddInfoType?: com_ever_edu_cms_content_dto_res_FindContentResDto.contentAddInfoType;
    /**
     * 콘텐츠 추가정보 코드 별 초/건수 값
     */
    contentAddInfo?: number;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_content_dto_res_FindContentResDto.languageCountryCode;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
    contentId?: number;
    creatorName?: string;
    modifyerName?: string;
};
export namespace com_ever_edu_cms_content_dto_res_FindContentResDto {
    /**
     * Enum(cms.content.ContentType)Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
     */
    export enum contentType {
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
    /**
     * Enum(cms.content.ContentCreateType)<br>- MANUAL: 직접생성<br>- TRANSLATE: 번역내보내기<br>- SHARED: 공유내보내기
     */
    export enum createType {
        MANUAL = 'MANUAL',
        SHARED = 'SHARED',
        TRANSLATE = 'TRANSLATE',
    }
    /**
     * Enum(cms.content.ContentStatusCode)<br>- TEMPORARY_SAVE<br>- SAVED<br>- DELETED
     */
    export enum contentStatusCode {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        SAVE = 'SAVE',
        DELETE = 'DELETE',
    }
    /**
     * Enum(cms.content.ContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    export enum contentAddInfoType {
        VIDEO_ADD_INFO = 'VIDEO_ADD_INFO',
        EXAM_ADD_INFO = 'EXAM_ADD_INFO',
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

