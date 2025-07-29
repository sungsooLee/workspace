/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_exam_dto_req_ExamQuestionOptionReqDto } from './com_ever_edu_cms_exam_dto_req_ExamQuestionOptionReqDto';
export type com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto = {
    /**
     * 콘텐츠 UUID
     */
    contentUuid: string;
    /**
     * 콘텐츠 타입
     */
    contentType: com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto.contentType;
    /**
     * 시험 문항 UUID
     */
    examQuestionUuid: string;
    /**
     * 시험 문항의 유형(SINGLE/MULTIPLE/OX/SHORT_ANSWER/ESSAY)
     */
    questionType: com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto.questionType;
    /**
     * 시험 문항의 난이도(HARD/MEDIUM/EASY)
     */
    questionLevel: com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto.questionLevel;
    /**
     * 시험 문항
     */
    questionText: string;
    /**
     * 시험 문항의 설명
     */
    explainText?: string | null;
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 시험 문항의 첨부 파일 UUID
     */
    fileUuid?: string | null;
    /**
     * 시험 문항 선택지의 첨부 파일 유형(IMG/FILE)
     */
    fileType?: com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto.fileType | null;
    /**
     * 정렬 순서
     */
    sortSeq?: number;
    /**
     * 보기의 첨부파일 그룹 UUID
     */
    optionFileGroupUuid?: string | null;
    /**
     * 시험 문항 선택지 목록
     */
    options: Array<com_ever_edu_cms_exam_dto_req_ExamQuestionOptionReqDto>;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamQuestionUpdateReqDto {
    /**
     * 콘텐츠 타입
     */
    export enum contentType {
        VIDEO = 'VIDEO',
        EBOOK = 'EBOOK',
        SCORM = 'SCORM',
        HTML5_VIDEO = 'HTML5_VIDEO',
        IMAGE = 'IMAGE',
        EXTERNAL_LINK = 'EXTERNAL_LINK',
        EXTERNAL_AGENCY = 'EXTERNAL_AGENCY',
        BLOG = 'BLOG',
        EXAM = 'EXAM',
        EXAM_POOL = 'EXAM_POOL',
        ASSIGNMENT = 'ASSIGNMENT',
        SURVEY = 'SURVEY',
        ETC = 'ETC',
    }
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
     * 시험 문항 선택지의 첨부 파일 유형(IMG/FILE)
     */
    export enum fileType {
        IMG = 'IMG',
        FILE = 'FILE',
    }
}

