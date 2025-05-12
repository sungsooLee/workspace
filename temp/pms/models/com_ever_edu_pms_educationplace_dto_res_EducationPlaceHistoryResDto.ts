/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto } from './com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto';
export type com_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto = {
    historyId?: number;
    educationPlaceId?: number;
    educationHistoryTypecd?: com_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto.educationHistoryTypecd;
    educationPlaceHistoryUuid?: string;
    educationPlaceTypecd?: com_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto.educationPlaceTypecd;
    educationPlaceCode?: string;
    educationPlaceCodeName?: string;
    isReservationUsed?: boolean;
    mapImageFileGroupId?: number;
    mapImageLinkContent?: string;
    educationPlaceRemarkContent?: string;
    isUsed?: boolean;
    tenantList?: Array<com_ever_edu_pms_educationplace_dto_res_EducationPlaceTenantResDto>;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_educationplace_dto_res_EducationPlaceHistoryResDto {
    export enum educationHistoryTypecd {
        TEMP_SAVE = 'TEMP_SAVE',
        REGISTER = 'REGISTER',
        UPDATE = 'UPDATE',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        CANCEL = 'CANCEL',
    }
    export enum educationPlaceTypecd {
        CAMPUS = 'CAMPUS',
        SERVISE_TECH = 'SERVISE_TECH',
        ME_CLUSTER = 'ME_CLUSTER',
        OUTSIDE = 'OUTSIDE',
        ABROAD = 'ABROAD',
    }
}

