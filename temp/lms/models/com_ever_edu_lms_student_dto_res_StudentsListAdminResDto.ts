/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_student_dto_res_StudentsListAdminResDto = {
    /**
     * 차수ID
     */
    courseSequenceId?: number;
    /**
     * 차수명
     */
    courseSequenceName?: string;
    /**
     * 개설년도
     */
    openingYear?: number;
    /**
     * 학습 시작 일시
     */
    learningStartDate?: string;
    /**
     * 학습 종료 일시
     */
    learningEndDate?: string;
    /**
     * 학생 ID
     */
    studentId?: number;
    /**
     * 유저 ID
     */
    userId?: number;
    /**
     * 부서 명
     */
    departmentName?: string;
    /**
     * 회사 명
     */
    companyName?: string;
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * 유저 명
     */
    userName?: string;
    /**
     * 이수 여부
     */
    isCompleted?: boolean;
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
     * 학습 상태
     */
    learningStatus?: com_ever_edu_lms_student_dto_res_StudentsListAdminResDto.learningStatus;
    /**
     * 이수 확정 일
     */
    completedDate?: string;
    /**
     * 사유
     */
    reason?: string;
    /**
     * 출석 점수
     */
    attendanceScore?: number;
    /**
     * 수료 상태
     */
    isCertified?: boolean;
    /**
     * 입과 방식
     */
    enrollmentType?: com_ever_edu_lms_student_dto_res_StudentsListAdminResDto.enrollmentType;
};
export namespace com_ever_edu_lms_student_dto_res_StudentsListAdminResDto {
    /**
     * 학습 상태
     */
    export enum learningStatus {
        PENDING_START = 'PENDING_START',
        LEARNING = 'LEARNING',
        ASSIGNMENT_DONE = 'ASSIGNMENT_DONE',
        QUIZ_DONE = 'QUIZ_DONE',
        SURVEY_DONE = 'SURVEY_DONE',
    }
    /**
     * 입과 방식
     */
    export enum enrollmentType {
        SELF_APPLY = 'SELF_APPLY',
        MANAGER_ASSIGN = 'MANAGER_ASSIGN',
        SYSTEM_REGISTERED = 'SYSTEM_REGISTERED',
    }
}

