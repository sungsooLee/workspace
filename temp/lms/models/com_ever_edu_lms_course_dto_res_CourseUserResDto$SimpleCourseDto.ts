/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_tag_dto_res_TagResDto } from './com_ever_edu_lms_tag_dto_res_TagResDto';
export type com_ever_edu_lms_course_dto_res_CourseUserResDto$SimpleCourseDto = {
    /**
     * 과정 ID
     */
    courseId?: number;
    /**
     * 과정명
     */
    courseName?: string;
    /**
     * 과정 유형
     */
    courseType?: com_ever_edu_lms_course_dto_res_CourseUserResDto$SimpleCourseDto.courseType;
    /**
     * New(개시일로부터 3개월)
     */
    isNew?: boolean;
    /**
     * 접수 상태 유형
     */
    courseEnrollStatusType?: com_ever_edu_lms_course_dto_res_CourseUserResDto$SimpleCourseDto.courseEnrollStatusType;
    /**
     * 찜
     */
    isBookmarks?: boolean;
    /**
     * 영상 시간(이러닝1,2 한정)
     */
    playTime?: number;
    /**
     * 태그 이름 목록
     */
    tagNames?: Array<com_ever_edu_lms_tag_dto_res_TagResDto>;
    /**
     * 별점
     */
    starRating?: number;
    /**
     * 조회수
     */
    viewCount?: number;
    /**
     * 좋아요 수
     */
    likeCount?: number;
    dday?: number;
};
export namespace com_ever_edu_lms_course_dto_res_CourseUserResDto$SimpleCourseDto {
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
    /**
     * 접수 상태 유형
     */
    export enum courseEnrollStatusType {
        NOT_OPEN_YET = 'NOT_OPEN_YET',
        OPEN = 'OPEN',
        CLOSED = 'CLOSED',
    }
}

