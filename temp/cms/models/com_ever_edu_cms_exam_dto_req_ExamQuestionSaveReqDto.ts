/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionOptionReqDto } from './com_ever_edu_cms_exam_dto_req_ExamQuestionOptionReqDto';
export type com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto = {
    /**
     * 문제은행 콘텐츠 UUID
     */
    contentUuid: string;
    /**
     * 시험 문항의 유형(SINGLE/MULTIPLE/OX/SHORT_ANSWER/ESSAY)
     */
    questionType: com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto.questionType;
    /**
     * 시험 문항의 난이도(HARD/MEDIUM/EASY)
     */
    questionLevel: com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto.questionLevel;
    /**
     * 시험 문항
     */
    questionText: string;
    /**
     * 시험 문항의 설명
     */
    explainText?: string | null;
    /**
     * 시험 문항의 참고 파일 Uuid
     */
    fileUuid?: string | null;
    /**
     * 시험 문항의 첨부 파일 유형(IMG/FILE)
     */
    fileType?: com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto.fileType | null;
    /**
     * 시험 문항 선택지 목록
     */
    options: Array<com_ever_edu_cms_exam_dto_req_ExamQuestionOptionReqDto>;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamQuestionSaveReqDto {
    /**
     * 시험 문항의 유형(SINGLE/MULTIPLE/OX/SHORT_ANSWER/ESSAY)
     */
    export enum questionType {
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
        OX = 'OX',
        SHORT_ANSWER = 'SHORT_ANSWER',
        ESSAY = 'ESSAY',
    }
    /**
     * 시험 문항의 난이도(HARD/MEDIUM/EASY)
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

