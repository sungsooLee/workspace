/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto';
export type com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteUpdateReqDto = {
    blackAndWhiteType: com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteUpdateReqDto.blackAndWhiteType;
    groupMappingType: com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteUpdateReqDto.groupMappingType;
    mappingId: number;
    combineOperator: com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteUpdateReqDto.combineOperator;
    combiners: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto>;
};
export namespace com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteUpdateReqDto {
    export enum blackAndWhiteType {
        BLACK = 'BLACK',
        WHITE = 'WHITE',
    }
    export enum groupMappingType {
        COURSE = 'COURSE',
        SEQUENCE = 'SEQUENCE',
        CATEGORY = 'CATEGORY',
        CHANNEL = 'CHANNEL',
    }
    export enum combineOperator {
        AND = 'AND',
        OR = 'OR',
    }
}

