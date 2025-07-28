/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_util_tree_TreeBaseDto } from './com_ever_edu_lms_util_tree_TreeBaseDto';
export type com_ever_edu_lms_pkg_dto_res_PkgTreeDto = {
    id?: number;
    itemName?: string;
    itemType?: com_ever_edu_lms_pkg_dto_res_PkgTreeDto.itemType;
    sortSeq?: number;
    name?: string;
    depth?: number;
    children?: Array<com_ever_edu_lms_util_tree_TreeBaseDto>;
};
export namespace com_ever_edu_lms_pkg_dto_res_PkgTreeDto {
    export enum itemType {
        COURSE = 'COURSE',
        SUB_PACKAGE = 'SUB_PACKAGE',
        PACKAGE_ROOT = 'PACKAGE_ROOT',
    }
}

