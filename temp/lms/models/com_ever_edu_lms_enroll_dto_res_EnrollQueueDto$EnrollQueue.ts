/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue = {
    courseSequenceId?: number;
    enrollQueueStatusType?: com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue.enrollQueueStatusType;
};
export namespace com_ever_edu_lms_enroll_dto_res_EnrollQueueDto$EnrollQueue {
    export enum enrollQueueStatusType {
        QUEUE = 'QUEUE',
        PROCESSED = 'PROCESSED',
        WAITING = 'WAITING',
        EXPIRED_WAITING = 'EXPIRED_WAITING',
        MAIL_SEND = 'MAIL_SEND',
        ERROR = 'ERROR',
        QUOTA_EXCEED = 'QUOTA_EXCEED',
        QUOTA_WAITING_EXCEED = 'QUOTA_WAITING_EXCEED',
        INVALID_COURSE = 'INVALID_COURSE',
        ACCESS_DENIED = 'ACCESS_DENIED',
        DUPLICATE_ENROLL = 'DUPLICATE_ENROLL',
    }
}

