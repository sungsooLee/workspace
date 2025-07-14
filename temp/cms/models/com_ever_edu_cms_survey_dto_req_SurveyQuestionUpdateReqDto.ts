/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_survey_dto_req_SurveyExampleUpdateReqDto } from './com_ever_edu_cms_survey_dto_req_SurveyExampleUpdateReqDto';
export type com_ever_edu_cms_survey_dto_req_SurveyQuestionUpdateReqDto = {
    /**
     * 문제 ID
     */
    surveyQuestionId?: number | null;
    /**
     * 상위 문제 번호(연관문제일 경우)
     */
    parentQuestionId?: number | null;
    /**
     * 문제 순번
     */
    sortSeq: number;
    /**
     * 문제 분류(MULTIPLE/MIXED/RATE/DESCRIPTIVE)
     */
    questionCategoryCode: com_ever_edu_cms_survey_dto_req_SurveyQuestionUpdateReqDto.questionCategoryCode;
    /**
     * 문제 유형(NORMAL/RELATED/MATRIX)
     */
    questionTypeCode: com_ever_edu_cms_survey_dto_req_SurveyQuestionUpdateReqDto.questionTypeCode;
    /**
     * 문제 본문
     */
    questionText: string;
    /**
     * 필수 여부
     */
    isEssential: boolean;
    examples: Array<com_ever_edu_cms_survey_dto_req_SurveyExampleUpdateReqDto>;
};
export namespace com_ever_edu_cms_survey_dto_req_SurveyQuestionUpdateReqDto {
    /**
     * 문제 분류(MULTIPLE/MIXED/RATE/DESCRIPTIVE)
     */
    export enum questionCategoryCode {
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
        RATE = 'RATE',
        DESCRIPTIVE = 'DESCRIPTIVE',
    }
    /**
     * 문제 유형(NORMAL/RELATED/MATRIX)
     */
    export enum questionTypeCode {
        NORMAL = 'NORMAL',
        RELATED = 'RELATED',
        MATRIX = 'MATRIX',
    }
}

