/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 랜덤형 문항 유형별 시험문항수 목록
 */
export type com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto$ExamRandomQuestionCountReqDto = {
    /**
     * 문항 유형
     */
    questionType?: com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto$ExamRandomQuestionCountReqDto.questionType;
    /**
     * 난이도 상 문항수
     */
    hardLevelCount?: number;
    /**
     * 난이도 중 문항수
     */
    mediumLevelCount?: number;
    /**
     * 난이도 하 문항수
     */
    easyLevelCount?: number;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto$ExamRandomQuestionCountReqDto {
    /**
     * 문항 유형
     */
    export enum questionType {
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
        OX = 'OX',
        SHORT_ANSWER = 'SHORT_ANSWER',
        ESSAY = 'ESSAY',
    }
}

