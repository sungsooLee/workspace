/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 시험 문항 선택지 목록
 */
export type com_ever_edu_cms_exam_dto_req_ExamQuestionOptionReqDto = {
    /**
     * 정렬 순서
     */
    sortSeq: number;
    /**
     * 선택지 내용
     */
    examOptionText?: string;
    /**
     * 정답 여부
     */
    isCorrectAnswer: boolean;
    /**
     * 시험 문항 선택지의 첨부 파일 UUID
     */
    fileUuid?: string | null;
};

