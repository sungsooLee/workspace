/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_image_dto_res_ImageStatusResDto = {
    /**
     * ETC 콘텐츠 UUID
     */
    contentUuid?: string;
    /**
     * Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
     */
    contentType?: com_ever_edu_cms_image_dto_res_ImageStatusResDto.contentType;
    /**
     * Enum(cms.content.ContentStatusCode)<br>- TEMPORARY_SAVE<br>- SAVED<br>- DELETED
     */
    contentStatusCode?: com_ever_edu_cms_image_dto_res_ImageStatusResDto.contentStatusCode;
    /**
     * 이미지파일 UUID 목록
     */
    images?: Array<string>;
    isDrafted?: boolean;
};
export namespace com_ever_edu_cms_image_dto_res_ImageStatusResDto {
    /**
     * Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
     */
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
    /**
     * Enum(cms.content.ContentStatusCode)<br>- TEMPORARY_SAVE<br>- SAVED<br>- DELETED
     */
    export enum contentStatusCode {
        TEMPORARY_SAVE = 'TEMPORARY_SAVE',
        SAVE = 'SAVE',
        DELETE = 'DELETE',
    }
}

