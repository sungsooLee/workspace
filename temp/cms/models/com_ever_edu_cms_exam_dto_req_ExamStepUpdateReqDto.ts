/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto$ExamRandomQuestionCountReqDto } from './com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto$ExamRandomQuestionCountReqDto';
export type com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto = {
    /**
     * 시험지 콘텐츠 UUID
     */
    contentUuid: string;
    /**
     * 문항 출제 유형
     */
    questionGenType: com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto.questionGenType;
    /**
     * 시험지 문항수
     */
    questionTotalCount: number;
    /**
     * 랜덤형 문항 유형별 시험문항수 목록
     */
    countList?: Array<com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto$ExamRandomQuestionCountReqDto>;
};
export namespace com_ever_edu_cms_exam_dto_req_ExamStepUpdateReqDto {
    /**
     * 문항 출제 유형
     */
    export enum questionGenType {
        FIXED = 'FIXED',
        RANDOM = 'RANDOM',
    }
}

