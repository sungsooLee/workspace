/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_category_dto_res_CategoryMasterFlatDto = {
    id?: number;
    parentId?: number;
    name?: string;
    sortSeq?: number;
    categoryType?: com_ever_edu_lms_category_dto_res_CategoryMasterFlatDto.categoryType;
};
export namespace com_ever_edu_lms_category_dto_res_CategoryMasterFlatDto {
    export enum categoryType {
        ROOT = 'ROOT',
        COMMON = 'COMMON',
        TENANT = 'TENANT',
    }
}

