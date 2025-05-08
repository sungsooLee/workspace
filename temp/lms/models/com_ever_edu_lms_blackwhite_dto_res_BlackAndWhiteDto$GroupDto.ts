/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$Combine } from './com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$Combine';
export type com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$GroupDto = {
    groupId?: number;
    blackAndWhiteType?: com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$GroupDto.blackAndWhiteType;
    groupMappingType?: com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$GroupDto.groupMappingType;
    mappingId?: number;
    combineOperator?: com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$GroupDto.combineOperator;
    combines?: Array<com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$Combine>;
};
export namespace com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$GroupDto {
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

