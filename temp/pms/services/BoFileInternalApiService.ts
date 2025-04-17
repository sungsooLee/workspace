/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto } from '../models/com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileInternalApiService {
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
            url: '/internal/api/v1/file/test/attach',
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
     * MultipartFile Excel 업로드 처리(복호화, 파싱) - 사용금지(임시 테스트용)
     * MultipartFile Excel 업로드 처리(복호화, 파싱) 테스트
     * @param companyCode companyCode
     * @param formData
     * @returns string OK
     * @throws ApiError
     */
    public static testExcelAttachFileDec(
        companyCode: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/api/v1/file/test/attach/excel',
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
            url: '/internal/api/v1/file/test/aip/enc',
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
            url: '/internal/api/v1/file/test/aip/dec',
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
     * Simple 파일 정보 조회 - Internal API
     * 간략한 파일 정보를 조회한다.<BR> 예를 들어 Module-CMS서 스콤 파일 처리 시 파일 정보를 조회한다
     * @param uuid 파일 UUID
     * @returns com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto OK
     * @throws ApiError
     */
    public static getSimpleFileInfo(
        uuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_SimpleFileInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/file/{uuid}',
            path: {
                'uuid': uuid,
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
     * Kafka 파일 암/복호화 이벤트 - 사용금지(임시 테스트용)
     * Kafka outbox pattern을 이용해서 파일업로드 암/복호화 이벤트 전달한다.
     * @param uuid 파일 UUID
     * @returns any OK
     * @throws ApiError
     */
    public static testKafkaFileEvent(
        uuid: string,
    ): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/internal/api/v1/file/{uuid}/kafka',
            path: {
                'uuid': uuid,
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
