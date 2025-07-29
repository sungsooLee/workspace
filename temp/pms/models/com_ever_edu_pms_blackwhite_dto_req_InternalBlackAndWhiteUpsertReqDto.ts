/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_blackwhite_dto_req_WhiteGroupReqDto } from './com_ever_edu_pms_blackwhite_dto_req_WhiteGroupReqDto';
export type com_ever_edu_pms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto = {
    /**
     * 유저그룹 매핑 도메인 유형, enum: BlackAndWhiteGroupMappingType
     */
    blackAndWhiteGroupMappingType: com_ever_edu_pms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto.blackAndWhiteGroupMappingType;
    /**
     * 매핑 도메인 Id ex) 과정id, 채널id, 카테고리id 등
     */
    mappingId?: number;
    /**
     * 대상-유저그룹
     */
    targetList?: Array<com_ever_edu_pms_blackwhite_dto_req_WhiteGroupReqDto>;
};
export namespace com_ever_edu_pms_blackwhite_dto_req_InternalBlackAndWhiteUpsertReqDto {
    /**
     * 유저그룹 매핑 도메인 유형, enum: BlackAndWhiteGroupMappingType
     */
    export enum blackAndWhiteGroupMappingType {
        COURSE = 'COURSE',
        SEQUENCE = 'SEQUENCE',
        CATEGORY = 'CATEGORY',
        CHANNEL = 'CHANNEL',
        ROLE = 'ROLE',
        COMPANY_RESTRICTION = 'COMPANY_RESTRICTION',
    }
}

