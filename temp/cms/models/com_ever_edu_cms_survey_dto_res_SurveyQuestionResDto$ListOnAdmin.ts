/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin = {
    surveyQuestionId?: number;
    parentQuestionId?: number;
    sortSeq?: number;
    questionCategoryCode?: com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin.questionCategoryCode;
    questionTypeCode?: com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin.questionTypeCode;
    questionText?: string;
    isEssential?: boolean;
};
export namespace com_ever_edu_cms_survey_dto_res_SurveyQuestionResDto$ListOnAdmin {
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

