/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_req_FormFieldOptionRequestDto } from './com_ever_edu_lms_form2_dto_req_FormFieldOptionRequestDto';
export type com_ever_edu_lms_form2_dto_req_FormApplicationFieldRequestDto = {
    fieldId?: number;
    fieldName: string;
    fieldLabel: string;
    fieldType: com_ever_edu_lms_form2_dto_req_FormApplicationFieldRequestDto.fieldType;
    fieldOrder: number;
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
    options?: Array<com_ever_edu_lms_form2_dto_req_FormFieldOptionRequestDto>;
};
export namespace com_ever_edu_lms_form2_dto_req_FormApplicationFieldRequestDto {
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

