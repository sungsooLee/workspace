/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_instructor_dto_res_InstructorSearchResDto = {
    /**
     * 강사 ID
     */
    instructorId?: number;
    /**
     * 테넌트 이름
     */
    tenantName?: string;
    /**
     * 강사타입(사내/사외)
     */
    instructorType?: com_ever_edu_lms_instructor_dto_res_InstructorSearchResDto.instructorType;
    /**
     * 이름
     */
    instructorName?: string;
    /**
     * 사번 또는 이메일
     */
    employeeIdOrEmail?: string;
    /**
     * 연락처
     */
    telNo?: string;
    /**
     * 배정된 과정수
     */
    mappedCourseCount?: number;
    /**
     * 만족도
     */
    satisfactionScore?: number;
};
export namespace com_ever_edu_lms_instructor_dto_res_InstructorSearchResDto {
    /**
     * 강사타입(사내/사외)
     */
    export enum instructorType {
        INTERNAL_INSTRUCTOR = 'INTERNAL_INSTRUCTOR',
        EXTERNAL_INSTRUCTOR = 'EXTERNAL_INSTRUCTOR',
    }
}

