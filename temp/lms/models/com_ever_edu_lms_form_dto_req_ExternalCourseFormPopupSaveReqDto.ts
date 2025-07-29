/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_fasterxml_jackson_databind_JsonNode } from './com_fasterxml_jackson_databind_JsonNode';
export type com_ever_edu_lms_form_dto_req_ExternalCourseFormPopupSaveReqDto = {
    /**
     * 외부과정 신청 양식 ID
     */
    externalCourseFormId: number;
    popupTitle?: string;
    popupContent?: com_fasterxml_jackson_databind_JsonNode;
    isPopupPeriod?: boolean;
    popupStartDate?: string;
    popupEndDate?: string;
    isPopupExposed?: boolean;
};

