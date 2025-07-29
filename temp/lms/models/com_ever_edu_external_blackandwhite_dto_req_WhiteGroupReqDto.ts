/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_external_blackandwhite_dto_req_BlackAndWhiteCombinerReqDto } from './com_ever_edu_external_blackandwhite_dto_req_BlackAndWhiteCombinerReqDto';
export type com_ever_edu_external_blackandwhite_dto_req_WhiteGroupReqDto = {
    /**
     * 그룹 ID : 신규항목일 경우 null 입력
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
    combiners: Array<com_ever_edu_external_blackandwhite_dto_req_BlackAndWhiteCombinerReqDto>;
};

