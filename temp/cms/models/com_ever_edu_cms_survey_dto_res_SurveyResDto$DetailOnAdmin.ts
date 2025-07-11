/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin = {
    contentId?: number;
    contentName?: string;
    contentType?: com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin.contentType;
    surveyType?: com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin.surveyType;
    comment?: string;
    isSmsRequired?: boolean;
};
export namespace com_ever_edu_cms_survey_dto_res_SurveyResDto$DetailOnAdmin {
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
    export enum surveyType {
        COURSE = 'COURSE',
        WORK = 'WORK',
        NORMAL = 'NORMAL',
        TARGET = 'TARGET',
    }
}

