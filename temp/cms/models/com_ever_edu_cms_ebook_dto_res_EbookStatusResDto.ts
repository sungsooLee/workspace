/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_ebook_dto_res_EbookStatusResDto = {
    /**
     * E-BOOK 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * E-BOOK 파일 아이디
     */
    fileUuid?: string;
    contentType?: com_ever_edu_cms_ebook_dto_res_EbookStatusResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_ebook_dto_res_EbookStatusResDto.contentStatusCode;
    /**
     * E-BOOK 처리 상태 코드 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
     */
    processingStatus?: com_ever_edu_cms_ebook_dto_res_EbookStatusResDto.processingStatus;
};
export namespace com_ever_edu_cms_ebook_dto_res_EbookStatusResDto {
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
     * E-BOOK 처리 상태 코드 Enum(cms.ebook.EbookProcessingStatus) - FAIL|COMPLETE|STARTED|UPLOADING|PARSING
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

