/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form2_dto_req_FormResultFieldOptionRequestDto } from './com_ever_edu_lms_form2_dto_req_FormResultFieldOptionRequestDto';
export type com_ever_edu_lms_form2_dto_req_FormResultFieldRequestDto = {
    fieldId?: number;
    fieldName: string;
    fieldLabel: string;
    fieldType: com_ever_edu_lms_form2_dto_req_FormResultFieldRequestDto.fieldType;
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
    options?: Array<com_ever_edu_lms_form2_dto_req_FormResultFieldOptionRequestDto>;
};
export namespace com_ever_edu_lms_form2_dto_req_FormResultFieldRequestDto {
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

