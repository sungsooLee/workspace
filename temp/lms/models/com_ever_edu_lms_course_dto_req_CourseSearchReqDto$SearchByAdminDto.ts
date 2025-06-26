/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto = {
    /**
     * 채널 UUID
     */
    channelUuid: string;
    /**
     * 테넌트id
     */
    tenantId: number;
    /**
     * 개설 연도
     */
    openYear?: number;
    /**
     * 과정유형
     */
    courseType?: com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto.courseType;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 담당자/운영자
     */
    adminName?: string;
    /**
     * 과정코드
     */
    courseId?: number;
    /**
     * 과정명
     */
    courseName?: string;
};
export namespace com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto {
    /**
     * 과정유형
     */
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

