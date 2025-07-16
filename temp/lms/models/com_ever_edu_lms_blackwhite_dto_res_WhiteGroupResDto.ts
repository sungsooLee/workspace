/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteCombinerResDto } from './com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteCombinerResDto';
/**
 * 대상-유저그룹
 */
export type com_ever_edu_lms_blackwhite_dto_res_WhiteGroupResDto = {
    /**
     * 그룹 ID
     */
    groupId?: number;
    /**
     * 경로 키
     */
    pathKey?: string;
    /**
     * 경로 이름
     */
    pathValue?: string;
    /**
     * 유저 그룹 조합
     */
    combiners?: Array<com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteCombinerResDto>;
};

