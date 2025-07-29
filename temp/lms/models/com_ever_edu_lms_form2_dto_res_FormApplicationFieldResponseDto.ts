/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_res_FormFieldOptionResponseDto } from './com_ever_edu_lms_form2_dto_res_FormFieldOptionResponseDto';
export type com_ever_edu_lms_form2_dto_res_FormApplicationFieldResponseDto = {
    fieldId?: number;
    fieldName?: string;
    fieldLabel?: string;
    fieldType?: com_ever_edu_lms_form2_dto_res_FormApplicationFieldResponseDto.fieldType;
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
    options?: Array<com_ever_edu_lms_form2_dto_res_FormFieldOptionResponseDto>;
};
export namespace com_ever_edu_lms_form2_dto_res_FormApplicationFieldResponseDto {
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

