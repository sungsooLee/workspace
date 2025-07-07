/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_instructor_dto_res_InstructorHistorySearchResDto = {
    /**
     * 과정 타입
     */
    courseType?: com_ever_edu_lms_instructor_dto_res_InstructorHistorySearchResDto.courseType;
    /**
     * 과정명
     */
    courseName?: string;
    /**
     * 차수명
     */
    sequenceName?: string;
    /**
     * 교육 시작일
     */
    learningStartDate?: string;
    /**
     * 교육 종료일
     */
    learningEndDate?: string;
    /**
     * 점수
     */
    score?: number;
    /**
     * 인정시간(분)
     */
    creditMin?: number;
};
export namespace com_ever_edu_lms_instructor_dto_res_InstructorHistorySearchResDto {
    /**
     * 과정 타입
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

