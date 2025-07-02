/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_instructor_dto_req_InstructorSearchReqDto = {
    /**
     * 테넌트ID
     */
    tenantId?: number;
    /**
     * 강사타입(사내/사외)
     */
    instructorType?: com_ever_edu_lms_instructor_dto_req_InstructorSearchReqDto.instructorType;
    /**
     * 이름
     */
    instructorName?: string;
    /**
     * 사번 또는 이메일
     */
    employeeIdOrEmail?: string;
};
export namespace com_ever_edu_lms_instructor_dto_req_InstructorSearchReqDto {
    /**
     * 강사타입(사내/사외)
     */
    export enum instructorType {
        INTERNAL_INSTRUCTOR = 'INTERNAL_INSTRUCTOR',
        EXTERNAL_INSTRUCTOR = 'EXTERNAL_INSTRUCTOR',
    }
}

