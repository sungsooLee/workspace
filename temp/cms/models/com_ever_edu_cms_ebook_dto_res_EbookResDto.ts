/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_content_dto_res_ThumbnailFileResDto } from './com_ever_edu_cms_content_dto_res_ThumbnailFileResDto';
import type { com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto } from './com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto';
import type { com_ever_edu_cms_tag_dto_res_TagResDto } from './com_ever_edu_cms_tag_dto_res_TagResDto';
export type com_ever_edu_cms_ebook_dto_res_EbookResDto = {
    contentUuid?: string;
    contentName?: string;
    langCountryCode?: com_ever_edu_cms_ebook_dto_res_EbookResDto.langCountryCode;
    createType?: com_ever_edu_cms_ebook_dto_res_EbookResDto.createType;
    contentType?: com_ever_edu_cms_ebook_dto_res_EbookResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_ebook_dto_res_EbookResDto.contentStatusCode;
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
    contentAddInfoType?: com_ever_edu_cms_ebook_dto_res_EbookResDto.contentAddInfoType;
    contentAddInfo?: number;
    isSecured?: boolean;
    isDeleted?: boolean;
    isOpened?: boolean;
    isDrafted?: boolean;
    tags?: Array<com_ever_edu_cms_tag_dto_res_TagResDto>;
    aiSummary?: string;
    aiKeyword?: string;
    /**
     * E-Book 처리 상태 코드 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
     */
    processingStatus?: com_ever_edu_cms_ebook_dto_res_EbookResDto.processingStatus;
    /**
     * E-Book Organization 목록
     */
    children?: Array<com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto>;
};
export namespace com_ever_edu_cms_ebook_dto_res_EbookResDto {
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
    /**
     * E-Book 처리 상태 코드 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
     */
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        UPLOADING = 'UPLOADING',
        PARSING = 'PARSING',
    }
}

