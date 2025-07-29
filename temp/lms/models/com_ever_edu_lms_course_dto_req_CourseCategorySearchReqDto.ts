/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseCategorySearchReqDto = {
    /**
     * 카테고리 ID
     */
    categoryId: number;
    /**
     * 과정 유형
     */
    courseType?: Array<'ELEARNING1' | 'ELEARNING2' | 'CLASS' | 'LIVE' | 'EXAM' | 'SURVEY'>;
    /**
     * 과정명
     */
    courseName?: string;
};

