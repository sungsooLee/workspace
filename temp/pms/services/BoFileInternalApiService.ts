/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto } from '../models/com_ever_edu_global_excel_dto_req_ExcelDownloadHistoryReqDto';
import type { com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto } from '../models/com_ever_edu_global_excel_dto_res_ExcelFileHistoryResDto';
import type { com_ever_edu_pms_file_dto_req_FileCopyInternalReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileCopyInternalReqDto';
import type { com_ever_edu_pms_file_dto_req_FileGroupCopyInternalReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupCopyInternalReqDto';
import type { com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto';
import type { com_ever_edu_pms_file_dto_req_FileInfoListReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileInfoListReqDto';
import type { com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto } from '../models/com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto';
import type { com_ever_edu_pms_file_dto_res_FileInfoInternalResDto } from '../models/com_ever_edu_pms_file_dto_res_FileInfoInternalResDto';
import type { com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto } from '../models/com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileInternalApiService {
    /**
     * 다건 파일 복사 - Internal API
     * 다건 파일을 복사한다.<BR>예를 들어 Module-CMS에서 콘텐츠 파일을 복사하기 위해서 호출한다
     * @param userId 사용자 이메일
     * @param companyId 회사번호
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto OK
     * @throws ApiError
     */
    public static copyFiles(
        userId: string,
        companyId: number,
        requestBody: com_ever_edu_pms_file_dto_req_FileCopyInternalReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/files/copy',
            query: {
                'userId': userId,
                'companyId': companyId,
            },
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
     * 파일그룹 정보 생성
     * 파일그룹 정보를 생성한다.
     * @param userId 사용자 이메일
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto OK
     * @throws ApiError
     */
    public static createFileGroup(
        userId: string,
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/file/group',
            query: {
                'userId': userId,
            },
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
     * 다건의 파일 정보 생성
     * 기존 파일그룹에 다건의 파일 정보를 생성한다.
     * @param userId 사용자 이메일
     * @param companyId 회사번호
     * @param groupUuid 파일그룹 UUID
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto OK
     * @throws ApiError
     */
    public static attachFileInfoToGroup(
        userId: string,
        companyId: number,
        groupUuid: string,
        requestBody: com_ever_edu_pms_file_dto_req_FileInfoListReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/file/group/{groupUuid}/files',
            path: {
                'groupUuid': groupUuid,
            },
            query: {
                'userId': userId,
                'companyId': companyId,
            },
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
     * 파일 그룹 복사 - Internal API
     * 파일 그룹을 복사한다.<br>예를 들어 Module-CMS에서 콘텐츠 파일 그룹 복사하기 위해서 호출한다.<br>대상 파일그룹 UUID를 지정하지 않으면 신규 그룹을 생성한 후 파일을 복사한다.<BR>
     * @param userId 사용자 이메일
     * @param companyId 회사번호
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto OK
     * @throws ApiError
     */
    public static copyFileGroup(
        userId: string,
        companyId: number,
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupCopyInternalReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupCopyInternalResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/file/group/copy',
            query: {
                'userId': userId,
                'companyId': companyId,
            },
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
     * Excel File 다운로드 이력정보 저장 - Internal API
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
     * 파일 정보 조회 - Internal API
     * 간략한 파일 정보를 조회한다.<BR>예를 들어 Module-CMS서 스콤 파일 처리 시 파일 정보를 조회한다
     * @param fileId 파일 Id
     * @returns com_ever_edu_pms_file_dto_res_FileInfoInternalResDto OK
     * @throws ApiError
     */
    public static getFileInfo1(
        fileId: number,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoInternalResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/file',
            query: {
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
     * 파일 정보 조회 - Internal API
     * 간략한 파일 정보를 조회한다.<BR>예를 들어 Module-CMS서 스콤 파일 처리 시 파일 정보를 조회한다
     * @param fileUuid 파일 UUID
     * @returns com_ever_edu_pms_file_dto_res_FileInfoInternalResDto OK
     * @throws ApiError
     */
    public static getFileInfo2(
        fileUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoInternalResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/file/uuid',
            query: {
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
     * Simple 파일 정보 목록 조회 - Internal API
     * 간략한 파일 정보 목록을 조회한다.<BR>예를 들어 Module-CMS에서 섬네일 파일 처리 시 파일 정보를 조회한다
     * @param groupUuid 파일그룹 UUID
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto OK
     * @throws ApiError
     */
    public static getGroupFileInfoList1(
        groupUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoInternalResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/file/group/files',
            query: {
                'groupUuid': groupUuid,
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
     * 가비지 파일을 삭제한다.<BR>7일 이전 업로드상태유형코드가 TEMPORARY_SAVE|ONGOING인 파일이 대상
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
