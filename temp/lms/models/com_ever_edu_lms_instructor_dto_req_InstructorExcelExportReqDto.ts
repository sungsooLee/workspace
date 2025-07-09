/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto } from './com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto';
export type com_ever_edu_lms_instructor_dto_req_InstructorExcelExportReqDto = {
    /**
     * 테넌트ID
     */
    tenantId?: number;
    /**
     * 강사타입(사내/사외)
     */
    instructorType?: com_ever_edu_lms_instructor_dto_req_InstructorExcelExportReqDto.instructorType;
    /**
     * 이름
     */
    instructorName?: string;
    /**
     * 사번 또는 이메일
     */
    employeeIdOrEmail?: string;
    /**
     * 메뉴ID
     */
    menuId: number;
    downloadReason?: com_ever_edu_global_excel_dto_req_ExcelDownloadReasonReqDto;
};
export namespace com_ever_edu_lms_instructor_dto_req_InstructorExcelExportReqDto {
    /**
     * 강사타입(사내/사외)
     */
    export enum instructorType {
        INTERNAL_INSTRUCTOR = 'INTERNAL_INSTRUCTOR',
        EXTERNAL_INSTRUCTOR = 'EXTERNAL_INSTRUCTOR',
    }
}

