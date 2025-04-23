/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto } from '../models/com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto';
import type { com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto } from '../models/com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoExcelFileInternalApiService {
    /**
     * Excel File 다운로드 이력정보 저장
     * Excel File 다운로드 이력정보를 생성한다.&lt;br&gt; 엑셀 파일 생성 성공 후 다운로드 응답 직전에 API를 호출하여 이력 정보를 저장하도록 한다..
     * @param requestBody
     * @returns com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto OK
     * @throws ApiError
     */
    public static createExcelDownloadReason(
        requestBody: com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto,
    ): CancelablePromise<com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/excel/download/history',
            body: requestBody,
            mediaType: 'application/json',
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
