/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 콘텐츠 목록
 */
export type com_ever_edu_cms_scorm_dto_res_ScormStatusResDto = {
    /**
     * SCORM 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * SCORM 파일 아이디
     */
    fileUuid?: string;
    contentType?: com_ever_edu_cms_scorm_dto_res_ScormStatusResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_scorm_dto_res_ScormStatusResDto.contentStatusCode;
    /**
     * SCORM 처리 상태 코드. Enum(cms.scorm.ScormProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    processingStatus?: com_ever_edu_cms_scorm_dto_res_ScormStatusResDto.processingStatus;
    isDrafted?: boolean;
};
export namespace com_ever_edu_cms_scorm_dto_res_ScormStatusResDto {
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

