/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 학습대상 유저 그룹 조합
 */
export type com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteCombinerResDto = {
    /**
     * 조합 종류 타입
     */
    combineType?: com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteCombinerResDto.combineType;
    /**
     * 조합 넘버
     */
    combineValue?: number;
    /**
     * 조합 이름
     */
    combinerPath?: Array<string>;
};
export namespace com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteCombinerResDto {
    /**
     * 조합 종류 타입
     */
    export enum combineType {
        USER_GROUP = 'USER_GROUP',
    }
}

