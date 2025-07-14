/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_exam_dto_req_ExamRteInitializeReqDto = {
    /**
     * 과정차수Id
     */
    sequenceId?: number;
    /**
     * 과정Id
     */
    courseId?: number;
    /**
     * 커리큘럼Id
     */
    curriculumId?: number;
    /**
     * 커리큘럼 모듈 Id
     */
    moduleId?: number;
    /**
     * 커리큘럼 레슨 Id
     */
    lessonId: number;
    /**
     * 콘텐츠 UUID
     */
    contentUuid: string;
};

