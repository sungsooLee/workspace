/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_image_dto_res_ImageStatusResDto = {
    /**
     * ETC 콘텐츠 UUID
     */
    contentUuid?: string;
    contentType?: com_ever_edu_cms_image_dto_res_ImageStatusResDto.contentType;
    contentStatusCode?: com_ever_edu_cms_image_dto_res_ImageStatusResDto.contentStatusCode;
    /**
     * 이미지파일 UUID 목록
     */
    images?: Array<string>;
    isDrafted?: boolean;
};
export namespace com_ever_edu_cms_image_dto_res_ImageStatusResDto {
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
}

