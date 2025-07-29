/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_form_dto_req_ExternalCourseFormLayoutSaveReqDto$LayoutItem } from './com_ever_edu_lms_form_dto_req_ExternalCourseFormLayoutSaveReqDto$LayoutItem';
export type com_ever_edu_lms_form_dto_req_ExternalCourseFormLayoutSaveReqDto = {
    /**
     * 외부과정 신청 양식 ID
     */
    externalCourseFormId: number;
    /**
     * 외부과정 타입
     */
    externalCourseFormEnrollType: com_ever_edu_lms_form_dto_req_ExternalCourseFormLayoutSaveReqDto.externalCourseFormEnrollType;
    /**
     * 레이아웃 설정 목록
     */
    layouts: Array<com_ever_edu_lms_form_dto_req_ExternalCourseFormLayoutSaveReqDto$LayoutItem>;
};
export namespace com_ever_edu_lms_form_dto_req_ExternalCourseFormLayoutSaveReqDto {
    /**
     * 외부과정 타입
     */
    export enum externalCourseFormEnrollType {
        REGISTRATION = 'REGISTRATION',
        RESULT = 'RESULT',
    }
}

