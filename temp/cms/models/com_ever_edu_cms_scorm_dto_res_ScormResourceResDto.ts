/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_scorm_dto_res_ScormOrganizationResDto } from './com_ever_edu_cms_scorm_dto_res_ScormOrganizationResDto';
import type { com_ever_edu_external_file_dto_FileInfoDto } from './com_ever_edu_external_file_dto_FileInfoDto';
export type com_ever_edu_cms_scorm_dto_res_ScormResourceResDto = {
    /**
     * SCORM 콘텐츠 아이디
     */
    contentId?: number;
    /**
     * SCORM 콘텐츠 UUID
     */
    contentUuid?: string;
    fileInfo?: com_ever_edu_external_file_dto_FileInfoDto;
    /**
     * SCORM 처리 상태 코드. Enum(cms.scorm.ScormProcessingStatus) - FAIL|COMPLETE|STARTED|PARSING|UPLOADING
     */
    processingStatus?: com_ever_edu_cms_scorm_dto_res_ScormResourceResDto.processingStatus;
    /**
     * SCORM 학습구성 목록
     */
    children?: Array<com_ever_edu_cms_scorm_dto_res_ScormOrganizationResDto>;
};
export namespace com_ever_edu_cms_scorm_dto_res_ScormResourceResDto {
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

