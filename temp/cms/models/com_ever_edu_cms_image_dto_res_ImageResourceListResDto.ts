/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_image_dto_res_ImageResourceResDto } from './com_ever_edu_cms_image_dto_res_ImageResourceResDto';
export type com_ever_edu_cms_image_dto_res_ImageResourceListResDto = {
    /**
     * ETC 콘텐츠 UUID
     */
    contentUuid?: string;
    contentType?: com_ever_edu_cms_image_dto_res_ImageResourceListResDto.contentType;
    images?: Array<com_ever_edu_cms_image_dto_res_ImageResourceResDto>;
};
export namespace com_ever_edu_cms_image_dto_res_ImageResourceListResDto {
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

