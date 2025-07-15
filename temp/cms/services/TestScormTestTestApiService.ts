/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_scorm_dto_req_ScormProcessionReqDto } from '../models/com_ever_edu_cms_scorm_dto_req_ScormProcessionReqDto';
import type { com_ever_edu_cms_scorm_dto_res_ScormStatusResDto } from '../models/com_ever_edu_cms_scorm_dto_res_ScormStatusResDto';
import type { com_ever_edu_global_excel_dto_res_ExcelDownloadReasonResDto } from '../models/com_ever_edu_global_excel_dto_res_ExcelDownloadReasonResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestScormTestTestApiService {
    /**
     * SCORM 업로드 파일 처리(사용금지 - 임시 테스트용)
     * SCORM 업로드 퍼일 처리(사용금지 - 임시 테스트용)
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static startProcessing(
        requestBody: com_ever_edu_cms_scorm_dto_req_ScormProcessionReqDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/scorm/processing',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 테스트 화면에서 엑셀다운로드 이력 저장 - 사용금지(임시 테스트용)
     * 테스트 화면에서 엑셀다운로드 이력 저장한다.
     * @returns com_ever_edu_global_excel_dto_res_ExcelDownloadReasonResDto OK
     * @throws ApiError
     */
    public static callExcelHistoryApi(): CancelablePromise<com_ever_edu_global_excel_dto_res_ExcelDownloadReasonResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/scorm/download/history',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                405: `Method Not Allowed`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 테스트 화면에서 SCORM 콘텐츠 목록 조회 - 사용금지(임시 테스트용)
     * 테스트 화면에서 SCORM 콘텐츠 목록 조회을 조회한다.
     * @returns com_ever_edu_cms_scorm_dto_res_ScormStatusResDto OK
     * @throws ApiError
     */
    public static getScormList(): CancelablePromise<Array<com_ever_edu_cms_scorm_dto_res_ScormStatusResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/scorm/contents',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
}
