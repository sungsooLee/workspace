/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto } from './com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto';
export type com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto = {
    educationPlaceId?: number;
    uuid?: string;
    educationPlaceTypecd?: string;
    educationPlaceCode?: string;
    educationPlaceCodeName?: string;
    isReservationUsed?: boolean;
    mapImageLinkContent?: string;
    educationPlaceEtcContent?: string;
    isUsed?: boolean;
    tenantList?: Array<com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto>;
    firstRgstrId?: string;
    firstRegTmstamp?: string;
    finalUpdaterId?: string;
    finalUpdateTmstamp?: string;
};

