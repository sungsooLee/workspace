/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_res_FormApplicationFieldResponseDto } from './com_ever_edu_lms_form2_dto_res_FormApplicationFieldResponseDto';
import type { com_ever_edu_lms_form2_dto_res_FormPopupSettingResponseDto } from './com_ever_edu_lms_form2_dto_res_FormPopupSettingResponseDto';
import type { com_ever_edu_lms_form2_dto_res_FormResultFieldResponseDto } from './com_ever_edu_lms_form2_dto_res_FormResultFieldResponseDto';
export type com_ever_edu_lms_form2_dto_res_FormExternalEducationDetailResponseDto = {
    formId?: number;
    tenantId?: number;
    formTitle?: string;
    formDescription?: string;
    formStatus?: com_ever_edu_lms_form2_dto_res_FormExternalEducationDetailResponseDto.formStatus;
    applicationStartDate?: string;
    applicationEndDate?: string;
    educationStartDate?: string;
    educationEndDate?: string;
    maxApplicants?: number;
    currentApplicants?: number;
    educationProvider?: string;
    educationLocation?: string;
    educationCost?: number;
    approvalRequired?: boolean;
    applicationFields?: Array<com_ever_edu_lms_form2_dto_res_FormApplicationFieldResponseDto>;
    resultFields?: Array<com_ever_edu_lms_form2_dto_res_FormResultFieldResponseDto>;
    popupSetting?: com_ever_edu_lms_form2_dto_res_FormPopupSettingResponseDto;
};
export namespace com_ever_edu_lms_form2_dto_res_FormExternalEducationDetailResponseDto {
    export enum formStatus {
        DRAFT = 'DRAFT',
        PUBLISHED = 'PUBLISHED',
        CLOSED = 'CLOSED',
        DELETED = 'DELETED',
    }
}

