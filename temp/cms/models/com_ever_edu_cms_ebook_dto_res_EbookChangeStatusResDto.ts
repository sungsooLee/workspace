/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_ebook_dto_res_EbookChangeStatusResDto = {
    changeUuid?: string;
    contentUuid?: string;
    /**
     * 파일명
     */
    fileName?: string;
    /**
     * SCORM 처리 상태. FAIL|COMPLETE|STARTED|UPLOADING|PARSING
     */
    processingStatus?: com_ever_edu_cms_ebook_dto_res_EbookChangeStatusResDto.processingStatus;
};
export namespace com_ever_edu_cms_ebook_dto_res_EbookChangeStatusResDto {
    /**
     * SCORM 처리 상태. FAIL|COMPLETE|STARTED|UPLOADING|PARSING
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

