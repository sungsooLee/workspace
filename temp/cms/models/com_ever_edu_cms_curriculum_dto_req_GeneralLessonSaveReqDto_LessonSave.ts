/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonSave = {
    curriculumId?: number;
    moduleId?: number;
    /**
     * Enum(cms.curriculum.LessonType)<br>- GENERAL: 목차형 레슨 유형<br>- RESOURCE: 자원 매핑 레슨 유형
     */
    lessonType?: com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonSave.lessonType;
    lessonName?: string;
    lessonDescription?: string;
    learningTime?: number;
    contentUuid?: string;
    contentName?: string;
};
export namespace com_ever_edu_cms_curriculum_dto_req_GeneralLessonSaveReqDto_LessonSave {
    /**
     * Enum(cms.curriculum.LessonType)<br>- GENERAL: 목차형 레슨 유형<br>- RESOURCE: 자원 매핑 레슨 유형
     */
    export enum lessonType {
        GENERAL = 'GENERAL',
        RESOURCE = 'RESOURCE',
    }
}

