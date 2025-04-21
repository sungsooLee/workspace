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
import type { com_ever_edu_global_s3_dto_res_S3ObjectListResDto } from '../models/com_ever_edu_global_s3_dto_res_S3ObjectListResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoS3FileService {
    /**
     * S3 멀티파트 업로드 시작 요청
     * S3 멀티파트(파일분할) 업로드 시작을 요청한다.<br>응답 받은 uploadId를 이용하여 멀티파트(파일분할) 업로드를 진행해야 한다.<br><br>1. S3 멀티파트 업로드 시작 요청<br>2. S3 업로드 Presigned URL 요청<br>3. Ajax Put 파일업로드<br>4. S3 멀티파트 업로드 완료 요청
     * @param requestBody
     * @returns com_ever_edu_global_s3_dto_res_InitiateUploadResDto OK
     * @throws ApiError
     */
    public static initiateUpload1(
        requestBody: com_ever_edu_global_s3_dto_req_InitiateUploadReqDto,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_InitiateUploadResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/s3/multipart',
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
     * S3 멀티파트 업로드 완료를 요청한다.<br> 단일 파일 업로드의 경우(uploadId 없음) 호출 할 필요 없다.
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
            url: '/admin/api/v1/file/s3/multipart/{uploadId}/complete',
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
     * S3 Presigned URL 요청
     * S3 단일 파일 업로드 Presigned URL을 요청한다.<br>URL을 수신 후 Ajax Put 파일 업로드 해야 한다.
     * @param key S3 파일 경로, S3 키로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns com_ever_edu_global_s3_dto_res_PreSignedUrlResDto OK
     * @throws ApiError
     */
    public static presignedUrl2(
        key: string,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_PreSignedUrlResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/s3/uploader',
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
            url: '/admin/api/v1/file/s3/test/files',
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
     * S3 파일 다운로드 - 사용금지(임시 테스트용)
     * S3 파일을 다운로드한다.
     * @param key S3 키, S3 파일 경로로 사용<br>S3경로 구성: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명)
     * @returns any OK
     * @throws ApiError
     */
    public static downloadResponseStream(
        key: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/s3/test/download',
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
    public static partList1(
        uploadId: string,
        key: string,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_ListUploadPartsResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/s3/multipart/{uploadId}',
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
    public static abortUpload1(
        uploadId: string,
        key: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/file/s3/multipart/{uploadId}',
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
    public static presignedUrl3(
        uploadId: string,
        partNumber: number,
        key: string,
    ): CancelablePromise<com_ever_edu_global_s3_dto_res_PreSignedUrlResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/s3/multipart/{uploadId}/{partNumber}',
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
            url: '/admin/api/v1/file/s3/test/delete',
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
            url: '/admin/api/v1/file/s3/test/delete/all',
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
