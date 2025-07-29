/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 보기 목록
 */
export type com_ever_edu_cms_exam_dto_res_ExamQuestionOptionResDto = {
    /**
     * 정렬순서
     */
    sortSeq?: number;
    /**
     * 보기 내용
     */
    examOptionText?: string;
    /**
     * 정답 여부
     */
    isCorrectAnswer?: boolean;
    /**
     * 첨부파일 UUID
     */
    fileUuid?: string;
    /**
     * 참고 파일 - 물리파일명
     */
    fileName?: string | null;
    /**
     * 참고 파일 - 물리파일크기
     */
    fileSize?: number | null;
    /**
     * 참고 파일 - 물리파일경로
     */
    filePath?: string | null;
};

