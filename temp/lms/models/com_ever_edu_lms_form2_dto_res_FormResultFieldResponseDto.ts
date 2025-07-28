/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_res_FormResultFieldOptionResponseDto } from './com_ever_edu_lms_form2_dto_res_FormResultFieldOptionResponseDto';
export type com_ever_edu_lms_form2_dto_res_FormResultFieldResponseDto = {
    fieldId?: number;
    fieldName?: string;
    fieldLabel?: string;
    fieldType?: com_ever_edu_lms_form2_dto_res_FormResultFieldResponseDto.fieldType;
    fieldOrder?: number;
    isRequired?: boolean;
    placeholderText?: string;
    helpText?: string;
    validationRule?: string;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    defaultValue?: string;
    isActive?: boolean;
    options?: Array<com_ever_edu_lms_form2_dto_res_FormResultFieldOptionResponseDto>;
};
export namespace com_ever_edu_lms_form2_dto_res_FormResultFieldResponseDto {
    export enum fieldType {
        TEXT = 'TEXT',
        TEXTAREA = 'TEXTAREA',
        SELECT = 'SELECT',
        RADIO = 'RADIO',
        CHECKBOX = 'CHECKBOX',
        DATE = 'DATE',
        FILE = 'FILE',
        EMAIL = 'EMAIL',
        PHONE = 'PHONE',
        NUMBER = 'NUMBER',
    }
}

