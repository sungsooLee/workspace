/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_test_UserExcelVO } from '../models/com_ever_edu_pms_file_dto_test_UserExcelVO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileTestTestApiService {
    /**
     * MultipartFile Excel 업로드 처리(복호화, 파싱) - 사용금지(임시 테스트용)
     * MultipartFile Excel 업로드 처리(복호화, 파싱) 테스트
     * @param companyCode companyCode
     * @param formData
     * @returns com_ever_edu_pms_file_dto_test_UserExcelVO OK
     * @throws ApiError
     */
    public static testExcelAttachFileDec(
        companyCode: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<Array<com_ever_edu_pms_file_dto_test_UserExcelVO>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/excel/import',
            query: {
                'companyCode': companyCode,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * MultipartFile 업로드 처리(복호화) - 사용금지(임시 테스트용)
     * MultipartFile 업로드 처리(복호화) 테스트
     * @param companyCode companyCode
     * @param formData
     * @returns string OK
     * @throws ApiError
     */
    public static testAttachFileDec(
        companyCode: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/attach',
            query: {
                'companyCode': companyCode,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * MultipartFile AIP 암호화 처리 - 사용금지(임시 테스트용)
     * MultipartFile AIP 암호화 처리 테스트
     * @param companyCode companyCode
     * @param formData
     * @returns string OK
     * @throws ApiError
     */
    public static testAipEnc(
        companyCode: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/aip/enc',
            query: {
                'companyCode': companyCode,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * MultipartFile AIP 복호화 처리 - 사용금지(임시 테스트용)
     * MultipartFile AIP 복호화 처리 테스트
     * @param companyCode companyCode
     * @param formData
     * @returns string OK
     * @throws ApiError
     */
    public static testAipDec(
        companyCode: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/api/v1/file/aip/dec',
            query: {
                'companyCode': companyCode,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * Kafka 파일 암/복호화 이벤트 - 사용금지(임시 테스트용)
     * Kafka outbox pattern을 이용해서 파일업로드 암/복호화 이벤트 전달한다.
     * @param fileUuid 파일 UUID
     * @returns any OK
     * @throws ApiError
     */
    public static testKafkaFileEvent(
        fileUuid: string,
    ): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/{fileUuid}/kafka',
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
     * Excel 생성 후 다운로드 처리(임시 테스트용:yyyyMMddHHmmss_export.xlsx)
     * Excel 생성 후 다운로드 처리 테스트
     * @returns any OK
     * @throws ApiError
     */
    public static testExceFileExport(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/excel/export',
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
}
