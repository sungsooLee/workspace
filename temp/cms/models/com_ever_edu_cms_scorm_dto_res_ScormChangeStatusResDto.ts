/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto = {
    changeId?: number;
    contentUuid?: string;
    /**
     * 파일 UUID
     */
    fileUuid?: string;
    /**
     * SCORM 처리 상태. Enum(cms.scorm.ScormProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    processingStatus?: com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto.processingStatus;
};
export namespace com_ever_edu_cms_scorm_dto_res_ScormChangeStatusResDto {
    /**
     * SCORM 처리 상태. Enum(cms.scorm.ScormProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
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

