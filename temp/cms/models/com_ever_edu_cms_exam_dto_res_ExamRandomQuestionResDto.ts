/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_exam_dto_res_ExamRandomQuestionResDto = {
    /**
     * 문항 유형
     */
    questionType?: com_ever_edu_cms_exam_dto_res_ExamRandomQuestionResDto.questionType;
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
export namespace com_ever_edu_cms_exam_dto_res_ExamRandomQuestionResDto {
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

