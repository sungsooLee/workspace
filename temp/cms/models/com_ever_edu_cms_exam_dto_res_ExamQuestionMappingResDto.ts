/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto = {
    examQuestionUuid?: string;
    questionType?: com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto.questionType;
    questionLevel?: com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto.questionLevel;
    isUsed?: boolean;
    questionText?: string;
    sortSeq?: number;
    optionCount?: number;
};
export namespace com_ever_edu_cms_exam_dto_res_ExamQuestionMappingResDto {
    export enum questionType {
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
        OX = 'OX',
        SHORT_ANSWER = 'SHORT_ANSWER',
        ESSAY = 'ESSAY',
    }
    export enum questionLevel {
        HARD = 'HARD',
        MEDIUM = 'MEDIUM',
        EASY = 'EASY',
    }
}

