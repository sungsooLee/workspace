/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_sequence_dto_req_SequenceBulkUpdateReqDto = {
    /**
     * 차수 아이디 배열
     */
    sequenceIds: Array<number>;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 수강신청 시작일시
     */
    enrollStartDateTime?: string;
    /**
     * 수강신청 종료일시
     */
    enrollEndDateTime?: string;
    /**
     * 학습기간 지정 유형
     */
    learningStartType?: com_ever_edu_lms_sequence_dto_req_SequenceBulkUpdateReqDto.learningStartType;
    /**
     * 교육시작 N일(신청완료 후 N일 후 교육시작)
     */
    learningStartDays?: number;
    /**
     * 학습시작일시
     */
    learningStartDateTime?: string;
    /**
     * 학습종료일시
     */
    learningEndDateTime?: string;
    /**
     * 수강신청 정원 제한 여부
     */
    isMaxEnrollQuotaRestricted?: boolean;
    /**
     * 수강신청 정원
     */
    maxEnrollQuota?: number;
};
export namespace com_ever_edu_lms_sequence_dto_req_SequenceBulkUpdateReqDto {
    /**
     * 학습기간 지정 유형
     */
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
}

