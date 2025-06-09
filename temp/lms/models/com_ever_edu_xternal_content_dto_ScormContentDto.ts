/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_xternal_content_dto_ScormOrganizationDto } from './com_ever_edu_xternal_content_dto_ScormOrganizationDto';
export type com_ever_edu_xternal_content_dto_ScormContentDto = {
    contentUuid?: string;
    contentName?: string;
    contentType?: com_ever_edu_xternal_content_dto_ScormContentDto.contentType;
    contentStatusCode?: com_ever_edu_xternal_content_dto_ScormContentDto.contentStatusCode;
    channelId?: number;
    channelName?: string;
    tenantUuid?: string;
    tenantName?: string;
    description?: string;
    isUnlimited?: boolean;
    contentUseStartDate?: string;
    contentUseEndDate?: string;
    contentThumbnailFileGroupUuid?: string;
    isCourseUsed?: boolean;
    isInspected?: boolean;
    isCopyrighted?: boolean;
    contentAddInfoType?: com_ever_edu_xternal_content_dto_ScormContentDto.contentAddInfoType;
    contentAddInfo?: number;
    isSecured?: boolean;
    isOpened?: boolean;
    /**
     * SCORM 파일 아이디
     */
    fileUuid?: string;
    /**
     * SCORM 처리 상태 코드. Enum(cms.scorm.ScormProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    processingStatus?: com_ever_edu_xternal_content_dto_ScormContentDto.processingStatus;
    /**
     * SCORM Organization 목록
     */
    children?: Array<com_ever_edu_xternal_content_dto_ScormOrganizationDto>;
};
export namespace com_ever_edu_xternal_content_dto_ScormContentDto {
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
     * SCORM 처리 상태 코드. Enum(cms.scorm.ScormProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        PARSING = 'PARSING',
        UPLOADING = 'UPLOADING',
    }
}

