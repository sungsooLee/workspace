/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_content_dto_req_ContentProgressReqDto = {
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
    /**
     * Fixed-Orgn Id
     */
    orgnId?: number;
    /**
     * Fixed-Item ID
     */
    itemId?: number;
    /**
     * 콘텐츠 UUID
     */
    contentUuid: string;
    /**
     * 사용자 UUID
     */
    userUuid?: string;
};

