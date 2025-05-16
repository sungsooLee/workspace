/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto } from '../models/com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto';
import type { com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto } from '../models/com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto';
import type { com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto } from '../models/com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileInternalApiService {
    /**
     * Excel File 다운로드 이력정보 저장
     * Excel File 다운로드 이력정보를 생성한다.<BR>엑셀 파일 생성 성공 후 다운로드 응답 직전에 API를 호출하여 이력 정보를 저장하도록 한다.
     * @param requestBody
     * @returns com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto OK
     * @throws ApiError
     */
    public static createExcelDownloadReason(
        requestBody: com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto,
    ): CancelablePromise<com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/file/excel/download/history',
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
    /**
     * Simple 파일 정보 조회 - Internal API
     * 간략한 파일 정보를 조회한다.<BR>예를 들어 Module-CMS서 스콤 파일 처리 시 파일 정보를 조회한다
     * @param fileId 파일 Id
     * @returns com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto OK
     * @throws ApiError
     */
    public static getSimpleFileInfo(
        fileId: number,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/file/{fileId}',
            path: {
                'fileId': fileId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Simple 파일 정보 조회 - Internal API
     * 간략한 파일 정보를 조회한다.<BR>예를 들어 Module-CMS서 스콤 파일 처리 시 파일 정보를 조회한다
     * @param fileUuid 파일 UUID
     * @returns com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto OK
     * @throws ApiError
     */
    public static getSimpleFileInfo1(
        fileUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/file/uuid/{fileUuid}',
            path: {
                'fileUuid': fileUuid,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Unprocessable Entity`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 가비지 파일 삭제 - Internal API
     * 가비지 파일을 삭제한다.<BR>10일 이전 업로드상태유형코드가 A0002(ONGOING)인 파일이 대상
     * @returns any OK
     * @throws ApiError
     */
    public static deleteGarbageFile(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/internal/api/v1/file/garbage',
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
