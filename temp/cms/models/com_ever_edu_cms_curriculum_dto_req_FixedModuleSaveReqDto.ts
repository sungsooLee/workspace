/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_req_FixedModuleSaveReqDto = {
    curriculumId?: number;
    moduleName?: string;
    moduleType?: com_ever_edu_cms_curriculum_dto_req_FixedModuleSaveReqDto.moduleType;
    moduleDescription?: string;
    contentUuid?: string;
    orgnId?: number;
    totalTime?: number;
};
export namespace com_ever_edu_cms_curriculum_dto_req_FixedModuleSaveReqDto {
    export enum moduleType {
        GENERAL = 'GENERAL',
        FIXED = 'FIXED',
    }
}

