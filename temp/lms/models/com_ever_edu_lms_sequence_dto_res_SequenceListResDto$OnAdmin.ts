/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_sequence_dto_res_SequenceListResDto$OnAdmin = {
    /**
     * 개설연도
     */
    openingYear?: number;
    /**
     * 순서
     */
    courseSequenceNo?: number;
    /**
     * 차수코드
     */
    courseSequenceId?: number;
    /**
     * 차수명
     */
    courseSequenceName?: string;
    /**
     * 학습기간 지정 유형
     */
    learningStartType?: com_ever_edu_lms_sequence_dto_res_SequenceListResDto$OnAdmin.learningStartType;
    /**
     * 수강신청 시작일
     */
    enrollmentStartDateTime?: string;
    /**
     * 수강신청 종료일
     */
    enrollmentEndDateTime?: string;
    /**
     * 학습 시작일
     */
    courseSequenceStartDateTime?: string;
    /**
     * 학습 종료일
     */
    courseSequenceEndDateTime?: string;
    /**
     * 교육시작 N일(신청완료 후 N일 후 교육시작)
     */
    learningStartDays?: number;
    /**
     * 상태
     */
    learningStatusType?: com_ever_edu_lms_sequence_dto_res_SequenceListResDto$OnAdmin.learningStatusType;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 정원
     */
    maxEnrollQuota?: number;
    /**
     * 신청 수
     */
    currentEnrollCount?: number;
    /**
     * 수강생 수
     */
    enrolledStudentCount?: number;
    /**
     * 수료생 수
     */
    graduatedStudentCount?: number;
};
export namespace com_ever_edu_lms_sequence_dto_res_SequenceListResDto$OnAdmin {
    /**
     * 학습기간 지정 유형
     */
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
    /**
     * 상태
     */
    export enum learningStatusType {
        ENROLLMENT_NOT_STARTED = 'ENROLLMENT_NOT_STARTED',
        ENROLLMENT_IN_PROGRESS = 'ENROLLMENT_IN_PROGRESS',
        LEARNING_NOT_STARTED = 'LEARNING_NOT_STARTED',
        LEARNING_IN_PROGRESS = 'LEARNING_IN_PROGRESS',
        LEARNING_COMPLETED = 'LEARNING_COMPLETED',
    }
}

