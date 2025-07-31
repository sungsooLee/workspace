/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseShareSearchReqDto = {
    /**
     * 공유한 채널 UUID
     */
    originChannelUuid: string;
    /**
     * 공유받은 채널 UUID
     */
    targetChannelUuid: string;
    /**
     * 과정 명
     */
    courseName?: string;
    /**
     * 상태(대기/완료)
     */
    isComplete?: boolean;
};

