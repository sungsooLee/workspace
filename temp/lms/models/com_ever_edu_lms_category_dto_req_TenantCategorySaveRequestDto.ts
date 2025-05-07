/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto';
export type com_ever_edu_lms_category_dto_req_TenantCategorySaveRequestDto = {
    name: string;
    categoryCode: string;
    categoryContent?: string;
    categoryType: com_ever_edu_lms_category_dto_req_TenantCategorySaveRequestDto.categoryType;
    sortSeq?: number;
    parentId?: number;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto>;
};
export namespace com_ever_edu_lms_category_dto_req_TenantCategorySaveRequestDto {
    export enum categoryType {
        ROOT = 'ROOT',
        COMMON = 'COMMON',
        TENANT = 'TENANT',
    }
}

