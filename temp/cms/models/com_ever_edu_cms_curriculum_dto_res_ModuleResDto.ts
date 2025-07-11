/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_curriculum_dto_res_LessonResDto } from './com_ever_edu_cms_curriculum_dto_res_LessonResDto';
export type com_ever_edu_cms_curriculum_dto_res_ModuleResDto = {
    moduleId?: number;
    moduleName?: string;
    description?: string;
    moduleType?: com_ever_edu_cms_curriculum_dto_res_ModuleResDto.moduleType;
    sortOrder?: number;
    isDummy?: boolean;
    createdBy?: string;
    lastModifiedBy?: string;
    createdDate?: string;
    modifiedDate?: string;
    lessonList?: Array<com_ever_edu_cms_curriculum_dto_res_LessonResDto>;
};
export namespace com_ever_edu_cms_curriculum_dto_res_ModuleResDto {
    export enum moduleType {
        GENERAL = 'GENERAL',
        FIXED = 'FIXED',
    }
}

