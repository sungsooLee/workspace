/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_res_ThumbnailFileResDto } from './com_ever_edu_cms_content_dto_res_ThumbnailFileResDto';
import type { com_ever_edu_cms_image_dto_res_ImageResourceResDto } from './com_ever_edu_cms_image_dto_res_ImageResourceResDto';
import type { com_ever_edu_cms_tag_dto_res_TagResDto } from './com_ever_edu_cms_tag_dto_res_TagResDto';
export type com_ever_edu_cms_image_dto_res_ImageContentResDto = {
    contentUuid?: string;
    contentName?: string;
    langCountryCode?: com_ever_edu_cms_image_dto_res_ImageContentResDto.langCountryCode;
    createType?: com_ever_edu_cms_image_dto_res_ImageContentResDto.createType;
    contentType?: com_ever_edu_cms_image_dto_res_ImageContentResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_image_dto_res_ImageContentResDto.contentStatusCode;
    channelUuid?: string;
    channelName?: string;
    tenantId?: number;
    tenantName?: string;
    description?: string;
    coordinatorUuid?: string;
    coordinatorName?: string;
    coordinatorTelNo?: string;
    isUnlimited?: boolean;
    contentUseStartDate?: string;
    contentUseEndDate?: string;
    isVendored?: boolean;
    vendorName?: string;
    vendorCoordinatorUuid?: string;
    vendorCoordinatorName?: string;
    vendorTelNo?: string;
    contentThumbnailFileGroupUuid?: string;
    thumbnailFiles?: Array<com_ever_edu_cms_content_dto_res_ThumbnailFileResDto>;
    selectedContentThumbnailFileUuid?: string;
    isCourseUsed?: boolean;
    isInspected?: boolean;
    isCopyrighted?: boolean;
    contentAddInfoType?: com_ever_edu_cms_image_dto_res_ImageContentResDto.contentAddInfoType;
    contentAddInfo?: number;
    isSecured?: boolean;
    isDeleted?: boolean;
    isOpened?: boolean;
    isDrafted?: boolean;
    tags?: Array<com_ever_edu_cms_tag_dto_res_TagResDto>;
    aiSummary?: string;
    aiKeyword?: string;
    images?: Array<com_ever_edu_cms_image_dto_res_ImageResourceResDto>;
};
export namespace com_ever_edu_cms_image_dto_res_ImageContentResDto {
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
    export enum createType {
        MANUAL = 'MANUAL',
        SHARED = 'SHARED',
        TRASLATE = 'TRASLATE',
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
    export enum contentAddInfoType {
        VIDEO_ADD_INFO = 'VIDEO_ADD_INFO',
        EXAM_ADD_INFO = 'EXAM_ADD_INFO',
        EXAM_POOL_ADD_INFO = 'EXAM_POOL_ADD_INFO',
    }
}

