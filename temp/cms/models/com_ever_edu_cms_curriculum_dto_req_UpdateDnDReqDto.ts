/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_curriculum_dto_req_UpdateDnDReqDto = {
    fromMappingType?: com_ever_edu_cms_curriculum_dto_req_UpdateDnDReqDto.fromMappingType;
    fromMappingId?: number;
    toParentMappingType?: com_ever_edu_cms_curriculum_dto_req_UpdateDnDReqDto.toParentMappingType;
    toParentMappingId?: number;
    sortOrder?: number;
};
export namespace com_ever_edu_cms_curriculum_dto_req_UpdateDnDReqDto {
    export enum fromMappingType {
        LESSON = 'LESSON',
        MODULE = 'MODULE',
        CURRICULUM = 'CURRICULUM',
    }
    export enum toParentMappingType {
        LESSON = 'LESSON',
        MODULE = 'MODULE',
        CURRICULUM = 'CURRICULUM',
    }
}

