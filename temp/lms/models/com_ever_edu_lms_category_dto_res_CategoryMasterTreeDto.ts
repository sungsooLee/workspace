/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_category_dto_res_TreeBaseDto } from './com_ever_edu_lms_category_dto_res_TreeBaseDto';
export type com_ever_edu_lms_category_dto_res_CategoryMasterTreeDto = {
    id?: number;
    name?: string;
    categoryType?: com_ever_edu_lms_category_dto_res_CategoryMasterTreeDto.categoryType;
    sortSeq?: number;
    depth?: number;
    children?: Array<com_ever_edu_lms_category_dto_res_TreeBaseDto>;
};
export namespace com_ever_edu_lms_category_dto_res_CategoryMasterTreeDto {
    export enum categoryType {
        ROOT = 'ROOT',
        COMMON = 'COMMON',
        TENANT = 'TENANT',
    }
}

