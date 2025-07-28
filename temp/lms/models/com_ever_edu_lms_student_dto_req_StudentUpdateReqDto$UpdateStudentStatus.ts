/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_student_dto_req_StudentUpdateReqDto$UpdateStudentStatus = {
    /**
     * 학생ID
     */
    studentId: Array<number>;
    /**
     * 이수상태(이수확정:true, 확정취소:false)
     */
    status: boolean;
    /**
     * 차수ID
     */
    courseSequenceId: number;
};

