/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_s3_dto_res_S3CopyPathResDto } from '../models/com_ever_edu_global_s3_dto_res_S3CopyPathResDto';
import type { com_ever_edu_global_s3_dto_res_S3ObjectListResDto } from '../models/com_ever_edu_global_s3_dto_res_S3ObjectListResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileTestTestApiService {
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
     * S3 파일 리스트 목록 - 사용금지(임시 테스트용)
     * S3 파일 리스트 목록을 요청한다.
     * @param s3Path S3 파일 경로, S3 키로 사용
     * @returns com_ever_edu_global_s3_dto_res_S3ObjectListResDto OK
     * @throws ApiError
     */
    public static testBucketFileList(
        s3Path: string,
    ): CancelablePromise<Array<com_ever_edu_global_s3_dto_res_S3ObjectListResDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/s3/files',
            query: {
                's3path': s3Path,
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
     * S3 파일 복사 - 사용금지(임시 테스트용)
     * S3 파일을 복사한다.
     * @param srcKey S3 파일 Src 경로
     * @param destKey S3 파일 Dest 경로,
     * @returns string OK
     * @throws ApiError
     */
    public static testS3FileCopy(
        srcKey: string,
        destKey: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/s3/file/copy',
            query: {
                'srcKey': srcKey,
                'destKey': destKey,
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
     * S3 폴더 복사 - 사용금지(임시 테스트용)
     * S3 폴더를 복사한다.
     * @param srcKey S3 폴더 Src 경로
     * @param destKey S3 폴더 Dest 경로,
     * @returns com_ever_edu_global_s3_dto_res_S3CopyPathResDto OK
     * @throws ApiError
     */
    public static testS3DirectoryCopy(
        srcKey: string,
        destKey: string,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_S3CopyPathResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/s3/directory/copy',
            query: {
                'srcKey': srcKey,
                'destKey': destKey,
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
     * HttpRequest 다운로드 - 사용금지(임시 테스트용)
     * HttpRequest 다운로드 테스트
     * @param type
     * @returns any OK
     * @throws ApiError
     */
    public static testHttpRequestDownload(
        type: number,
    ): CancelablePromise<Record<string, Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api/v1/file/httprequest',
            query: {
                'type': type,
            },
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
     * S3 파일 삭제 요청 - 사용금지(임시 테스트용)
     * SS3 파일 삭제 요청한다.
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns void
     * @throws ApiError
     */
    public static testDeleteS3File(
        key: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test/api/v1/file/s3/delete',
            query: {
                'key': key,
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
     * S3 특정 경로 파일 삭제 요청 - 사용금지(임시 테스트용)
     * S3 특정 경로 파일 삭제 요청한다.
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns void
     * @throws ApiError
     */
    public static testDeleteS3Path(
        key: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test/api/v1/file/s3/delete/all',
            query: {
                'key': key,
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
}
