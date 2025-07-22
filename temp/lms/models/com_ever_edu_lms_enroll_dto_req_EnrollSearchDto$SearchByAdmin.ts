/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByAdmin = {
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
    enrollStatusType?: com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByAdmin.enrollStatusType;
    /**
     * 검색 조건 : 학습 시작 일시
     */
    learningStartDate?: string;
    /**
     * 검색 조건 : 학습 종료 일시
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
export namespace com_ever_edu_lms_enroll_dto_req_EnrollSearchDto$SearchByAdmin {
    /**
     * 검색 조건 : 상태
     */
    export enum enrollStatusType {
        ENROLL_DONE = 'ENROLL_DONE',
        ENROLL_REQUEST = 'ENROLL_REQUEST',
        CANCEL_DONE = 'CANCEL_DONE',
    }
}

