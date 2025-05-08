/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_category_dto_req_CategoryMasterSaveRequestDto = {
    name: string;
    categoryCode: string;
    categoryContent?: string;
    categoryType: com_ever_edu_lms_category_dto_req_CategoryMasterSaveRequestDto.categoryType;
    sortSeq?: number;
    parentId?: number;
};
export namespace com_ever_edu_lms_category_dto_req_CategoryMasterSaveRequestDto {
    export enum categoryType {
        ROOT = 'ROOT',
        COMMON = 'COMMON',
        TENANT = 'TENANT',
    }
}

