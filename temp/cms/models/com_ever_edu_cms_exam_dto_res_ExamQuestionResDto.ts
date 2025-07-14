/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_exam_dto_res_ExamQuestionOptionResDto } from './com_ever_edu_cms_exam_dto_res_ExamQuestionOptionResDto';
export type com_ever_edu_cms_exam_dto_res_ExamQuestionResDto = {
    /**
     * 정렬 순서
     */
    sortSeq?: number;
    /**
     * 시험 문항 UUID
     */
    examQuestionUuid?: string;
    /**
     * 시험 문항 내용
     */
    questionText?: string;
    /**
     * 문항 유형
     */
    questionType?: com_ever_edu_cms_exam_dto_res_ExamQuestionResDto.questionType;
    /**
     * 문항 해설
     */
    explainText?: string;
    /**
     * 문항 난이도
     */
    questionLevel?: com_ever_edu_cms_exam_dto_res_ExamQuestionResDto.questionLevel;
    /**
     * 보기 수
     */
    optionCount?: number;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 보기 목록
     */
    options?: Array<com_ever_edu_cms_exam_dto_res_ExamQuestionOptionResDto>;
};
export namespace com_ever_edu_cms_exam_dto_res_ExamQuestionResDto {
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
    /**
     * 문항 난이도
     */
    export enum questionLevel {
        HARD = 'HARD',
        MEDIUM = 'MEDIUM',
        EASY = 'EASY',
    }
}

