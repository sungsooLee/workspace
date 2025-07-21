/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 유저 그룹 조합
 */
export type com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteCombinerResDto = {
    /**
     * 조합 종류 타입
     */
    combineType?: com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteCombinerResDto.combineType;
    /**
     * 조합 넘버
     */
    combineValue?: number;
    /**
     * 조합 타입별 넘버 이름
     */
    combineName?: string;
};
export namespace com_ever_edu_lms_blackwhitecall_dto_res_BlackAndWhiteCombinerResDto {
    /**
     * 조합 종류 타입
     */
    export enum combineType {
        USER_GROUP = 'USER_GROUP',
    }
}

