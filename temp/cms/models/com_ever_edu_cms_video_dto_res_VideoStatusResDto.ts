/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 콘텐츠 목록
 */
export type com_ever_edu_cms_video_dto_res_VideoStatusResDto = {
    /**
     * 동영상 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * 동영상 파일 아이디
     */
    fileUuid?: string;
    contentType?: com_ever_edu_cms_video_dto_res_VideoStatusResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_video_dto_res_VideoStatusResDto.contentStatusCode;
    processingStatus?: com_ever_edu_cms_video_dto_res_VideoStatusResDto.processingStatus;
    isDrafted?: boolean;
};
export namespace com_ever_edu_cms_video_dto_res_VideoStatusResDto {
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
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        ENCODING = 'ENCODING',
        UPLOADING = 'UPLOADING',
    }
}

