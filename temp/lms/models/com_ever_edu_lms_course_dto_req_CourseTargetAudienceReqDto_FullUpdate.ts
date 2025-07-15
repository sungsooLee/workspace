/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate';
/**
 * 학습대상-유저그룹
 */
export type com_ever_edu_lms_course_dto_req_CourseTargetAudienceReqDto_FullUpdate = {
    /**
     * 학습대상 그룹 ID
     */
    groupId?: number;
    /**
     * 학습대상 유저 그룹 조합
     */
    combiners?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate>;
};

