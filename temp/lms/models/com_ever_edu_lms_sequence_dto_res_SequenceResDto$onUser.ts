/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_sequence_dto_res_SequenceResDto$OnUser = {
    /**
     * 차수Id
     */
    courseSequenceId?: number;
    /**
     * 수강신청 시작일
     */
    enrollStartDate?: string;
    /**
     * 수강신청 종료일
     */
    enrollEndDate?: string;
    /**
     * 학습 시작일
     */
    courseSequenceStartDate?: string;
    /**
     * 학습 종료일
     */
    courseSequenceEndDate?: string;
    /**
     * 석제여부
     */
    isDeleted?: boolean;
    /**
     * 수강신청 정원
     */
    maxQuota?: number;
    /**
     * 수강 신청 인원
     */
    filledQuota?: number;
    /**
     * 담당자UUID
     */
    coordinatorUuid?: string;
    /**
     * 이수기준 설정 여부
     */
    isUsePassOption?: boolean;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType?: com_ever_edu_lms_sequence_dto_res_SequenceResDto$OnUser.passMethodType;
    /**
     * 수료증 제공 여부
     */
    isCertificateProvided?: boolean;
    /**
     * 항목별 이수 기준 (진도)
     */
    progressMinPassScore?: number;
    /**
     * 항목별 이수 기준 (출석)
     */
    attendanceMinPassScore?: number;
    /**
     * 항목별 이수 기준 (평가)
     */
    examMinPassScore?: number;
    /**
     * 항목별 이수 기준 (과제)
     */
    asgmtMinPassScore?: number;
    /**
     * 항목별 이수 기준 (총점)
     */
    totalMinPassScore?: number;
    /**
     * 반영 비율 (진도)
     */
    progressWeights?: number;
    /**
     * 반영 비율 (출석)
     */
    attendanceWeights?: number;
    /**
     * 반영 비율 (시험)
     */
    examWeights?: number;
    /**
     * 반영 비율 (과제)
     */
    asgmtWeights?: number;
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    recognizedStudyMinType?: com_ever_edu_lms_sequence_dto_res_SequenceResDto$OnUser.recognizedStudyMinType;
    /**
     * 인정 학습 횟수
     */
    recognizedStudyCycles?: number;
    /**
     * 인정학습시간(분)
     */
    recognizedStudyMinutes?: number;
    /**
     * 학습포인트 여부
     */
    isRecognizedStudyPoint?: boolean;
    /**
     * 인정학습점수(학습포인트)
     */
    recognizedStudyPoint?: number;
};
export namespace com_ever_edu_lms_sequence_dto_res_SequenceResDto$OnUser {
    /**
     * (lms.course.PassMethodType)
     */
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    export enum recognizedStudyMinType {
        TIME = 'TIME',
        COUNT_TIME = 'COUNT_TIME',
    }
}

