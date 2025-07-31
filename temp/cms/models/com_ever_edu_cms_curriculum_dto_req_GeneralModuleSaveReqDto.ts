/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_req_GeneralModuleSaveReqDto = {
    curriculumId?: number;
    moduleName?: string;
    /**
     * Enum(cms.curriculum.ModuleType)<br>- GENERAL: 목차형 모듈 유형<br>- FIXED: 스콤형 모듈 유형
     */
    moduleType?: com_ever_edu_cms_curriculum_dto_req_GeneralModuleSaveReqDto.moduleType;
    moduleDescription?: string;
};
export namespace com_ever_edu_cms_curriculum_dto_req_GeneralModuleSaveReqDto {
    /**
     * Enum(cms.curriculum.ModuleType)<br>- GENERAL: 목차형 모듈 유형<br>- FIXED: 스콤형 모듈 유형
     */
    export enum moduleType {
        GENERAL = 'GENERAL',
        FIXED = 'FIXED',
    }
}

