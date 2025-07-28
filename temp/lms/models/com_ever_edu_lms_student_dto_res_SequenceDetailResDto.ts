/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_student_dto_res_SequenceDetailResDto = {
    /**
     * 차수ID
     */
    courseSequenceId?: number;
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
    /**
     * 이수 기준 점수
     */
    totalMinPassScore?: number;
};

