/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_exam_dto_req_ExamQuestionSearchReqDto = {
    /**
     * 등록주체 문제은행의 콘텐트 UUID
     */
    examPoolUuid: string;
    /**
     * 테넌트 ID
     */
    tenantId: number;
    /**
     * 채널 UUID
     */
    channelUuid: string;
    /**
     * 문제은행 이름
     */
    contentName?: string;
    /**
     * 시험 문항의 유형(MULTIPLE/OX/SHORT_ANSWER/ESSAY)
     */
    questionType?: com_ever_edu_cms_exam_dto_req_ExamQuestionSearchReqDto.questionType;
    /**
     * 시험 문항의 난이도(HARD/MEDIUM/EASY)
     */
    questionLevel?: com_ever_edu_cms_exam_dto_req_ExamQuestionSearchReqDto.questionLevel;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamQuestionSearchReqDto {
    /**
     * 시험 문항의 유형(MULTIPLE/OX/SHORT_ANSWER/ESSAY)
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
}

