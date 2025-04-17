/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto } from './com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto';
import type { com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto } from './com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto';
export type com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto = {
    educationPlaceId?: number;
    uuid?: string;
    educationPlaceTypecd?: com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto.educationPlaceTypecd;
    educationPlaceCode?: string;
    educationPlaceCodeName?: string;
    isReservationUsed?: boolean;
    mapImageFileGroupId?: number;
    mapImageFileInfo?: com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto;
    mapImageLinkContent?: string;
    educationPlaceRemarkContent?: string;
    isUsed?: boolean;
    tenantList?: Array<com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto>;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_educationplace_dto_res_EducationPlaceResDto {
    export enum educationPlaceTypecd {
        CAMPUS = 'CAMPUS',
        SERVISE_TECH = 'SERVISE_TECH',
        ME_CLUSTER = 'ME_CLUSTER',
        OUTSIDE = 'OUTSIDE',
        ABROAD = 'ABROAD',
    }
}

