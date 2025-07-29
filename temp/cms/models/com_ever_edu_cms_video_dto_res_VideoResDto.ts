/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_tag_dto_res_TagResDto } from './com_ever_edu_cms_tag_dto_res_TagResDto';
import type { com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto } from './com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto';
import type { com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto } from './com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto';
import type { com_ever_edu_cms_video_dto_res_VideoSubtitleResDto } from './com_ever_edu_cms_video_dto_res_VideoSubtitleResDto';
export type com_ever_edu_cms_video_dto_res_VideoResDto = {
    tenantId?: number;
    tenantName?: string;
    channelUuid?: string;
    channelName?: string;
    contentUuid?: string;
    contentName?: string;
    languageCountryCode?: com_ever_edu_cms_video_dto_res_VideoResDto.languageCountryCode;
    createType?: com_ever_edu_cms_video_dto_res_VideoResDto.createType;
    contentType?: com_ever_edu_cms_video_dto_res_VideoResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_video_dto_res_VideoResDto.contentStatusCode;
    coordinatorUuid?: string;
    coordinatorName?: string;
    coordinatorTelNo?: string;
    /**
     * Enum(cms.contentContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    contentAddInfoType?: com_ever_edu_cms_video_dto_res_VideoResDto.contentAddInfoType;
    contentAddInfo?: number;
    isUnlimited?: boolean;
    contentUseStartDate?: string;
    contentUseEndDate?: string;
    isVendored?: boolean;
    vendorCoordinatorUuid?: string;
    vendorCoordinatorName?: string;
    vendorTelNo?: string;
    isCourseUsed?: boolean;
    isInspected?: boolean;
    isCopyrighted?: boolean;
    isSecured?: boolean;
    isDeleted?: boolean;
    isDrafted?: boolean;
    aiSummary?: string;
    aiKeyword?: string;
    tags?: Array<com_ever_edu_cms_tag_dto_res_TagResDto>;
    createdBy?: string;
    creatorName?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifyerName?: string;
    modifiedDate?: string;
    description?: string;
    vendorName?: string;
    isOpened?: boolean;
    fileChangeId?: number;
    processingStatus?: com_ever_edu_cms_video_dto_res_VideoResDto.processingStatus;
    fileUuid?: string;
    masterVideo?: string;
    encodedVideos?: Array<com_ever_edu_cms_video_dto_res_EncodedVideoResponseDto>;
    encodedAudios?: Array<com_ever_edu_cms_video_dto_res_EncodedAudioResponseDto>;
    videoSubtitles?: Array<com_ever_edu_cms_video_dto_res_VideoSubtitleResDto>;
};
export namespace com_ever_edu_cms_video_dto_res_VideoResDto {
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
    export enum createType {
        MANUAL = 'MANUAL',
        SHARED = 'SHARED',
        TRANSLATE = 'TRANSLATE',
    }
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
    export enum contentStatusCode {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        SAVE = 'SAVE',
        DELETE = 'DELETE',
    }
    /**
     * Enum(cms.contentContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    export enum contentAddInfoType {
        VIDEO_ADD_INFO = 'VIDEO_ADD_INFO',
        EXAM_ADD_INFO = 'EXAM_ADD_INFO',
    }
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        THUMBNAIL = 'THUMBNAIL',
        AUDIO = 'AUDIO',
        ENCODING = 'ENCODING',
        UPLOADING = 'UPLOADING',
    }
}

