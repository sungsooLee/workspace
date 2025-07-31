/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto = {
    curriculumId?: number;
    curriculumName?: string;
    curriculumDescription?: string;
    tenantId?: number;
    tenantName?: string;
    channelUuid?: string;
    channelName?: string;
    /**
     * Enum(cms.curriculum.CurriculumType)<br>- GENERAL: 일반(이러닝I,II, 클래스, 라이브)<br>- ASSESSMENT:평가<br>- SURVEY: 설문
     */
    curriculumType?: com_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto.curriculumType;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto.languageCountryCode;
    coordinatorUuid?: string;
    coordinatorName?: string;
    isPublished?: boolean;
    isUsed?: boolean;
    openingYear?: number;
    createdBy?: string;
    creatorName?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifierName?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto {
    /**
     * Enum(cms.curriculum.CurriculumType)<br>- GENERAL: 일반(이러닝I,II, 클래스, 라이브)<br>- ASSESSMENT:평가<br>- SURVEY: 설문
     */
    export enum curriculumType {
        GENERAL = 'GENERAL',
        ASSESSMENT = 'ASSESSMENT',
        SURVEY = 'SURVEY',
    }
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
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

