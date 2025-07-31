/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_curriculum_dto_res_LessonResDto } from './com_ever_edu_cms_curriculum_dto_res_LessonResDto';
export type com_ever_edu_cms_curriculum_dto_res_ModuleResDto = {
    /**
     * Enum(cms.curriculum.MappingCurriculumType)<br>- LESSON<br>- MODULE<br>- CURRICULUM
     */
    mappingCurriculumType?: com_ever_edu_cms_curriculum_dto_res_ModuleResDto.mappingCurriculumType;
    moduleId?: number;
    moduleName?: string;
    /**
     * Enum(cms.curriculum.ModuleType)<br>- GENERAL: 목차형 모듈 유형<br>- FIXED: 스콤형 모듈 유형
     */
    moduleType?: com_ever_edu_cms_curriculum_dto_res_ModuleResDto.moduleType;
    sortOrder?: number;
    isDummy?: boolean;
    createdBy?: string;
    creatorName?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifyerName?: string;
    modifiedDate?: string;
    lessonList?: Array<com_ever_edu_cms_curriculum_dto_res_LessonResDto>;
    moduleDescription?: string;
};
export namespace com_ever_edu_cms_curriculum_dto_res_ModuleResDto {
    /**
     * Enum(cms.curriculum.MappingCurriculumType)<br>- LESSON<br>- MODULE<br>- CURRICULUM
     */
    export enum mappingCurriculumType {
        LESSON = 'LESSON',
        MODULE = 'MODULE',
        CURRICULUM = 'CURRICULUM',
    }
    /**
     * Enum(cms.curriculum.ModuleType)<br>- GENERAL: 목차형 모듈 유형<br>- FIXED: 스콤형 모듈 유형
     */
    export enum moduleType {
        GENERAL = 'GENERAL',
        FIXED = 'FIXED',
    }
}

