/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto } from './com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto';
export type com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent = {
    enrollQueueId?: number;
    courseSequenceId?: number;
    userId?: number;
    enrollSourceType?: com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent.enrollSourceType;
    additionalInfo?: com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto;
};
export namespace com_ever_edu_lms_enroll_dto_event_EnrollQueueEvent {
    export enum enrollSourceType {
        USER = 'USER',
        ADMIN = 'ADMIN',
        SYSTEM = 'SYSTEM',
    }
}

