/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_res_LessonResDto = {
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
    creatorName?: string;
    modifyerName?: string;
    /**
     * Enum(cms.curriculum.MappingCurriculumType)<br>- LESSON<br>- MODULE<br>- CURRICULUM
     */
    mappingCurriculumType?: com_ever_edu_cms_curriculum_dto_res_LessonResDto.mappingCurriculumType;
    lessonId?: number;
    lessonName?: string;
    lessonDescription?: string;
    /**
     * Enum(cms.curriculum.LessonType)<br>- GENERAL: 목차형 레슨 유형<br>- RESOURCE: 자원 매핑 레슨 유형
     */
    lessonType?: com_ever_edu_cms_curriculum_dto_res_LessonResDto.lessonType;
    sortOrder?: number;
    /**
     * Enum(cms.content.ContentType)<br>- VIDEO: 동영상<br>- EBOOK: 이북<br>- SCORM: 스콤<br>- HTML5_VIDEO: HTML 동영상<br>- IMAGE: 이미지<br>- EXTERNAL_LINK: 외부링크<br>- EXTERNAL_AGENCY: 외부위탁<br>- BLOG: 블로그<br>- EXAM: 시험지<br>- EXAM_POOL: 문제은행<br>- ASSIGNMENT: 과제<br>- SURVEY: 설문지<br>- ETC: 기타
     */
    contentType?: com_ever_edu_cms_curriculum_dto_res_LessonResDto.contentType;
    learningTime?: number;
};
export namespace com_ever_edu_cms_curriculum_dto_res_LessonResDto {
    /**
     * Enum(cms.curriculum.MappingCurriculumType)<br>- LESSON<br>- MODULE<br>- CURRICULUM
     */
    export enum mappingCurriculumType {
        LESSON = 'LESSON',
        MODULE = 'MODULE',
        CURRICULUM = 'CURRICULUM',
    }
    /**
     * Enum(cms.curriculum.LessonType)<br>- GENERAL: 목차형 레슨 유형<br>- RESOURCE: 자원 매핑 레슨 유형
     */
    export enum lessonType {
        GENERAL = 'GENERAL',
        RESOURCE = 'RESOURCE',
    }
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
}

