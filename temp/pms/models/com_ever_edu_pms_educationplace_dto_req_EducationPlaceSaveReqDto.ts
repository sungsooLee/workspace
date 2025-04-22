/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto } from './com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto';
export type com_ever_edu_pms_educationplace_dto_req_EducationPlaceSaveReqDto = {
    educationPlaceTypecd: com_ever_edu_pms_educationplace_dto_req_EducationPlaceSaveReqDto.educationPlaceTypecd;
    educationPlaceCode: string;
    educationPlaceCodeName: string;
    tenantList: Array<com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto>;
    /**
     * 사용여부
     */
    isReservationUsed: boolean;
    mapImageFileGroupId?: number;
    mapImageLinkContent?: string;
    educationPlaceRemarkContent?: string;
    isUsed: boolean;
};
export namespace com_ever_edu_pms_educationplace_dto_req_EducationPlaceSaveReqDto {
    export enum educationPlaceTypecd {
        CAMPUS = 'CAMPUS',
        SERVISE_TECH = 'SERVISE_TECH',
        ME_CLUSTER = 'ME_CLUSTER',
        OUTSIDE = 'OUTSIDE',
        ABROAD = 'ABROAD',
    }
}

