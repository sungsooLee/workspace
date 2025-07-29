/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_form2_dto_res_FormExternalEducationListResponseDto = {
    formId?: number;
    formTitle?: string;
    formDescription?: string;
    formStatus?: com_ever_edu_lms_form2_dto_res_FormExternalEducationListResponseDto.formStatus;
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
};
export namespace com_ever_edu_lms_form2_dto_res_FormExternalEducationListResponseDto {
    export enum formStatus {
        DRAFT = 'DRAFT',
        PUBLISHED = 'PUBLISHED',
        CLOSED = 'CLOSED',
        DELETED = 'DELETED',
    }
}

