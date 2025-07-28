/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto = {
    contentName?: string;
    examQuestionUuid?: string;
    questionText?: string;
    questionType?: com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto.questionType;
    languageCountryCode?: com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto.languageCountryCode;
    tenantName?: string;
    channelName?: string;
};
export namespace com_ever_edu_cms_exam_dto_res_ExamQuestionSearchResDto {
    export enum questionType {
        SINGLE = 'SINGLE',
        MULTIPLE = 'MULTIPLE',
        OX = 'OX',
        SHORT_ANSWER = 'SHORT_ANSWER',
        ESSAY = 'ESSAY',
    }
    export enum languageCountryCode {
        KO = 'KO',
        EN = 'EN',
        ES = 'ES',
        AR = 'AR',
        RU = 'RU',
        FR = 'FR',
        PT = 'PT',
        ID = 'ID',
        ZH = 'ZH',
        VI = 'VI',
        TR = 'TR',
        TH = 'TH',
        DE = 'DE',
        HE = 'HE',
        NE = 'NE',
        FA = 'FA',
        HI = 'HI',
        JA = 'JA',
        MS = 'MS',
        IT = 'IT',
        SK = 'SK',
        RO = 'RO',
        HR = 'HR',
        ET = 'ET',
    }
}

