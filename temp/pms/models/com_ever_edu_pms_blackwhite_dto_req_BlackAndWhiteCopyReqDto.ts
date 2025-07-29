/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCopyReqDto = {
    orgGroupMappingType: com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCopyReqDto.orgGroupMappingType;
    orgMappingId: number;
    trgGroupMappingType: com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCopyReqDto.trgGroupMappingType;
    trgMappingId: number;
};
export namespace com_ever_edu_pms_blackwhite_dto_req_BlackAndWhiteCopyReqDto {
    export enum orgGroupMappingType {
        COURSE = 'COURSE',
        SEQUENCE = 'SEQUENCE',
        CATEGORY = 'CATEGORY',
        CHANNEL = 'CHANNEL',
        ROLE = 'ROLE',
        COMPANY_RESTRICTION = 'COMPANY_RESTRICTION',
    }
    export enum trgGroupMappingType {
        COURSE = 'COURSE',
        SEQUENCE = 'SEQUENCE',
        CATEGORY = 'CATEGORY',
        CHANNEL = 'CHANNEL',
        ROLE = 'ROLE',
        COMPANY_RESTRICTION = 'COMPANY_RESTRICTION',
    }
}

