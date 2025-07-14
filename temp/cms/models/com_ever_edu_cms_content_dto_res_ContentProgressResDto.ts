/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_res_ContentProgressResDto = {
    /**
     * 과정차수Id
     */
    courseSequenceId?: number;
    /**
     * 과정Id
     */
    courseId?: number;
    /**
     * 커리큘럼Id
     */
    curriculumId?: number;
    /**
     * 콘텐츠 모듈/스콤-Orgn Id
     */
    moduleId?: number;
    /**
     * 레슨/스콤-Item ID
     */
    lessonId?: number;
    contentUuid?: string;
    contentType?: com_ever_edu_cms_content_dto_res_ContentProgressResDto.contentType;
    progress?: number;
    completionStatus?: com_ever_edu_cms_content_dto_res_ContentProgressResDto.completionStatus;
};
export namespace com_ever_edu_cms_content_dto_res_ContentProgressResDto {
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
    export enum completionStatus {
        COMPLETED = 'COMPLETED',
        INCOMPLETE = 'INCOMPLETE',
        NOT_ATTEMPTED = 'NOT_ATTEMPTED',
    }
}

