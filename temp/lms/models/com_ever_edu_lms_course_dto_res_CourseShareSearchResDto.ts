/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseShareSearchResDto = {
    /**
     * ID
     */
    courseShareId?: number;
    /**
     * 공유한 채널 이름
     */
    originChannelName?: string;
    /**
     * 공유받은 채널 이름
     */
    targetChannelName?: string;
    /**
     * 공유받은 과정 ID
     */
    courseId?: number;
    /**
     * 과정 유형
     */
    courseType?: com_ever_edu_lms_course_dto_res_CourseShareSearchResDto.courseType;
    /**
     * 과정명
     */
    courseName?: string;
    /**
     * 연어
     */
    language?: string;
    /**
     * 공유 일시
     */
    sharedDateTime?: string;
    /**
     * 상태
     */
    isComplete?: boolean;
};
export namespace com_ever_edu_lms_course_dto_res_CourseShareSearchResDto {
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

