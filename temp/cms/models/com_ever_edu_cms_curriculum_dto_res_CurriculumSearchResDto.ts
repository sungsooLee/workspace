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
    curriculumType?: com_ever_edu_cms_curriculum_dto_res_CurriculumSearchResDto.curriculumType;
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
    export enum curriculumType {
        GENERAL = 'GENERAL',
        ASSESSMENT = 'ASSESSMENT',
        SURVEY = 'SURVEY',
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

