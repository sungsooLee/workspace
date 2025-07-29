/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_space_entity_LearningSpaceEntity } from './com_ever_edu_lms_space_entity_LearningSpaceEntity';
export type com_ever_edu_lms_sequence_dto_res_SequenceUserResDto = {
    /**
     * 수강신청/학습 기간 상태
     */
    sequenceEnrollStatusType?: com_ever_edu_lms_sequence_dto_res_SequenceUserResDto.sequenceEnrollStatusType;
    /**
     * 수강신청 버튼
     */
    sequenceEnrollButtonType?: com_ever_edu_lms_sequence_dto_res_SequenceUserResDto.sequenceEnrollButtonType;
    /**
     * 차수 ID
     */
    courseSequenceId?: number;
    /**
     * 차수명
     */
    courseSequenceName?: string;
    /**
     * 과정 차수(순서)
     */
    courseSequenceNo?: number;
    /**
     * 수강신청시작일시
     */
    enrollStartDateTime?: string;
    /**
     * 수강신청종료일시
     */
    enrollEndDateTime?: string;
    /**
     * 학습기간 지정 유형
     */
    learningStartType?: com_ever_edu_lms_sequence_dto_res_SequenceUserResDto.learningStartType;
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
     * 수강신청 정원
     */
    maxEnrollQuota?: number;
    /**
     * 수강 신청 인원
     */
    enrollCount?: number;
    /**
     * 교육장소 타입
     */
    learningSpaceType?: com_ever_edu_lms_sequence_dto_res_SequenceUserResDto.learningSpaceType;
    learningSpaceEntity?: com_ever_edu_lms_space_entity_LearningSpaceEntity;
    /**
     * 교육 장소(직접입력)
     */
    learningSpaceNameKeyIn?: string;
    /**
     * 인정학습시간타입
     */
    recognizedStudyMinType?: com_ever_edu_lms_sequence_dto_res_SequenceUserResDto.recognizedStudyMinType;
    /**
     * 이름
     */
    instructorName?: string;
    /**
     * 강사타입(사내/사외)
     */
    instructorType?: com_ever_edu_lms_sequence_dto_res_SequenceUserResDto.instructorType;
    /**
     * 1인당 교육비 사용
     */
    isUseTrainingCostPerPerson?: boolean;
    /**
     * 1인당 교육비(원)
     */
    trainingCostPerPerson?: number;
    /**
     * 이수 기준 점수-진도
     */
    progressMinPassScore?: number;
    /**
     * 반영 비율-진도
     */
    progressWeights?: number;
    /**
     * 이수 기준 점수-출석
     */
    attendanceMinPassScore?: number;
    /**
     * 반영 비율-출석
     */
    attendanceWeights?: number;
    /**
     * 이수 기준 점수-평가
     */
    examMinPassScore?: number;
    /**
     * 점수 반영 비율-평가
     */
    examWeights?: number;
    /**
     * 이수 기준 점수-과제
     */
    asgmtMinPassScore?: number;
    /**
     * 점수 반영 비율-과제
     */
    asgmtWeights?: number;
};
export namespace com_ever_edu_lms_sequence_dto_res_SequenceUserResDto {
    /**
     * 수강신청/학습 기간 상태
     */
    export enum sequenceEnrollStatusType {
        OPEN_BEFORE = 'OPEN_BEFORE',
        EXPIRED = 'EXPIRED',
        FULL = 'FULL',
        APPLYING = 'APPLYING',
        APPROVING = 'APPROVING',
        APPROVED = 'APPROVED',
        LEARNING = 'LEARNING',
        COMPLETED = 'COMPLETED',
    }
    /**
     * 수강신청 버튼
     */
    export enum sequenceEnrollButtonType {
        EXPIRED = 'EXPIRED',
        NOT_ELIGIBLE = 'NOT_ELIGIBLE',
        ENROLL = 'ENROLL',
        CANCEL_ENROLLMENT = 'CANCEL_ENROLLMENT',
        FULL = 'FULL',
        WAITLIST_ENROLL = 'WAITLIST_ENROLL',
        CANCEL_WAITLIST = 'CANCEL_WAITLIST',
        READY_TO_LEARN = 'READY_TO_LEARN',
        START_LEARNING = 'START_LEARNING',
        COMPLETED = 'COMPLETED',
        PASSED = 'PASSED',
        FAILED = 'FAILED',
    }
    /**
     * 학습기간 지정 유형
     */
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
    /**
     * 교육장소 타입
     */
    export enum learningSpaceType {
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    /**
     * 인정학습시간타입
     */
    export enum recognizedStudyMinType {
        TIME = 'TIME',
        COUNT_TIME = 'COUNT_TIME',
    }
    /**
     * 강사타입(사내/사외)
     */
    export enum instructorType {
        INTERNAL_INSTRUCTOR = 'INTERNAL_INSTRUCTOR',
        EXTERNAL_INSTRUCTOR = 'EXTERNAL_INSTRUCTOR',
    }
}

