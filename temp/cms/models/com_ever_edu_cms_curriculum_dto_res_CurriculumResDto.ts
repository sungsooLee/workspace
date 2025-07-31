/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_curriculum_dto_res_ModuleResDto } from './com_ever_edu_cms_curriculum_dto_res_ModuleResDto';
export type com_ever_edu_cms_curriculum_dto_res_CurriculumResDto = {
    /**
     * Enum(cms.curriculum.MappingCurriculumType)<br>- LESSON<br>- MODULE<br>- CURRICULUM
     */
    mappingCurriculumType?: com_ever_edu_cms_curriculum_dto_res_CurriculumResDto.mappingCurriculumType;
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
    curriculumType?: com_ever_edu_cms_curriculum_dto_res_CurriculumResDto.curriculumType;
    /**
     * Enum(pms.multilingual.LangCountryCode)
     */
    languageCountryCode?: com_ever_edu_cms_curriculum_dto_res_CurriculumResDto.languageCountryCode;
    coordinatorUuid?: string;
    coordinatorName?: string;
    coordinatorTelNo?: string;
    isVendored?: boolean;
    vendorCode?: number;
    vendorName?: string;
    vendorCoordinatorUuid?: string;
    vendorCoordinatorName?: string;
    vendorTelNo?: string;
    isPublished?: boolean;
    isUsed?: boolean;
    openingYear?: number;
    createdBy?: string;
    creatorName?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifyerName?: string;
    modifiedDate?: string;
    moduleList?: Array<com_ever_edu_cms_curriculum_dto_res_ModuleResDto>;
};
export namespace com_ever_edu_cms_curriculum_dto_res_CurriculumResDto {
    /**
     * Enum(cms.curriculum.MappingCurriculumType)<br>- LESSON<br>- MODULE<br>- CURRICULUM
     */
    export enum mappingCurriculumType {
        LESSON = 'LESSON',
        MODULE = 'MODULE',
        CURRICULUM = 'CURRICULUM',
    }
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

