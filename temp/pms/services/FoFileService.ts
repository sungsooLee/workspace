/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto';
import type { com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto';
import type { com_ever_edu_pms_file_dto_req_FileInfoReqDto } from '../models/com_ever_edu_pms_file_dto_req_FileInfoReqDto';
import type { com_ever_edu_pms_file_dto_res_FileGroupInfoResDto } from '../models/com_ever_edu_pms_file_dto_res_FileGroupInfoResDto';
import type { com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto } from '../models/com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto';
import type { com_ever_edu_pms_file_dto_res_FileInfoDetailResDto } from '../models/com_ever_edu_pms_file_dto_res_FileInfoDetailResDto';
import type { com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto } from '../models/com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto';
import type { org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_FileGroupInfoResDto } from '../models/org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_FileGroupInfoResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FoFileService {
    /**
     * 파일정보 생성
     * 파일 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDetailResDto OK
     * @throws ApiError
     */
    public static createtFileInfo(
        requestBody: com_ever_edu_pms_file_dto_req_FileInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file',
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
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_FileGroupInfoResDto OK
     * @throws ApiError
     */
    public static createtFileGroup(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupInfoReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file/group',
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
     * 파일그룹 및 1개 이상의 파일 정보 생성
     * 파일그룹 및 1개 이상의 파일 정보를 생성한다.
     * @param requestBody
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto OK
     * @throws ApiError
     */
    public static createtFileGroupAndFiles(
        requestBody: com_ever_edu_pms_file_dto_req_FileGroupAndFilesReqDto,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/file/group/files',
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
    public static getFileInfo(
        fileUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDetailResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/{fileUuid}',
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
     * @returns com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto OK
     * @throws ApiError
     */
    public static deleteFileInfo(
        fileUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileInfoDeleteResDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/file/{fileUuid}',
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
    public static fileDownload(
        fileUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/{fileUuid}/download',
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
     * 파일그룹 목록 조회
     * 파일그룹 목록을 조회한다.
     * @param page 페이징 처리를 위한 페이지 번호. 0 ~
     * @param size 페이징 처리를 위한 페이지 size. 10(최소값) ~
     * @param sort 페이징 처리를 위한 sort
     * @param uploadType 파일업로드유형, ATTATCH|CONTENTS
     * @param affairsType 파일업무유형, LMS|PMS|CMS
     * @param reposType 저정소유형, S3(기본)|HMG
     * @returns org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_FileGroupInfoResDto OK
     * @throws ApiError
     */
    public static getFileGroupList(
        page: number,
        size: number,
        sort: string,
        uploadType?: string,
        affairsType?: string,
        reposType?: string,
    ): CancelablePromise<org_springframework_data_domain_PageCom_ever_edu_pms_file_dto_res_FileGroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/groups',
            query: {
                'uploadType': uploadType,
                'affairsType': affairsType,
                'reposType': reposType,
                'page': page,
                'size': size,
                'sort': sort,
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
     * 파일그룹 정보 조회
     * 파일그룹 정보를 조회한다.
     * @param groupUuid 파일 그룹 UUID
     * @returns com_ever_edu_pms_file_dto_res_FileGroupInfoResDto OK
     * @throws ApiError
     */
    public static getFileGroup(
        groupUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_FileGroupInfoResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/group/{groupUuid}',
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
    /**
     * 파일그룹 파일 목록 조회
     * 파일그룹 파일 목록을 조회한다.
     * @param groupUuid 파일그룹 UUID
     * @returns com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto OK
     * @throws ApiError
     */
    public static getGroupFileInfoList(
        groupUuid: string,
    ): CancelablePromise<com_ever_edu_pms_file_dto_res_GroupFileInfoListResDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/file/group/{groupUuid}/files',
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
