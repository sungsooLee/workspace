/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_exam_dto_res_ExamQuestionOptionResDto } from './com_ever_edu_cms_exam_dto_res_ExamQuestionOptionResDto';
export type com_ever_edu_cms_exam_dto_res_ExamQuestionResDto = {
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
     * 시험 문항의 참고 파일
     */
    fileUuid?: string | null;
    /**
     * 시험 문항의 참고 파일 - 물리파일명
     */
    fileName?: string | null;
    /**
     * 시험 문항의 참고 파일 - 물리파일크기
     */
    fileSize?: number | null;
    /**
     * 시험 문항의 참고 파일 - 물리파일경로
     */
    filePath?: string | null;
    /**
     * 시험 문항의 첨부 파일 유형(IMG/FILE)
     */
    fileType?: com_ever_edu_cms_exam_dto_res_ExamQuestionResDto.fileType | null;
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
    /**
     * 시험 문항의 첨부 파일 유형(IMG/FILE)
     */
    export enum fileType {
        IMG = 'IMG',
        FILE = 'FILE',
    }
}

