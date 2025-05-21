/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_s3_dto_req_CompleteUploadReqDto } from '../models/com_ever_edu_global_s3_dto_req_CompleteUploadReqDto';
import type { com_ever_edu_global_s3_dto_req_InitiateUploadReqDto } from '../models/com_ever_edu_global_s3_dto_req_InitiateUploadReqDto';
import type { com_ever_edu_global_s3_dto_res_CompleteUploadResDto } from '../models/com_ever_edu_global_s3_dto_res_CompleteUploadResDto';
import type { com_ever_edu_global_s3_dto_res_InitiateUploadResDto } from '../models/com_ever_edu_global_s3_dto_res_InitiateUploadResDto';
import type { com_ever_edu_global_s3_dto_res_ListUploadPartsResDto } from '../models/com_ever_edu_global_s3_dto_res_ListUploadPartsResDto';
import type { com_ever_edu_global_s3_dto_res_PreSignedUrlResDto } from '../models/com_ever_edu_global_s3_dto_res_PreSignedUrlResDto';
import type { com_ever_edu_pms_file_dto_res_S3FileUrlResDto } from '../models/com_ever_edu_pms_file_dto_res_S3FileUrlResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoS3FileService {
    /**
     * S3 멀티파트 업로드 시작 요청
     * S3 멀티파트(파일분할) 업로드 시작을 요청한다.<br>응답 받은 uploadId를 이용하여 멀티파트(파일분할) 업로드를 진행해야 한다.<br><br>1. S3 멀티파트 업로드 시작 요청<br>2. S3 업로드 Presigned URL 요청<br>3. Ajax Put 파일업로드<br>4. S3 멀티파트 업로드 완료 요청
     * @param requestBody
     * @returns com_ever_edu_global_s3_dto_res_InitiateUploadResDto OK
     * @throws ApiError
     */
    public static initiateUpload(
        requestBody: com_ever_edu_global_s3_dto_req_InitiateUploadReqDto,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_InitiateUploadResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/file/s3/multipart',
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
     * S3 멀티파트 업로드 완료 요청
     * S3 멀티파트 업로드 완료를 요청한다.<br>단일 파일 업로드의 경우(uploadId 없음) 호출 할 필요 없다.
     * @param uploadId S3 업로드Id
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @param requestBody
     * @returns com_ever_edu_global_s3_dto_res_CompleteUploadResDto OK
     * @throws ApiError
     */
    public static completeUpload1(
        uploadId: string,
        key: string,
        requestBody: com_ever_edu_global_s3_dto_req_CompleteUploadReqDto,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_CompleteUploadResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/api/v1/file/s3/multipart/{uploadId}/complete',
            path: {
                'uploadId': uploadId,
            },
            query: {
                'key': key,
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
     * S3 파일 URL 요청
     * S3 파일 URL을 요청한다.
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns com_ever_edu_pms_file_dto_res_S3FileUrlResDto OK
     * @throws ApiError
     */
    public static getPathOrS3Url(
        key: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_S3FileUrlResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/file/s3/url',
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
     * S3 Presigned URL 요청
     * S3 단일 파일 업로드 Presigned URL을 요청한다.<br>URL을 수신 후 Ajax Put 파일 업로드 해야 한다.
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns com_ever_edu_global_s3_dto_res_PreSignedUrlResDto OK
     * @throws ApiError
     */
    public static presignedUrl(
        key: string,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_PreSignedUrlResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/file/s3/uploader',
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
     * S3 멀티파트 업로드 Part 목록 요청
     * S3 멀티파트 업로드 Part 목록을 요청한다.
     * @param uploadId S3 업로드Id
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns com_ever_edu_global_s3_dto_res_ListUploadPartsResDto OK
     * @throws ApiError
     */
    public static partList(
        uploadId: string,
        key: string,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_ListUploadPartsResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/file/s3/multipart/{uploadId}',
            path: {
                'uploadId': uploadId,
            },
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
     * S3 멀티파트 업로드 Abort 요청
     * S3 멀티파트 업로드 Abort 요청한다.
     * @param uploadId S3 업로드Id
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns void
     * @throws ApiError
     */
    public static abortUpload(
        uploadId: string,
        key: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/api/v1/file/s3/multipart/{uploadId}',
            path: {
                'uploadId': uploadId,
            },
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
     * S3 업로드 Presigned URL 요청
     * S3 멀티파트 업로드 Presigned URL을 요청한다.
     * @param uploadId S3 업로드Id
     * @param partNumber S3 멀티파트 업로드 파트 번호(1 ~ 10000)
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns com_ever_edu_global_s3_dto_res_PreSignedUrlResDto OK
     * @throws ApiError
     */
    public static presignedUrl1(
        uploadId: string,
        partNumber: number,
        key: string,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_PreSignedUrlResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/file/s3/multipart/{uploadId}/{partNumber}',
            path: {
                'uploadId': uploadId,
                'partNumber': partNumber,
            },
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
     * S3 파일 다운로드 요청
     * S3 파일 다운로드 요청한다.
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @param fileName 다운로드 파일명, 미지정 시 S3 저장명 사용
     * @returns any OK
     * @throws ApiError
     */
    public static fileDownloadResponse(
        key: string,
        fileName?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/api/v1/file/s3/download',
            query: {
                'key': key,
                'fileName': fileName,
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
}
