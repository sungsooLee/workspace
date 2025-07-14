/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_survey_dto_res_SurveyExampleResDto } from './com_ever_edu_cms_survey_dto_res_SurveyExampleResDto';
export type com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin = {
    surveyQuestionId?: number;
    parentQuestionId?: number;
    sortSeq?: number;
    questionCategoryCode?: com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin.questionCategoryCode;
    questionTypeCode?: com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin.questionTypeCode;
    questionText?: string;
    isEssential?: boolean;
    examples?: Array<com_ever_edu_cms_survey_dto_res_SurveyExampleResDto>;
};
export namespace com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$DetailOnAdmin {
    export enum questionCategoryCode {
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
        RATE = 'RATE',
        DESCRIPTIVE = 'DESCRIPTIVE',
    }
    export enum questionTypeCode {
        NORMAL = 'NORMAL',
        RELATED = 'RELATED',
        MATRIX = 'MATRIX',
    }
}

