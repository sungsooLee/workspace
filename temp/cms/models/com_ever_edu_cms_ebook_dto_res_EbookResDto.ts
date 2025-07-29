/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto } from './com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto';
import type { com_ever_edu_cms_tag_dto_res_TagResDto } from './com_ever_edu_cms_tag_dto_res_TagResDto';
export type com_ever_edu_cms_ebook_dto_res_EbookResDto = {
    tenantId?: number;
    tenantName?: string;
    channelUuid?: string;
    channelName?: string;
    contentUuid?: string;
    contentName?: string;
    languageCountryCode?: com_ever_edu_cms_ebook_dto_res_EbookResDto.languageCountryCode;
    createType?: com_ever_edu_cms_ebook_dto_res_EbookResDto.createType;
    contentType?: com_ever_edu_cms_ebook_dto_res_EbookResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_ebook_dto_res_EbookResDto.contentStatusCode;
    coordinatorUuid?: string;
    coordinatorName?: string;
    coordinatorTelNo?: string;
    /**
     * Enum(cms.contentContentAddInfoType)<br>- VIDEO_ADD_INFO(초)<br>- EXAM_ADD_INFO(건수)
     */
    contentAddInfoType?: com_ever_edu_cms_ebook_dto_res_EbookResDto.contentAddInfoType;
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
    /**
     * E-BOOK 처리 상태 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
     */
    processingStatus?: com_ever_edu_cms_ebook_dto_res_EbookResDto.processingStatus;
    /**
     * E-BOOK Organization 목록
     */
    children?: Array<com_ever_edu_cms_ebook_dto_res_EbookOrganizationResDto>;
};
export namespace com_ever_edu_cms_ebook_dto_res_EbookResDto {
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
    /**
     * E-BOOK 처리 상태 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
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

