/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_res_LessonResDto = {
    mappingCurriculumType?: com_ever_edu_cms_curriculum_dto_res_LessonResDto.mappingCurriculumType;
    lessonId?: number;
    lessonName?: string;
    description?: string;
    lessonType?: com_ever_edu_cms_curriculum_dto_res_LessonResDto.lessonType;
    sortOrder?: number;
    contentType?: com_ever_edu_cms_curriculum_dto_res_LessonResDto.contentType;
    learningTime?: number;
};
export namespace com_ever_edu_cms_curriculum_dto_res_LessonResDto {
    export enum mappingCurriculumType {
        LESSON = 'LESSON',
        MODULE = 'MODULE',
        CURRICULUM = 'CURRICULUM',
    }
    export enum lessonType {
        TOC = 'TOC',
        RESOURCES = 'RESOURCES',
    }
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

