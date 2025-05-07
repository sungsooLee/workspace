/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate } from './com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$Class_FullUpdate = (com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate & {
    placeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$Class_FullUpdate.placeType;
    /**
     * 일정 중복 허용
     */
    isScheduleConflictAllowed?: boolean;
} & {
    placeType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$Class_FullUpdate.placeType;
    /**
     * 일정 중복 허용
     */
    isScheduleConflictAllowed: boolean;
});
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$Class_FullUpdate {
    export enum placeType {
        OFFLINE = 'OFFLINE',
        ONLINE = 'ONLINE',
    }
}

