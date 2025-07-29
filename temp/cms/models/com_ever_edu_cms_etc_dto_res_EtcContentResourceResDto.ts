/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_external_file_dto_FileInfoDto } from './com_ever_edu_external_file_dto_FileInfoDto';
export type com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto = {
    /**
     * ETC 콘텐츠 UUID
     */
    contentUuid?: string;
    contentType?: com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto.contentType;
    fileInfo?: com_ever_edu_external_file_dto_FileInfoDto;
};
export namespace com_ever_edu_cms_etc_dto_res_EtcContentResourceResDto {
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
}

