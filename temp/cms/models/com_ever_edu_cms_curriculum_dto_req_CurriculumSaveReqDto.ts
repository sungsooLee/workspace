/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_req_CurriculumSaveReqDto = {
    tenantId: number;
    channelUuid: string;
    curriculumName: string;
    curriculumDescription?: string;
    curriculumType: com_ever_edu_cms_curriculum_dto_req_CurriculumSaveReqDto.curriculumType;
    languageCountryCode: com_ever_edu_cms_curriculum_dto_req_CurriculumSaveReqDto.languageCountryCode;
    coordinatorUuid?: string;
    coordinatorName?: string;
    coordinatorTelNo?: string;
    isVendored?: boolean;
    vendorCode?: number;
    vendorName?: string;
    vendorCoordinatorUuid?: string;
    vendorCoordinatorName?: string;
    vendorTelNo?: string;
};
export namespace com_ever_edu_cms_curriculum_dto_req_CurriculumSaveReqDto {
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

