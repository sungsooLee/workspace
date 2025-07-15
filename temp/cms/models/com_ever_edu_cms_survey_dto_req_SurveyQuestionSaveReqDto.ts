/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_survey_dto_req_SurveyExampleSaveReqDto } from './com_ever_edu_cms_survey_dto_req_SurveyExampleSaveReqDto';
export type com_ever_edu_cms_survey_dto_req_SurveyQuestionSaveReqDto = {
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
    questionCategory: com_ever_edu_cms_survey_dto_req_SurveyQuestionSaveReqDto.questionCategory;
    /**
     * 문제 유형(NORMAL/RELATED/MATRIX)
     */
    questionType: com_ever_edu_cms_survey_dto_req_SurveyQuestionSaveReqDto.questionType;
    /**
     * 문제 본문
     */
    questionText: string;
    /**
     * 필수 여부
     */
    isEssential: boolean;
    examples: Array<com_ever_edu_cms_survey_dto_req_SurveyExampleSaveReqDto>;
};
export namespace com_ever_edu_cms_survey_dto_req_SurveyQuestionSaveReqDto {
    /**
     * 문제 분류(MULTIPLE/MIXED/RATE/DESCRIPTIVE)
     */
    export enum questionCategory {
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
        RATE = 'RATE',
        DESCRIPTIVE = 'DESCRIPTIVE',
    }
    /**
     * 문제 유형(NORMAL/RELATED/MATRIX)
     */
    export enum questionType {
        NORMAL = 'NORMAL',
        RELATED = 'RELATED',
        MATRIX = 'MATRIX',
    }
}

