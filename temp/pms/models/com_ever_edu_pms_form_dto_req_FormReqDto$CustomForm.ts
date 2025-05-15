/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_form_dto_FormJsonDto } from './com_ever_edu_pms_form_dto_FormJsonDto';
export type com_ever_edu_pms_form_dto_req_FormReqDto$CustomForm = {
    /**
     * Form UUID
     */
    formUUID?: string;
    /**
     * 테넌트 UUID
     */
    tenantUUID?: string;
    /**
     * 특화 폼 json
     */
    json?: Array<com_ever_edu_pms_form_dto_FormJsonDto>;
};

