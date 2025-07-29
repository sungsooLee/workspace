/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 수강생 정보
 */
export type com_ever_edu_lms_student_dto_req_StudentUpdateReqDto$UpdateStudentInfo = {
    /**
     * 학생ID
     */
    studentId: number;
    /**
     * 진도 점수
     */
    progressScore?: number;
    /**
     * 시험 점수
     */
    examScore?: number;
    /**
     * 과제 점수
     */
    asgmtScore?: number;
    /**
     * 출석 점수
     */
    attendanceScore?: number;
    /**
     * 수료 상태
     */
    isCertified?: boolean;
};

