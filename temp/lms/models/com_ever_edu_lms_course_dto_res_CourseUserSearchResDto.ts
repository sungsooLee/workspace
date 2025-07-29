/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 사전 학습 목록
 */
export type com_ever_edu_lms_course_dto_res_CourseUserSearchResDto = {
    /**
     * 과정 ID
     */
    courseId?: number;
    /**
     * 과정 명
     */
    courseName?: string;
    /**
     * 과정 유형
     */
    courseType?: com_ever_edu_lms_course_dto_res_CourseUserSearchResDto.courseType;
    /**
     * 커리큘럼 ID
     */
    curriculumId?: number;
    /**
     * 별점 평점
     */
    starRatingAverage?: number;
    /**
     * 조회수
     */
    viewCount?: number;
    /**
     * 좋아요 수
     */
    likeCount?: number;
};
export namespace com_ever_edu_lms_course_dto_res_CourseUserSearchResDto {
    /**
     * 과정 유형
     */
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

