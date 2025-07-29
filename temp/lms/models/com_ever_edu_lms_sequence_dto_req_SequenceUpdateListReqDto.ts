/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_sequence_dto_req_SequenceUpdateListReqDto = {
    /**
     * 차수 ID
     */
    courseSequenceId: number;
    /**
     * 과정 차수(순서)
     */
    courseSequenceNo: number;
    /**
     * 수강신청시작일시
     */
    enrollStartDateTime: string;
    /**
     * 수강신청종료일시
     */
    enrollEndDateTime: string;
    /**
     * 학습기간 지정 유형
     */
    learningStartType: com_ever_edu_lms_sequence_dto_req_SequenceUpdateListReqDto.learningStartType;
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
    learningDateValid?: boolean;
};
export namespace com_ever_edu_lms_sequence_dto_req_SequenceUpdateListReqDto {
    /**
     * 학습기간 지정 유형
     */
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
}

