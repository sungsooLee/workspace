/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_form_dto_res_ExternalCourseFormLayoutResDto = {
    isMandatory?: boolean;
    sortOrder?: number;
    externalCourseFormComponentId?: number;
    externalCourseFormComponentType?: com_ever_edu_lms_form_dto_res_ExternalCourseFormLayoutResDto.externalCourseFormComponentType;
    externalCourseFormComponentFieldKey?: com_ever_edu_lms_form_dto_res_ExternalCourseFormLayoutResDto.externalCourseFormComponentFieldKey;
};
export namespace com_ever_edu_lms_form_dto_res_ExternalCourseFormLayoutResDto {
    export enum externalCourseFormComponentType {
        COMMON = 'COMMON',
        CUSTOM = 'CUSTOM',
        OPTIONAL = 'OPTIONAL',
    }
    export enum externalCourseFormComponentFieldKey {
        COURSE_NAME = 'COURSE_NAME',
        COURSE_TYPE = 'COURSE_TYPE',
        COURSE_INSTITUTION = 'COURSE_INSTITUTION',
        COURSE_DESCRIPTION = 'COURSE_DESCRIPTION',
        COURSE_START_DATE = 'COURSE_START_DATE',
        COURSE_END_DATE = 'COURSE_END_DATE',
        SCORE = 'SCORE',
        IS_COMPLETED = 'IS_COMPLETED',
        JOB_SATISFACTION = 'JOB_SATISFACTION',
        COURSE_SATISFACTION = 'COURSE_SATISFACTION',
    }
}

