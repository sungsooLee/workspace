/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_html5_dto_res_Html5StatusResDto = {
    /**
     * HTML 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * HTML 파일 아이디
     */
    fileUuid?: string;
    contentType?: com_ever_edu_cms_html5_dto_res_Html5StatusResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_html5_dto_res_Html5StatusResDto.contentStatusCode;
    /**
     * HTML 처리 상태 코드 Enum(cms.html5.Html5ProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    processingStatus?: com_ever_edu_cms_html5_dto_res_Html5StatusResDto.processingStatus;
    isDrafted?: boolean;
};
export namespace com_ever_edu_cms_html5_dto_res_Html5StatusResDto {
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
     * HTML 처리 상태 코드 Enum(cms.html5.Html5ProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    export enum processingStatus {
        NONE = 'NONE',
        FAIL = 'FAIL',
        COMPLETE = 'COMPLETE',
        STARTED = 'STARTED',
        UNZIPPING = 'UNZIPPING',
        UPLOADING = 'UPLOADING',
    }
}

