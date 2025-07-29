/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_student_dto_res_StudentHistoryDto$OnAdmin = {
    courseId?: number;
    courseSequenceId?: number;
    courseSequenceName?: string;
    studentId?: number;
    userId?: number;
    isCompleted?: boolean;
    examScore?: number;
    asgmtScore?: number;
    courseSequenceNo?: number;
    courseName?: string;
    learningStartDate?: string;
    learningEndDate?: string;
    courseType?: com_ever_edu_lms_student_dto_res_StudentHistoryDto$OnAdmin.courseType;
    attendanceScore?: number;
};
export namespace com_ever_edu_lms_student_dto_res_StudentHistoryDto$OnAdmin {
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

