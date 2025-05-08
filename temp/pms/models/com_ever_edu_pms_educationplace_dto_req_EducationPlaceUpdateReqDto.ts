/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto } from './com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto';
export type com_ever_edu_pms_educationplace_dto_req_EducationPlaceUpdateReqDto = {
    educationPlaceUuid: string;
    educationPlaceTypecd: com_ever_edu_pms_educationplace_dto_req_EducationPlaceUpdateReqDto.educationPlaceTypecd;
    educationPlaceCode: string;
    tenantList: Array<com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto>;
    educationPlaceCodeName: string;
    isReservationUsed: boolean;
    mapImageFileGroupId?: number;
    mapImageLinkContent?: string;
    educationPlaceRemarkContent?: string;
    isUsed: boolean;
};
export namespace com_ever_edu_pms_educationplace_dto_req_EducationPlaceUpdateReqDto {
    export enum educationPlaceTypecd {
        CAMPUS = 'CAMPUS',
        SERVISE_TECH = 'SERVISE_TECH',
        ME_CLUSTER = 'ME_CLUSTER',
        OUTSIDE = 'OUTSIDE',
        ABROAD = 'ABROAD',
    }
}

