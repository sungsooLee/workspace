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
    contentType?: com_ever_edu_cms_content_dto_res_FindContentResDto.contentType;
    groupContentId?: number;
    createType?: com_ever_edu_cms_content_dto_res_FindContentResDto.createType;
    contentStatusCode?: com_ever_edu_cms_content_dto_res_FindContentResDto.contentStatusCode;
    isContentEnabled?: boolean;
    coordinatorUuid?: string;
    coordinatorName?: string;
    contentAddInfoType?: com_ever_edu_cms_content_dto_res_FindContentResDto.contentAddInfoType;
    contentAddInfo?: number;
    langCountryCode?: com_ever_edu_cms_content_dto_res_FindContentResDto.langCountryCode;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
    creatorName?: string;
    modifyerName?: string;
};
export namespace com_ever_edu_cms_content_dto_res_FindContentResDto {
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
    export enum createType {
        MANUAL = 'MANUAL',
        SHARED = 'SHARED',
        TRASLATE = 'TRASLATE',
    }
    export enum contentStatusCode {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        SAVE = 'SAVE',
        DELETE = 'DELETE',
    }
    export enum contentAddInfoType {
        VIDEO_ADD_INFO = 'VIDEO_ADD_INFO',
        EXAM_ADD_INFO = 'EXAM_ADD_INFO',
    }
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

