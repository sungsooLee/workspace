/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CoursePopSearchResDto = {
    /**
     * 과정 유형
     */
    courseType?: com_ever_edu_lms_course_dto_res_CoursePopSearchResDto.courseType;
    /**
     * 과정 코드
     */
    courseId?: number;
    /**
     * 과정명
     */
    courseName?: string;
    /**
     * 담당자
     */
    coordinatorName?: string;
    /**
     * 운영자
     */
    operatorName?: string;
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 개설연도
     */
    openingYear?: number;
    /**
     * 과정 유효 시작일
     */
    courseValidityStartDate?: string;
    /**
     * 과정 유효 종료일
     */
    courseValidityEndDate?: string;
};
export namespace com_ever_edu_lms_course_dto_res_CoursePopSearchResDto {
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

