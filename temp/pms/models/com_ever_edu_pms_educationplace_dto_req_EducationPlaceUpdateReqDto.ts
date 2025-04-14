/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto } from './com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto';
export type com_ever_edu_pms_educationplace_dto_req_EducationPlaceUpdateReqDto = {
    uuid: string;
    educationPlaceTypecd: string;
    educationPlaceCode: string;
    tenantList: Array<com_ever_edu_pms_educationplace_dto_req_EducationPlaceTenantReqDto>;
    educationPlaceCodeName: string;
    isReservationUsed: boolean;
    mapImgLinkContent?: string;
    educationPlaceEtcContent?: string;
    isUsed: boolean;
};

