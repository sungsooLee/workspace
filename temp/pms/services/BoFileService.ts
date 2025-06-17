/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto';
import type { com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto';
import type { com_ever_edu_pms_file_dto_req_FileInfoListReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileInfoListReqDto';
import type { com_ever_edu_pms_file_dto_req_FileUploadCompleteReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileUploadCompleteReqDto';
import type { com_ever_edu_pms_file_dto_res_FileInfoDetailResDto } from '../models/com_ever_edu_pms_file_dto_res_FileInfoDetailResDto';
import type { com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto } from '../models/com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto';
import type { com_ever_edu_pms_file_dto_res_GroupInfoResDto } from '../models/com_ever_edu_pms_file_dto_res_GroupInfoResDto';
import type { com_ever_edu_pms_file_dto_res_ThumbnailImageResDto } from '../models/com_ever_edu_pms_file_dto_res_ThumbnailImageResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BoFileService {
    /**
     * 파일 업로드(S3멀티파트 여부) 완료 요청
     * 파일 업로드 완료를 요청한다.<br>S3 멀티파트 업로드 대상인 경우 FileUploadCompleteReqDto 필수 입력항목 이며,<br>내부적으로 S3PartUploadService.completeUpload 서비스를 호출한다<br>
     * @param fileUuid 파일 UUID
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto OK
     * @throws ApiError
     */
    public static completeUpload2(
        fileUuid: string,
        requestBody?: com_ever_edu_pms_file_dto_req_FileUploadCompleteReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileUploadCompleteResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/{fileUuid}/complete',
            path: {
                'fileUuid': fileUuid,
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
     * 썸네일 이미지 업로드 요청
     * 썸네일 이미지 업로드한다.<br>- reposType: 저정소유형. Enum(FileUploadStatus) - S3|HMG<br>- filePath: 파일경로: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명) ex> public/board/thumbnail/2025/06/02/thumbnail.jpg
     * @param formData
     * @returns com_ever_edu_pms_file_dto_res_ThumbnailImageResDto OK
     * @throws ApiError
     */
    public static uploadThumbnailImageFile(
        formData?: {
            multipartFile?: Blob;
            reposType: string;
            filePath: string;
        },
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_ThumbnailImageResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/thumbnail',
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * 썸네일 이미지 파일 삭제
     * 썸네일 이미지 파일 삭제한다.
     * @param imageUrl
     * @returns boolean OK
     * @throws ApiError
     */
    public static deleteThumbnailImageFile(
        imageUrl: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/file/thumbnail',
            query: {
                'imageUrl': imageUrl,
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
     * 파일그룹 정보 생성
     * 파일그룹 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static createFileGroup1(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group',
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
     * 기존 파일그룹에 다건의 파일 정보를 생성한다.<br>S3 멀티파트 업로드 대상인 경우 내부적으로 S3PartUploadService.initiateUpload 서비스를 호출한 후 파일 응답데이터에 uploadId를 넣는다.
     * @param groupUuid 파일그룹 UUID
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static attachFileInfoToGroup1(
        groupUuid: string,
        requestBody: com_ever_edu_pms_file_dto_req_FileInfoListReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group/{groupUuid}/files',
            path: {
                'groupUuid': groupUuid,
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
     * 신규그룹 및 다건의 파일 정보 생성
     * 파일그룹 및 다건의 파일 정보를 생성한다.<br>S3 멀티파트 업로드 대상인 경우 내부적으로 S3PartUploadService.initiateUpload 서비스를 호출한 후 파일 응답데이터에 uploadId를 넣는다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static createFileGroupAndFiles1(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/file/group/files',
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
     * 파일정보 조회
     * 파일정보를 조회한다.
     * @param fileUuid 파일 UUID
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDetailResDto OK
     * @throws ApiError
     */
    public static getFileInfo3(
        fileUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/{fileUuid}',
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
     * 파일정보 삭제
     * 파일 정보를 삭제한다. isDeleletd 값 false 업데이트
     * @param fileUuid 파일 UUID
     * @returns boolean OK
     * @throws ApiError
     */
    public static deleteFileInfo1(
        fileUuid: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/file/{fileUuid}',
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
     * 이미지 파일 URL 정보 조회
     * 이미지 파일 URL 정보를 조회한다.
     * @param fileUuid 파일 UUID
     * @returns string OK
     * @throws ApiError
     */
    public static getImageFileUrl1(
        fileUuid: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/{fileUuid}/image/url',
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
     * 파일 다운로드
     * 파일을 다운로드한다.
     * @param fileUuid 파일 UUID
     * @returns any OK
     * @throws ApiError
     */
    public static fileDownload1(
        fileUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/{fileUuid}/download',
            path: {
                'fileUuid': fileUuid,
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
     * 템플릿 파일 다운로드
     * 템플릿 파일을 다운로드한다.
     * @param templateFileName 템플릿 파일이름
     * @returns any OK
     * @throws ApiError
     */
    public static templateFileDownload1(
        templateFileName: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/template/download',
            query: {
                'templateFileName': templateFileName,
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
     * 파일그룹 정보조회
     * 파일그룹 및 파일 정보 목록을 조회한다.
     * @param groupUuid 파일그룹 UUID
     * @returns com_ever_edu_pms_file_dto_res_GroupInfoResDto OK
     * @throws ApiError
     */
    public static getGroupFileInfoList2(
        groupUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/file/group/{groupUuid}',
            path: {
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
}
