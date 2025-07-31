/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseShareSaveReqDto = {
    /**
     * 공유할 과정 ID
     */
    courseId?: number;
    /**
     * 공유하는 채널 UUID
     */
    originChannelUuid?: string;
    /**
     * 공유받는 채널 UUID 목록
     */
    targetChannelList?: Array<string>;
};

