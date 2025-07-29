/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_external_blackandwhite_dto_res_WhiteGroupResDto } from './com_ever_edu_external_blackandwhite_dto_res_WhiteGroupResDto';
export type com_ever_edu_lms_category_dto_res_TenantCategoryDto = {
    categoryId?: number;
    categoryName?: string;
    categoryCode?: string;
    categoryType?: com_ever_edu_lms_category_dto_res_TenantCategoryDto.categoryType;
    categoryContent?: string;
    isUsed?: boolean;
    tenantIsUsed?: boolean;
    whiteList?: Array<com_ever_edu_external_blackandwhite_dto_res_WhiteGroupResDto>;
    categoryPath?: string;
};
export namespace com_ever_edu_lms_category_dto_res_TenantCategoryDto {
    export enum categoryType {
        ROOT = 'ROOT',
        COMMON = 'COMMON',
        TENANT = 'TENANT',
    }
}

