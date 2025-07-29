/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_student_dto_req_StudentSearchDto$StudentSearchCondition = {
    /**
     * 검색 조건 : 개강 년도
     */
    openingYear: number;
    /**
     * 검색 조건 : 차수
     */
    courseSequenceId: number;
    /**
     * 검색 조건 : 상태
     */
    completionStatus?: boolean;
    /**
     * 검색 조건 : 학습 시작 일시(yyyy-MM-dd)
     */
    learningStartDate?: string;
    /**
     * 검색 조건 : 학습 종료 일시(yyyy-MM-dd)
     */
    learningEndDate?: string;
    /**
     * 검색 조건 : 회사
     */
    companyId?: number;
    /**
     * 검색 조건 : 부서
     */
    deptId?: number;
    /**
     * 검색 조건 : 사번
     */
    employeeNumber?: string;
    /**
     * 검색 조건 : 이름
     */
    name?: string;
};

