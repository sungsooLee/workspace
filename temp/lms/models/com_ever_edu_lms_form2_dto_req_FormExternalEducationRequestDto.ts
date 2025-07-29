/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_req_FormApplicationFieldRequestDto } from './com_ever_edu_lms_form2_dto_req_FormApplicationFieldRequestDto';
import type { com_ever_edu_lms_form2_dto_req_FormPopupSettingRequestDto } from './com_ever_edu_lms_form2_dto_req_FormPopupSettingRequestDto';
import type { com_ever_edu_lms_form2_dto_req_FormResultFieldRequestDto } from './com_ever_edu_lms_form2_dto_req_FormResultFieldRequestDto';
export type com_ever_edu_lms_form2_dto_req_FormExternalEducationRequestDto = {
    formTitle: string;
    formDescription?: string;
    formStatus: com_ever_edu_lms_form2_dto_req_FormExternalEducationRequestDto.formStatus;
    applicationStartDate?: string;
    applicationEndDate?: string;
    educationStartDate?: string;
    educationEndDate?: string;
    maxApplicants?: number;
    educationProvider?: string;
    educationLocation?: string;
    educationCost?: number;
    approvalRequired?: boolean;
    applicationFields?: Array<com_ever_edu_lms_form2_dto_req_FormApplicationFieldRequestDto>;
    resultFields?: Array<com_ever_edu_lms_form2_dto_req_FormResultFieldRequestDto>;
    popupSetting?: com_ever_edu_lms_form2_dto_req_FormPopupSettingRequestDto;
};
export namespace com_ever_edu_lms_form2_dto_req_FormExternalEducationRequestDto {
    export enum formStatus {
        DRAFT = 'DRAFT',
        PUBLISHED = 'PUBLISHED',
        CLOSED = 'CLOSED',
        DELETED = 'DELETED',
    }
}

