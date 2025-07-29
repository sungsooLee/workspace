/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_pkg_dto_req_PkgTreeSaveReqDto = {
    packageId: number;
    parentNodeId?: number;
    itemType: com_ever_edu_lms_pkg_dto_req_PkgTreeSaveReqDto.itemType;
    /**
     * SUB_PACKAGE 타입일 때 null 가능 (자동 생성)
     */
    itemId?: number;
};
export namespace com_ever_edu_lms_pkg_dto_req_PkgTreeSaveReqDto {
    export enum itemType {
        COURSE = 'COURSE',
        SUB_PACKAGE = 'SUB_PACKAGE',
        PACKAGE_ROOT = 'PACKAGE_ROOT',
    }
}

