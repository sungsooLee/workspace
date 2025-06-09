/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_xternal_content_dto_ScormOrganizationDto } from './com_ever_edu_xternal_content_dto_ScormOrganizationDto';
export type com_ever_edu_xternal_content_dto_ScormResourceDto = {
    /**
     * SCORM 콘텐츠 아이디
     */
    contentId?: number;
    /**
     * SCORM 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * SCORM 처리 상태 코드. Enum(cms.scorm.ScormProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    processingStatus?: com_ever_edu_xternal_content_dto_ScormResourceDto.processingStatus;
    /**
     * SCORM 학습구성 목록
     */
    children?: Array<com_ever_edu_xternal_content_dto_ScormOrganizationDto>;
};
export namespace com_ever_edu_xternal_content_dto_ScormResourceDto {
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

