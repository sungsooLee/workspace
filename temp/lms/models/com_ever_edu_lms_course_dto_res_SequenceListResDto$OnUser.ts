/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser = {
    courseType?: com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser.courseType;
    isDuplicateEnrollAllowed?: boolean;
    courseSequenceName?: string;
    courseSequenceUuid?: string;
    enrollQueueId?: number;
    studentId?: number;
    enrollQueueStatus?: com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser.enrollQueueStatus;
    enrollStatus?: com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser.enrollStatus;
    learningStartType?: com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser.learningStartType;
    enrollStartDate?: string;
    enrollEndDate?: string;
    learningStartDate?: string;
    learningEndDate?: string;
    learningStartDays?: number;
    enrollCancelStartDate?: string;
    enrollCancelEndDate?: string;
    maxEnrollQuota?: number;
    currentEnrollCount?: number;
    maxWaitlistQuota?: number;
    currentWaitlistCount?: number;
    isEnrollClosed?: boolean;
    preRequisiteCourseIds?: Array<number>;
    waitListPickMethodType?: com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser.waitListPickMethodType;
    enrollmentDenyReasons?: Array<'IS_BLACKLIST' | 'IS_NOT_WHITELIST' | 'DELETED_COURSE' | 'EXCEEDED_QUOTA' | 'DUPLICATE_ENROLL' | 'IS_NOT_ENROLL_PERIOD' | 'CONFLICT_SCHEDULE' | 'IS_ENROLL_CLOSED' | 'DEFAULT_CONSTRAINT' | 'NEED_PREREQUISITE_COURSE' | 'LIMIT_MONTH_INDIVIDUAL_PER_CATEGORY' | 'LIMIT_YEAR_INDIVIDUAL_PER_CATEGORY' | 'LIMIT_MONTH_COMPANY_PER_CATEGORY' | 'LIMIT_YEAR_COMPANY_PER_CATEGORY'>;
    enrollButtonState?: com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser.enrollButtonState;
    hide?: boolean;
};
export namespace com_ever_edu_lms_course_dto_res_SequenceListResDto$OnUser {
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
    export enum enrollQueueStatus {
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
    export enum enrollStatus {
        ENROLL_DONE = 'ENROLL_DONE',
        ENROLL_REQUEST = 'ENROLL_REQUEST',
        CANCEL_DONE = 'CANCEL_DONE',
    }
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
    export enum waitListPickMethodType {
        NONE = 'NONE',
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
    export enum enrollButtonState {
        QUEUE = 'QUEUE',
        CANCEL = 'CANCEL',
        WAITING = 'WAITING',
        READY_TO_LEARN = 'READY_TO_LEARN',
        START_LEARNING = 'START_LEARNING',
        FINISH_LEARNING = 'FINISH_LEARNING',
        CAN_NOT = 'CAN_NOT',
        IS_ENROLL_CLOSED = 'IS_ENROLL_CLOSED',
        NOT_YET_ENROLL_PERIOD = 'NOT_YET_ENROLL_PERIOD',
        CAN_WAIT = 'CAN_WAIT',
        ENROLL = 'ENROLL',
    }
}

