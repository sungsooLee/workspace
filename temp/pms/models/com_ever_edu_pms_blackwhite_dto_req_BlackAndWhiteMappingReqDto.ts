/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto } from './com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto';
export type com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteMappingReqDto = {
    blackAndWhiteType: com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteMappingReqDto.blackAndWhiteType;
    groupMappingType: com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteMappingReqDto.groupMappingType;
    mappingId: number;
    combineOperator: com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteMappingReqDto.combineOperator;
    combiners: Array<com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto>;
};
export namespace com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteMappingReqDto {
    export enum blackAndWhiteType {
        BLACK = 'BLACK',
        WHITE = 'WHITE',
    }
    export enum groupMappingType {
        COURSE = 'COURSE',
        SEQUENCE = 'SEQUENCE',
        CATEGORY = 'CATEGORY',
        CHANNEL = 'CHANNEL',
        ROLE = 'ROLE',
        COMPANY_RESTRICTION = 'COMPANY_RESTRICTION',
    }
    export enum combineOperator {
        AND = 'AND',
        OR = 'OR',
        NONE = 'NONE',
    }
}

